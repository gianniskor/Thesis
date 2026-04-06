import fitz
import httpx
import uuid
import re
from pathlib import Path

SOLR_URL = "http://localhost:8983/solr/nomologia"

DIKASTIRIA = {
    "ΣτΕ":   "Συμβούλιο Επικρατείας",
    "ΑΠ":    "Άρειος Πάγος",
    "ΕφΑθ":  "Εφετείο Αθηνών",
    "ΕφΠειρ":"Εφετείο Πειραιά",
    "ΠΠρ":   "Πρωτοδικείο Πειραιά",
    "ΜΠΑ":   "Μονομελές Πρωτοδικείο Αθηνών",
    "ΔΕΕ":   "Δικαστήριο ΕΕ",
    "ΕΔΔΑ":  "Ευρωπαϊκό Δικαστήριο Δικαιωμάτων",
}


ARITHMOS_PATTERN = re.compile(
    r'(Απόφαση\s+)?(ΣτΕ|ΑΠ|ΕφΑθ|ΕφΠειρ|ΠΠρ|ΜΠΑ|ΔΕΕ|ΕΔΔΑ)\s+(\d+)/(\d{4})',
    re.UNICODE
)

def extract_text(pdf_path: str) -> str:
    doc = fitz.open(pdf_path)
    return "\n".join(page.get_text() for page in doc)

def parse_metadata(text: str, filename: str) -> dict:

    match = ARITHMOS_PATTERN.search(text[:500])
    
    if match:
        prefix   = match.group(2)
        number   = match.group(3)
        year     = int(match.group(4))
        arithmos = f"{prefix} {number}/{year}"
        dikastirio = DIKASTIRIA.get(prefix, prefix)
    else:
        arithmos   = filename
        dikastirio = "N/A"
        year       = 0

    # title extract  
    lines = [l.strip() for l in text.split('\n') if l.strip()]
    titlos = lines[0] if lines else filename

    return {
        "arithmos":   arithmos,
        "dikastirio": dikastirio,
        "etos":       year,
        "titlos":     titlos[:300],
    }

def index_pdf(pdf_path: str, katigoria: list[str] = None):
    path = Path(pdf_path)
    print(f"Processing: {path.name}")
    
    # extract text
    text = extract_text(pdf_path)
    
    # extract metadata
    meta = parse_metadata(text, path.stem)
    
    #document for Solr
    doc = {
        "id":          str(uuid.uuid4()),
        "arithmos":    meta["arithmos"],
        "dikastirio":  meta["dikastirio"],
        "etos":        meta["etos"],
        "titlos":      meta["titlos"],
        "periexomeno": text[:50_000],  # Solr limit
        "katigoria":   katigoria or ["Αταξινόμητο"],
        "pdf_path":    str(path.name),
    }
    
    # POST to Solr
    resp = httpx.post(
        f"{SOLR_URL}/update/json/docs",
        params={"commit": "true"},
        json=doc
    )
    
    if resp.status_code == 200:
        print(f"  Indexed: {meta['dikastirio']} {meta['arithmos']} ")
    else:
        print(f"  Error: {resp.text}")
    
    return doc

def index_folder(folder: str, katigoria: list[str] = None):
    pdfs = list(Path(folder).glob("**/*.pdf"))
    print(f"\nΒρέθηκαν {len(pdfs)} PDFs στο {folder}\n")
    
    ok, fail = 0, 0
    for pdf in pdfs:
        try:
            index_pdf(str(pdf), katigoria)
            ok += 1
        except Exception as e:
            print(f"  Error: {pdf.name}: {e}")
            fail += 1
    
    print(f"\nΑποτέλεσμα: {ok} επιτυχία, {fail} σφάλματα")

# ── MAIN ──
if __name__ == "__main__":
    import sys
    
    if len(sys.argv) < 2:
        print("Χρήση:")
        print("  python pdf_indexer.py ένα_αρχείο.pdf")
        print("  python pdf_indexer.py ./φάκελος --katigoria Διοικητικό")
        sys.exit(1)
    
    path = sys.argv[1]
    kat  = sys.argv[3].split(",") if len(sys.argv) > 3 else None
    
    if Path(path).is_dir():
        index_folder(path, kat)
    else:
        index_pdf(path, kat)