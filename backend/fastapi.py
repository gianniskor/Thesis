from fastapi import FastAPI, UploadFile, File, Query
from fastapi.middleware.cors import CORSMiddleware
import httpx
import fitz
import uuid
import re
from pathlib import Path

app = FastAPI(title="CaseLaw API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

SOLR_URL = "http://localhost:8983/solr/nomologia"

DIKASTIRIA = {
    "ΣτΕ":    "Συμβούλιο Επικρατείας",
    "ΑΠ":     "Άρειος Πάγος",
    "ΕφΑθ":   "Εφετείο Αθηνών",
    "ΕφΠειρ": "Εφετείο Πειραιά",
    "ΠΠρ":    "Πρωτοδικείο Πειραιά",
    "ΜΠΑ":    "Μονομελές Πρωτοδικείο Αθηνών",
    "ΔΕΕ":    "Δικαστήριο ΕΕ",
    "ΕΔΔΑ":   "Ευρωπαϊκό Δικαστήριο Δικαιωμάτων",
}

ARITHMOS_PATTERN = re.compile(
    r'(Απόφαση\s+)?(ΣτΕ|ΑΠ|ΕφΑθ|ΕφΠειρ|ΠΠρ|ΜΠΑ|ΔΕΕ|ΕΔΔΑ)\s+(\d+)/(\d{4})',
    re.UNICODE
)

TMP_DIR = Path("/temporary/cl_pdfs")
TMP_DIR.mkdir(exist_ok=True)




def extract_text(pdf_path: Path) -> str:
    doc = fitz.open(str(pdf_path))
    return "\n".join(page.get_text() for page in doc)

def parse_metadata(text: str, filename: str) -> dict:
    match = ARITHMOS_PATTERN.search(text[:500])

    if match:
        prefix     = match.group(2)
        number     = match.group(3)
        year       = int(match.group(4))
        arithmos   = f"{prefix} {number}/{year}"
        dikastirio = DIKASTIRIA.get(prefix, prefix)
    else:
        arithmos   = filename
        dikastirio = "N/A"
        year       = 0

    lines  = [l.strip() for l in text.split("\n") if l.strip()]
    titlos = lines[0][:300] if lines else filename

    return {
        "arithmos":   arithmos,
        "dikastirio": dikastirio,
        "etos":       year,
        "titlos":     titlos,
    }



@app.get("/")
def root():
    return {"message": "CaseLaw API is running"}


@app.post("/api/index")
async def index_pdf(
    file: UploadFile = File(...),
    katigoria: list[str] = Query(default=["Αταξινόμητο"])
):
    tmp_path = TMP_DIR / file.filename
    tmp_path.write_bytes(await file.read())

    try:
        text = extract_text(tmp_path)
        meta = parse_metadata(text, tmp_path.stem)

        doc = {
            "id":          str(uuid.uuid4()),
            "arithmos":    meta["arithmos"],
            "dikastirio":  meta["dikastirio"],
            "etos":        meta["etos"],
            "titlos":      meta["titlos"],
            "periexomeno": text[:50_000],
            "katigoria":   katigoria,
            "pdf_path":    file.filename,
        }

        resp = httpx.post(
            f"{SOLR_URL}/update/json/docs",
            params={"commit": "true"},
            json=doc
        )
        resp.raise_for_status()

        return {
            "status":     "ok",
            "arithmos":   meta["arithmos"],
            "dikastirio": meta["dikastirio"],
            "etos":       meta["etos"],
        }

    except Exception as e:
        return {"status": "error", "detail": str(e)}

    finally:
        tmp_path.unlink(missing_ok=True) 


@app.get("/api/search")
async def search(
    q: str,
    dikastirio: str = None,
    etos: int = None,
    katigoria: str = None,
    page: int = 0,
    rows: int = 10,
):
    fq = []
    if dikastirio: fq.append(f'dikastirio:"{dikastirio}"')
    if etos:       fq.append(f"etos:{etos}")
    if katigoria:  fq.append(f'katigoria:"{katigoria}"')

    params = {
        "q":              q,
        "defType":        "edismax",
        "qf":             "titlos^3 arithmos^5 periexomeno",
        "hl":             "true",
        "hl.fl":          "periexomeno",
        "hl.snippets":    3,
        "hl.fragsize":    200,
        "hl.simple.pre":  "<mark>",
        "hl.simple.post": "</mark>",
        "facet":          "true",
        "facet.field":    ["dikastirio", "etos", "katigoria"],
        "fq":             fq,
        "start":          page * rows,
        "rows":           rows,
        "wt":             "json",
    }

    resp = httpx.get(f"{SOLR_URL}/select", params=params)
    resp.raise_for_status()
    data = resp.json()

    return {
        "total":      data["response"]["numFound"],
        "results":    data["response"]["docs"],
        "highlights": data.get("highlighting", {}),
        "facets":     data.get("facet_counts", {}).get("facet_fields", {}),
    }


@app.get("/api/cases/{case_id}")
async def get_case(case_id: str):
    resp = httpx.get(f"{SOLR_URL}/select", params={
        "q":  f"id:{case_id}",
        "wt": "json"
    })
    docs = resp.json()["response"]["docs"]
    if not docs:
        return {"status": "error", "detail": "Not found"}
    return docs[0]