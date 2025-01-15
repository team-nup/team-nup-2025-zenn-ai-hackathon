import { useState } from 'react';
import { ChevronDown, Settings2, Plus, Trash2, Send } from 'lucide-react';

const DEFAULT_OPTIONS = [
  { color: '#FF3B3B', name: 'Red', weight: 1 },
  { color: '#00C9A7', name: 'Mint', weight: 1 },
  { color: '#4D7FFF', name: 'Blue', weight: 1 },
  { color: '#00B894', name: 'Green', weight: 1 },
  { color: '#9B51E0', name: 'Purple', weight: 1 },
  { color: '#FF66B2', name: 'Pink', weight: 1 },
  { color: '#FFD700', name: 'Yellow', weight: 1 },
  { color: '#FF9933', name: 'Orange', weight: 1 }
];

const RouletteWheel = () => {
  const [rouletteState, setRouletteState] = useState({
    isSpinning: false,
    result: null,
    rotation: 0,
    options: DEFAULT_OPTIONS
  });

  const [settingsState, setSettingsState] = useState({
    isOpen: false,
    newOption: {
      name: '',
      weight: 1
    }
  });

  const [messageInput, setMessageInput] = useState('');

  const totalWeight = rouletteState.options.reduce((sum, option) => sum + option.weight, 0);

  const spinWheel = () => {
    if (rouletteState.isSpinning) return;
    
    const spins = 5;
    const baseRotation = 360 * spins;
    
    // 結果を決定（ランダムな角度から結果を計算）
    const randomAngle = Math.random() * 360;
    const normalizedAngle = randomAngle % 360;
    let accumulatedAngle = 0;
    let selectedResult = null;
    
    // 角度から該当するセクションを特定
    for (const option of rouletteState.options) {
      const sectorAngle = (option.weight / totalWeight) * 360;
      if (normalizedAngle >= accumulatedAngle && normalizedAngle < accumulatedAngle + sectorAngle) {
        selectedResult = option;
        break;
      }
      accumulatedAngle += sectorAngle;
    }
    
    // 万が一の場合の対応
    if (!selectedResult) {
      selectedResult = rouletteState.options[rouletteState.options.length - 1];
    }
  
    // 回転角度の計算（矢印が上を指すように360度から引く）
    const finalRotation = baseRotation + (360 - normalizedAngle);
  
    setRouletteState(prev => ({
      ...prev,
      isSpinning: true,
      rotation: finalRotation,
      result: selectedResult
    }));
    
    setTimeout(() => {
      setRouletteState(prev => ({
        ...prev,
        isSpinning: false
      }));
    }, 3000);
  };

  const createSectorPath = (startAngle, endAngle, radius) => {
    const start = polarToCartesian(radius, startAngle);
    const end = polarToCartesian(radius, endAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;
    
    return [
      'M', 0, 0,
      'L', start.x, start.y,
      'A', radius, radius, 0, largeArcFlag, 1, end.x, end.y,
      'Z'
    ].join(' ');
  };

  const polarToCartesian = (radius, angle) => {
    const angleInRadians = ((angle - 90) * Math.PI) / 180;
    return {
      x: radius * Math.cos(angleInRadians),
      y: radius * Math.sin(angleInRadians)
    };
  };

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;
    console.log('送信されたメッセージ:', messageInput);
    setMessageInput('');
  };

  const addOption = () => {
    if (!settingsState.newOption.name.trim()) return;
    
    const newOption = {
      name: settingsState.newOption.name,
      color: `#${Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')}`,
      weight: settingsState.newOption.weight
    };
    
    setRouletteState(prev => ({
      ...prev,
      options: [...prev.options, newOption]
    }));

    setSettingsState(prev => ({
      ...prev,
      newOption: { name: '', weight: 1 }
    }));
  };

  const removeOption = (index) => {
    if (rouletteState.options.length <= 2) return;
    setRouletteState(prev => ({
      ...prev,
      options: prev.options.filter((_, i) => i !== index)
    }));
  };

  const updateOptionName = (index, name) => {
    const newOptions = [...rouletteState.options];
    newOptions[index] = { ...newOptions[index], name };
    setRouletteState(prev => ({
      ...prev,
      options: newOptions
    }));
  };

  const updateOptionWeight = (index, weight) => {
    const newOptions = [...rouletteState.options];
    newOptions[index] = { ...newOptions[index], weight: Math.max(0.1, weight) };
    setRouletteState(prev => ({
      ...prev,
      options: newOptions
    }));
  };

  return (
    <div className="w-full max-w-[min(90vw,32rem)] bg-slate-900/50 text-white p-4 sm:p-6 md:p-8 rounded-xl shadow-2xl backdrop-blur-sm">
      <div className="flex flex-col items-center space-y-6 md:space-y-8">
        <div className="w-full flex items-center gap-2">
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            placeholder="メッセージを入力..."
            className="flex-grow px-4 py-2 rounded-lg bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20"
          />
          <button
            onClick={handleSendMessage}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>

        <div className="w-full flex justify-end">
          <button
            onClick={() => setSettingsState(prev => ({ ...prev, isOpen: !prev.isOpen }))}
            className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors"
          >
            <Settings2 className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="font-medium text-sm sm:text-base">ルーレットを編集</span>
            <span className="ml-1 text-white/60">{settingsState.isOpen ? '▼' : '▶'}</span>
          </button>
        </div>

        {settingsState.isOpen && (
          <div className="w-full bg-white/10 rounded-lg p-3 sm:p-4 space-y-3 sm:space-y-4">
            <h3 className="text-base sm:text-lg font-semibold">設定</h3>
            
            <div className="space-y-2">
              {rouletteState.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={option.name}
                    onChange={(e) => updateOptionName(index, e.target.value)}
                    className="bg-white/5 rounded px-2 py-1 flex-grow text-sm sm:text-base"
                  />
                  <input
                    type="number"
                    value={option.weight}
                    onChange={(e) => updateOptionWeight(index, parseFloat(e.target.value))}
                    min="0.1"
                    step="0.1"
                    className="bg-white/5 rounded px-2 py-1 w-16 sm:w-20 text-sm sm:text-base"
                  />
                  <button
                    onClick={() => removeOption(index)}
                    className="p-1 text-red-400 hover:text-red-300"
                    disabled={rouletteState.options.length <= 2}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={settingsState.newOption.name}
                onChange={(e) => setSettingsState(prev => ({
                  ...prev,
                  newOption: { ...prev.newOption, name: e.target.value }
                }))}
                placeholder="新しい選択肢"
                className="bg-white/5 rounded px-2 py-1 flex-grow text-sm sm:text-base"
              />
              <input
                type="number"
                value={settingsState.newOption.weight}
                onChange={(e) => setSettingsState(prev => ({
                  ...prev,
                  newOption: { ...prev.newOption, weight: parseFloat(e.target.value) }
                }))}
                min="0.1"
                step="0.1"
                className="bg-white/5 rounded px-2 py-1 w-16 sm:w-20 text-sm sm:text-base"
              />
              <button
                onClick={addOption}
                className="p-1 text-green-400 hover:text-green-300"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        <div className="relative">
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-10">
            <div className="bg-white rounded-full p-1 shadow-lg">
              <ChevronDown className="w-6 h-6 sm:w-8 sm:h-8 text-slate-900 animate-bounce" />
            </div>
          </div>
          
          <div 
            className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80"
            style={{
              transform: `rotate(${rouletteState.rotation}deg)`,
              transition: 'transform 3s cubic-bezier(0.4, 2, 0.2, 1)',
            }}
          >
            <svg
              viewBox="-150 -150 300 300"
              className="w-full h-full"
            >
              <defs>
                <filter id="sectorShadow">
                  <feDropShadow dx="0" dy="0" stdDeviation="2" floodOpacity="0.3"/>
                </filter>
              </defs>

              {rouletteState.options.map((option, index) => {
                const totalAngle = 360;
                const angleOffset = rouletteState.options.slice(0, index).reduce(
                  (sum, opt) => sum + (opt.weight / totalWeight) * totalAngle,
                  0
                );
                const sectorAngle = (option.weight / totalWeight) * totalAngle;
                const midAngle = angleOffset + sectorAngle / 2;
                const textPos = polarToCartesian(95, midAngle);

                return (
                  <g key={index}>
                    <path
                      d={createSectorPath(angleOffset, angleOffset + sectorAngle, 150)}
                      fill={option.color}
                      stroke="#1a1a1a"
                      strokeWidth="1"
                      filter="url(#sectorShadow)"
                      className="transition-colors duration-200"
                    />
                    
                    <g transform={`translate(${textPos.x}, ${textPos.y})`}>
                      <text
                        transform={`rotate(${midAngle + 90})`}
                        fill="white"
                        fontSize="14"
                        fontWeight="600"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        style={{ 
                          textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                        }}
                        className="text-sm sm:text-base"
                      >
                        {option.name}
                      </text>
                    </g>
                  </g>
                );
              })}

              <circle cx="0" cy="0" r="25" fill="#ffffff" className="shadow-lg" />
              <circle cx="0" cy="0" r="20" fill="#1a1a1a" />
            </svg>
          </div>

          <div 
            className="absolute top-0 left-0 w-full h-full rounded-full border-4 sm:border-8 border-white/10" 
            style={{pointerEvents: 'none'}} 
          />
        </div>
        
        <div className="text-center space-y-4 sm:space-y-6">
          <button
            onClick={spinWheel}
            disabled={rouletteState.isSpinning}
            className="px-6 py-2 sm:px-8 sm:py-3 bg-white text-slate-900 rounded-full text-base sm:text-lg font-medium transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl"
          >
            {rouletteState.isSpinning ? '回転中...' : 'スピン'}
          </button>
          
          {rouletteState.result && !rouletteState.isSpinning && (
            <div className="flex flex-col items-center space-y-2">
              <p className="text-base sm:text-lg text-white/80">結果</p>
              <div 
                className="text-xl sm:text-2xl font-bold px-4 sm:px-6 py-1.5 sm:py-2 rounded-lg bg-white/10"
                style={{ 
                  color: rouletteState.result.color,
                  textShadow: `0 0 10px ${rouletteState.result.color}40`
                }}
              >
                {rouletteState.result.name}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RouletteWheel;
