import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { BookOpen, Home } from 'lucide-react';
import RouletteWheel from './components/RouletteWheel';
import HowToUse from './components/HowToUse';

function App() {
  const location = useLocation();

  const isCurrentPath = (path) => location.pathname === path;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* ヘッダー */}
      <header className="fixed w-full top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between h-16">
            <Link 
              to="/" 
              className="flex items-center space-x-3 text-xl font-bold text-white hover:text-white/80 transition-all duration-300"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center transform hover:rotate-12 transition-all duration-300">
                <Home className="w-6 h-6 text-white" />
              </div>
              <span className="hidden sm:inline">Random Roulette</span>
            </Link>

            <div className="flex items-center space-x-4">
              <Link 
                to="/how-to-use"
                className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
                  isCurrentPath('/how-to-use')
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/25'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span className="font-medium">使い方</span>
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="flex-grow flex items-center justify-center p-4 mt-16">
        <div className="container mx-auto flex justify-center items-center">
          <Routes>
            <Route path="/" element={<RouletteWheel />} />
            <Route path="/how-to-use" element={<HowToUse />} />
          </Routes>
        </div>
      </main>

      {/* フッター */}
      <footer className="bg-slate-900/80 backdrop-blur-md border-t border-white/10">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-col items-center">
            <p className="text-white/40 text-sm">
              2024 XXXXXXXXXX
            </p>
            <a 
              href="https://github.com/team-nup/team-nup-2025-zenn-ai-hackathon"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white transition-colors"
            >
              Ripozitory
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
