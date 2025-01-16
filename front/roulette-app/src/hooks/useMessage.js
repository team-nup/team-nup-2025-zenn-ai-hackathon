import { useState } from 'react';
import { analyzeSentiment } from '../api/mockApi';

export const useMessage = () => {
  const [messageInput, setMessageInput] = useState('');
  const [messageSending, setMessageSending] = useState(false);
  const [error, setError] = useState(null);

  const handleSendMessage = async () => {
    if (!messageInput.trim()) return;

    try {
      setMessageSending(true);
      setError(null);
      const sentiment = await analyzeSentiment(messageInput);
      setMessageInput('');
      return sentiment;
    } catch (error) {
      setError('メッセージの送信に失敗しました');
      console.error('API error:', error);
      return null;
    } finally {
      setMessageSending(false);
    }
  };

  return {
    messageInput,
    setMessageInput,
    messageSending,
    error,
    handleSendMessage
  };
};
