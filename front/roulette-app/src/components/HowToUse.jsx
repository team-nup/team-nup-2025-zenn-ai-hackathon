// src/components/HowToUse.jsx
const HowToUse = () => {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto bg-slate-800/50 rounded-xl p-6 shadow-lg space-y-6">
          <h2 className="text-3xl font-bold text-white">使い方ガイド</h2>
          
          <section className="space-y-4">
            <h3 className="text-xl font-semibold text-white">基本操作</h3>
            <div className="space-y-2 text-white/80">
              <p>1. スピンボタンをクリックしてルーレットを回転させます</p>
              <p>2. ルーレットが停止すると、結果が表示されます</p>
            </div>
          </section>
  
          <section className="space-y-4">
            <h3 className="text-xl font-semibold text-white">カスタマイズ</h3>
            <div className="space-y-2 text-white/80">
              <p>1. 「ルーレットを編集」ボタンをクリックして設定パネルを開きます</p>
              <p>2. 各選択肢のテキストや重みを変更できます</p>
              <p>3. 新しい選択肢を追加したり、既存の選択肢を削除したりできます</p>
              <p>4. 重みを調整することで、各選択肢が選ばれる確率を変更できます</p>
            </div>
          </section>
  
          <section className="space-y-4">
            <h3 className="text-xl font-semibold text-white">注意事項</h3>
            <div className="space-y-2 text-white/80">
              <p>• 最低2つの選択肢が必要です</p>
              <p>• 重みは0.1以上の値を設定してください</p>
              <p>• 回転中は新しくスピンできません</p>
            </div>
          </section>
        </div>
      </div>
    );
  };
  
  export default HowToUse;
