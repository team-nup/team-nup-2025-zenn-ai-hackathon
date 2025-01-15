import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { BookOpen, Home } from 'lucide-react';
import RouletteWheel from './components/RouletteWheel';
import HowToUse from './components/HowToUse';

function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-900 to-slate-800">
      {/* ヘッダー */}
      <header className="fixed w-full top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between h-16">
            <Link 
              to="/" 
              className="flex items-center space-x-2 text-xl font-bold text-white hover:text-white/80 transition-colors"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <Home className="w-5 h-5 text-white" />
              </div>
              <span>Roulette</span>
            </Link>

            <Link 
              to="/how-to-use"
              className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
                location.pathname === '/how-to-use' 
                  ? 'bg-white text-slate-900 shadow-lg' 
                  : 'text-white hover:bg-white/10'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span className="font-medium">使い方</span>
            </Link>
          </nav>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="flex-grow flex items-center justify-center p-4 mt-16">
        <Routes>
          <Route path="/" element={<RouletteWheel />} />
          <Route path="/how-to-use" element={<HowToUse />} />
        </Routes>
      </main>

      {/* フッター */}
      <footer className="bg-slate-900/80 backdrop-blur-md border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-md flex items-center justify-center">
                <Home className="w-4 h-4 text-white" />
              </div>
              <span className="text-white font-semibold">Roulette App</span>
            </div>
            <p className="text-white/40 text-sm">
              Created with by Team enumura
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Router で App をラップするためのコンポーネント
function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
