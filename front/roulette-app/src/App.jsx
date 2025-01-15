import RouletteWheel from './components/RouletteWheel'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <h1 className="text-3xl font-bold text-center text-white p-4">ルーレットアプリ</h1>
      <div className="flex-grow flex items-center justify-center px-4">
        <RouletteWheel />
      </div>
    </div>
  )
}

export default App
