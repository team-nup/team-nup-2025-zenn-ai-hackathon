import RouletteWheel from './components/RouletteWheel'

// App.jsx
function App() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-900">
      {/* ヘッダー */}
      <header className="bg-slate-800 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-white">ルーレットアプリ</h1>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="flex-grow flex items-center justify-center p-4">
        <RouletteWheel />
      </main>

      {/* フッター */}
      <footer className="bg-slate-800 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <p className="text-center text-white/60 text-sm">
            © 2024 ルーレットアプリ All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
