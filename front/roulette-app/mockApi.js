
export const analyzeSentiment = async (message) => {
    // APIコールをシミュレート
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // メッセージの長さや内容に応じてスコアを調整
    const baseScore = Math.floor(Math.random() * 61); // 基本スコア: 0-60
    const lengthBonus = Math.min(20, message.length); // 文字数ボーナス: 最大20
    const specialBonus = message.includes('頑張') || message.includes('がんば') ? 20 : 0; // 特定のキーワードボーナス
    
    // 総合スコア（0-100に収まるように調整）
    const totalScore = Math.min(100, baseScore + lengthBonus + specialBonus);
    
    return totalScore;
  };
