import React, { useState, useEffect } from 'react';
import { 
  Search, User, Wallet, Command, X, 
  Clock, FileText, Share, Plus, 
  Scale, BookOpen, Landmark, Gavel, Shield, 
  Sparkles, MessageSquare, Filter, ChevronDown
} from 'lucide-react';

// --- MAIN APP COMPONENT ---
export default function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showPdfViewer, setShowPdfViewer] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);

  // Close search on escape key
  useEffect(() => {
    const handleKeyDown = (e: { key: string; metaKey: any; ctrlKey: any; preventDefault: () => void; }) => {
      if (e.key === 'Escape') setIsSearchOpen(false);
      // Cmd+K or Ctrl+K to open search
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-[#0d0d0f] text-white font-sans relative overflow-x-hidden selection:bg-yellow-500/30">
      
      {/* Background Gradients to match Screenshot 1 */}
      <div className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] bg-yellow-500/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-[20%] left-[-10%] w-[600px] h-[600px] bg-purple-500/10 blur-[150px] rounded-full pointer-events-none" />

      {/* --- NAVBAR --- */}
      <nav className="flex items-center justify-between px-8 py-6 relative z-10 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <Scale className="w-8 h-8 text-white" />
          <span className="text-xl font-bold tracking-wider">NOMOLOGIA</span>
        </div>

        <div className="hidden md:flex bg-[#1a1a1c] border border-gray-800 rounded-full p-1 shadow-lg">
          <button className="px-5 py-2 rounded-full bg-white text-black text-sm font-medium">Αρχική</button>
          <button className="px-5 py-2 rounded-full text-gray-400 hover:text-white transition text-sm font-medium">Συλλογές</button>
          <button className="px-5 py-2 rounded-full text-gray-400 hover:text-white transition text-sm font-medium" onClick={() => setShowChatbot(true)}>AI Assistant</button>
          <button className="px-5 py-2 rounded-full text-gray-400 hover:text-white transition text-sm font-medium">Περί</button>
        </div>

        <div className="flex items-center gap-6">
          <button onClick={() => setIsSearchOpen(true)} className="text-gray-300 hover:text-white transition">
            <Search className="w-5 h-5" />
          </button>
          <button className="text-gray-300 hover:text-white transition">
            <User className="w-5 h-5" />
          </button>
          <button className="text-gray-300 hover:text-white transition">
            <Wallet className="w-5 h-5" />
          </button>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <main className="relative z-10 flex flex-col items-center justify-center mt-20 px-4 max-w-7xl mx-auto text-center">
        
        {/* Gradient Title */}
        <h1 className="text-5xl md:text-7xl font-black mb-4 tracking-tight" 
            style={{ background: 'linear-gradient(to right, #a78bfa, #fcd34d, #f97316)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          ΑΝΑΖΗΤΗΣΗ, ΜΕΛΕΤΗ & ΑΝΑΛΥΣΗ
        </h1>
        
        <h2 className="text-xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 mb-8 style-outline">
          ΕΞΕΡΕΥΝΗΣΤΕ ΤΗΝ ΕΛΛΗΝΙΚΗ ΝΟΜΟΛΟΓΙΑ
        </h2>
        
        <p className="text-gray-400 mb-8 max-w-2xl">
          Το πιο σύγχρονο εργαλείο αναζήτησης δικαστικών αποφάσεων. Ενισχυμένο με AI.
        </p>

        {/* Central Search Bar Replacing the Button */}
        <div 
          onClick={() => setIsSearchOpen(true)}
          className="group flex items-center bg-[#151518] border border-gray-700/50 hover:border-yellow-500/50 rounded-full px-6 py-4 cursor-pointer w-full max-w-lg shadow-[0_0_30px_rgba(0,0,0,0.5)] transition-all duration-300"
        >
          <Search className="w-5 h-5 mr-4 text-yellow-500/80 group-hover:text-yellow-400" />
          <span className="text-gray-400 group-hover:text-gray-200 transition-colors text-lg">
            Αναζήτηση αποφάσεων...
          </span>
          <div className="ml-auto flex items-center gap-1 bg-[#222] border border-gray-700 text-gray-400 text-xs px-3 py-1.5 rounded-full">
            <Command className="w-3 h-3" />
            <span>K</span>
          </div>
        </div>

        {/* --- COLORFUL CARDS SECTION --- */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 mt-24 mb-16 w-full">
          {/* Card 1 */}
          <div className="w-40 h-56 md:w-48 md:h-64 rounded-3xl bg-[#E85D54] flex flex-col items-center justify-center p-6 transform hover:-translate-y-2 transition duration-300 shadow-xl overflow-hidden relative">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white to-transparent"></div>
            <Landmark className="w-16 h-16 text-white mb-4 drop-shadow-md" />
            <span className="text-white font-bold text-center leading-tight">Αστικό<br/>Δίκαιο</span>
          </div>
          {/* Card 2 */}
          <div className="w-40 h-56 md:w-48 md:h-64 rounded-3xl bg-[#2A3F54] flex flex-col items-center justify-center p-6 transform translate-y-4 hover:translate-y-2 transition duration-300 shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-white to-transparent"></div>
            <Gavel className="w-16 h-16 text-white mb-4 drop-shadow-md" />
            <span className="text-white font-bold text-center leading-tight">Ποινικό<br/>Δίκαιο</span>
          </div>
          {/* Card 3 */}
          <div className="w-40 h-56 md:w-48 md:h-64 rounded-3xl bg-[#F4D06F] flex flex-col items-center justify-center p-6 transform -translate-y-4 hover:-translate-y-6 transition duration-300 shadow-xl relative overflow-hidden">
             <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-white to-transparent"></div>
            <Shield className="w-16 h-16 text-gray-900 mb-4 drop-shadow-sm" />
            <span className="text-gray-900 font-bold text-center leading-tight">Διοικητικό<br/>Δίκαιο</span>
          </div>
          {/* Card 4 */}
          <div className="w-40 h-56 md:w-48 md:h-64 rounded-3xl bg-[#7FC2A6] flex flex-col items-center justify-center p-6 transform translate-y-2 hover:translate-y-0 transition duration-300 shadow-xl relative overflow-hidden">
             <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-white to-transparent"></div>
            <BookOpen className="w-16 h-16 text-gray-900 mb-4 drop-shadow-sm" />
            <span className="text-gray-900 font-bold text-center leading-tight">Εργατικό<br/>Δίκαιο</span>
          </div>
          {/* Card 5 */}
          <div className="w-40 h-56 md:w-48 md:h-64 rounded-3xl bg-[#F9A03F] flex flex-col items-center justify-center p-6 transform hover:-translate-y-2 transition duration-300 shadow-xl relative overflow-hidden hidden md:flex">
             <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white to-transparent"></div>
            <FileText className="w-16 h-16 text-white mb-4 drop-shadow-md" />
            <span className="text-white font-bold text-center leading-tight">Εμπορικό<br/>Δίκαιο</span>
          </div>
        </div>

        {/* --- BOTTOM SECTION TABS --- */}
        <div className="w-full flex flex-col items-start mt-12 mb-20 border-t border-gray-800 pt-8 px-4">
          <h3 className="text-2xl font-bold mb-6">ΕΞΕΡΕΥΝΗΣΗ</h3>
          <div className="w-full flex flex-wrap items-center justify-between gap-4">
            <button className="flex items-center gap-2 bg-[#1a1a1c] border border-gray-800 rounded-full px-4 py-2 text-sm">
              Δημοφιλή <ChevronDown className="w-4 h-4" />
            </button>
            <div className="hidden md:flex items-center gap-8 font-medium text-sm">
              <span className="text-white border-b-2 border-yellow-500 pb-1">ΚΑΤΗΓΟΡΙΕΣ</span>
              <span className="text-gray-500 hover:text-white cursor-pointer">ΝΕΑ</span>
              <span className="text-gray-500 hover:text-white cursor-pointer">ΑΡΕΙΟΣ ΠΑΓΟΣ</span>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 bg-[#1a1a1c] border border-gray-800 rounded-full px-4 py-2 text-sm">
                24h <ChevronDown className="w-4 h-4" />
              </button>
              <button className="flex items-center gap-2 bg-[#1a1a1c] border border-gray-800 rounded-full px-4 py-2 text-sm">
                Όλα τα Δικαστήρια <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Floating LLM Chatbot Trigger */}
      <button 
        onClick={() => setShowChatbot(!showChatbot)}
        className="fixed bottom-8 right-8 z-40 bg-gradient-to-r from-yellow-500 to-yellow-600 p-4 rounded-full shadow-lg hover:shadow-yellow-500/20 hover:scale-105 transition-all text-black"
      >
        <Sparkles className="w-6 h-6" />
      </button>

      {/* --- SEARCH MODAL (Matches Screenshot 2 EXACTLY) --- */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] px-4 backdrop-blur-sm bg-black/40">
          {/* Invisible backdrop to click and close */}
          <div className="absolute inset-0" onClick={() => setIsSearchOpen(false)}></div>
          
          <div className="relative w-full max-w-2xl bg-[#1e1e1e] border border-gray-800/60 rounded-2xl shadow-2xl overflow-hidden flex flex-col text-gray-200" onClick={e => e.stopPropagation()}>
            
            {/* Header / Input */}
            <div className="flex items-center px-4 py-4 border-b border-gray-800/60">
              <Search className="w-5 h-5 text-yellow-500/80 mr-3" />
              <input 
                autoFocus
                type="text" 
                placeholder="Αναζήτηση για αποφάσεις, δικαστήρια, θέματα..." 
                className="flex-1 bg-transparent border-none outline-none text-lg text-white placeholder-gray-500"
              />
              <button className="ml-3 p-1.5 bg-[#2c2c2e] hover:bg-[#3c3c3e] rounded text-gray-400 transition-colors flex items-center gap-1">
                <Filter className="w-4 h-4" />
                <span className="text-xs">F</span>
              </button>
            </div>

            <div className="p-4 overflow-y-auto max-h-[65vh] custom-scrollbar">
              
              {/* Section 1: Facets / I'm looking for... */}
              <div className="mb-6">
                <p className="text-xs text-gray-500 mb-3 px-2">I`m looking for...</p>
                <div className="flex flex-wrap gap-2 px-2">
                  <button className="flex items-center gap-1.5 bg-[#2a2a2c] hover:bg-[#353538] border border-gray-700/50 px-3 py-1.5 rounded-full text-sm transition-colors">
                    <Scale className="w-3.5 h-3.5 text-gray-400" /> Κατηγορίες <X className="w-3 h-3 text-gray-500 ml-1" />
                  </button>
                  <button className="flex items-center gap-1.5 bg-[#2a2a2c] hover:bg-[#353538] border border-gray-700/50 px-3 py-1.5 rounded-full text-sm transition-colors">
                    <Landmark className="w-3.5 h-3.5 text-gray-400" /> Δικαστήρια <X className="w-3 h-3 text-gray-500 ml-1" />
                  </button>
                  <button className="flex items-center gap-1.5 bg-[#2a2a2c] hover:bg-[#353538] border border-gray-700/50 px-3 py-1.5 rounded-full text-sm transition-colors">
                    <Clock className="w-3.5 h-3.5 text-gray-400" /> Χρονολογίες <X className="w-3 h-3 text-gray-500 ml-1" />
                  </button>
                  <button className="flex items-center gap-1 bg-transparent hover:bg-[#2a2a2c] px-3 py-1.5 rounded-full text-sm text-gray-400 transition-colors">
                    Περισσότερα <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Section 2: Last search */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2 px-2">
                  <p className="text-xs text-gray-500">Πρόσφατες αναζητήσεις <span className="text-gray-600 ml-1">3</span></p>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="group flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-[#2a2a2c] cursor-pointer transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400"><BookOpen className="w-3.5 h-3.5" /></div>
                      <div>
                        <span className="text-sm font-medium text-gray-200">Αστικός Κώδικας</span>
                        <span className="text-sm text-gray-500 ml-2">Άρθρο 914</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                       <Clock className="w-4 h-4 text-gray-500" />
                    </div>
                  </div>
                  
                  <div className="group flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-[#2a2a2c] cursor-pointer transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400"><Gavel className="w-3.5 h-3.5" /></div>
                      <div>
                        <span className="text-sm font-medium text-gray-200">Άρειος Πάγος</span>
                        <span className="text-sm text-gray-500 ml-2">Αποφάσεις 2023</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                       <Clock className="w-4 h-4 text-gray-500" />
                    </div>
                  </div>

                  <div className="group flex items-center justify-between px-3 py-2.5 rounded-xl bg-[#2a2a2c] border border-gray-700/50 cursor-pointer transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400"><Scale className="w-3.5 h-3.5" /></div>
                      <div>
                        <span className="text-sm font-medium text-white">Εργατικό Δίκαιο</span>
                        <span className="text-sm text-gray-400 ml-2">Απόλυση</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-gray-500">
                      <MessageSquare className="w-4 h-4" /> <span className="text-xs">6</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 3: Quick actions */}
              <div className="mb-6">
                <p className="text-xs text-gray-500 mb-2 px-2">Άμεσες ενέργειες</p>
                <div className="flex flex-col gap-1">
                  <div 
                    className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-[#2a2a2c] cursor-pointer transition-colors"
                    onClick={() => { setIsSearchOpen(false); setShowChatbot(true); }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded flex items-center justify-center text-gray-400 bg-[#333]"><Sparkles className="w-4 h-4 text-yellow-500" /></div>
                      <span className="text-sm text-gray-300">Άνοιγμα AI Assistant</span>
                    </div>
                    <div className="w-6 h-6 rounded bg-[#333] border border-gray-700 flex items-center justify-center text-xs text-gray-400">A</div>
                  </div>
                  
                  <div className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-[#2a2a2c] cursor-pointer transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded flex items-center justify-center text-gray-400 bg-[#333]"><Plus className="w-4 h-4" /></div>
                      <span className="text-sm text-gray-300">Δημιουργία νέας αναζήτησης</span>
                    </div>
                    <div className="w-6 h-6 rounded bg-[#333] border border-gray-700 flex items-center justify-center text-xs text-gray-400">N</div>
                  </div>

                  <div className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-[#2a2a2c] cursor-pointer transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded flex items-center justify-center text-gray-400 bg-[#333]"><Plus className="w-4 h-4" /></div>
                      <span className="text-sm text-gray-300">Αποθήκευση στα αγαπημένα</span>
                    </div>
                    <div className="w-6 h-6 rounded bg-[#333] border border-gray-700 flex items-center justify-center text-xs text-gray-400">S</div>
                  </div>
                </div>
              </div>

              {/* Section 4: Files / PDF Viewer integration */}
              <div>
                <p className="text-xs text-gray-500 mb-2 px-2">Αρχεία <span className="text-gray-600 ml-1">1</span></p>
                <div 
                  onClick={() => { setShowPdfViewer(true); setIsSearchOpen(false); }}
                  className="group flex items-center justify-between px-3 py-3 rounded-xl hover:bg-[#2a2a2c] cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-gray-400" />
                    <span className="text-sm font-medium text-gray-200">Απόφαση_ΑΠ_124_2023.pdf</span>
                    <div className="flex -space-x-2 ml-2">
                       <div className="w-5 h-5 rounded-full bg-blue-500 border border-[#1e1e1e]"></div>
                       <div className="w-5 h-5 rounded-full bg-yellow-500 border border-[#1e1e1e] flex items-center justify-center text-[8px] text-black font-bold">T</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400 group-hover:text-white transition-colors">
                    <Share className="w-4 h-4" />
                    <span className="text-sm">Άνοιγμα</span>
                  </div>
                </div>
              </div>

            </div>
            
            {/* Footer */}
            <div className="px-4 py-3 border-t border-gray-800/60 bg-[#1a1a1c] text-xs text-gray-500 flex justify-between">
               <span>Πλοήγηση με τα βελάκια</span>
               <span>Esc για κλείσιμο</span>
            </div>
          </div>
        </div>
      )}

      {/* --- PDF VIEWER PLACEHOLDER --- */}
      {showPdfViewer && (
        <div className="fixed inset-0 z-50 bg-[#0d0d0f] flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-gray-800 bg-[#151518]">
            <div className="flex items-center gap-3">
               <FileText className="w-6 h-6 text-yellow-500" />
               <span className="font-medium">Απόφαση_ΑΠ_124_2023.pdf</span>
            </div>
            <button onClick={() => setShowPdfViewer(false)} className="p-2 hover:bg-gray-800 rounded-full transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center bg-[#1a1a1c]">
             <div className="w-full max-w-4xl h-[90%] bg-white rounded-lg shadow-2xl flex items-center justify-center text-gray-400">
                [ Εδώ θα φορτώνει το PDF.js viewer με την νομολογία ]
             </div>
          </div>
        </div>
      )}

      {/* --- LLM / RAG CHATBOT PLACEHOLDER --- */}
      {showChatbot && (
        <div className="fixed bottom-24 right-8 z-40 w-96 h-[500px] bg-[#1c1c1e] border border-gray-700/50 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-4 border-b border-gray-700 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-400" />
              <span className="font-bold text-sm">Nomologia AI Assistant</span>
            </div>
            <button onClick={() => setShowChatbot(false)} className="text-gray-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-[#151518]">
             <div className="bg-[#2a2a2c] p-3 rounded-xl rounded-tl-none w-[85%] text-sm text-gray-300">
               Γεια σας! Είμαι ο AI βοηθός της Nomologia. Πώς μπορώ να σας βοηθήσω στην αναζήτηση νομολογίας σήμερα; Μπορώ να εξηγήσω νομικούς όρους, να συνοψίσω αποφάσεις ή να βρω σχετική νομοθεσία (RAG).
             </div>
          </div>
          <div className="p-3 border-t border-gray-700 bg-[#1c1c1e]">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Ρωτήστε κάτι..." 
                className="w-full bg-[#2a2a2c] text-white text-sm rounded-full pl-4 pr-10 py-2.5 outline-none border border-transparent focus:border-yellow-500/50"
              />
              <button className="absolute right-2 top-1.5 p-1 bg-yellow-500 rounded-full text-black">
                 <Command className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Global CSS injected for specific styling needs not covered by standard Tailwind */}
      <style dangerouslySetInnerHTML={{__html: `
        .style-outline {
          -webkit-text-stroke: 1px rgba(255,255,255,0.1);
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent; 
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #333; 
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #555; 
        }
      `}} />
    </div>
  );
}