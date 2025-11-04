import React, { useState, useEffect } from 'react';
import { childrenQuestionFlow, generateChildrenSuggestions, ChildrenGiftItem } from '@/lib/gift_items_children_v2';

interface ChatMessage {
  id: string;
  from: 'bot' | 'user';
  text: string;
  timestamp: Date;
  options?: string[];
  questionId?: string;
}

interface ChildrenGiftChatUIProps {
  version?: string;
}

const ChildrenGiftChatUI: React.FC<ChildrenGiftChatUIProps> = ({ version = "v2" }) => {
  const [chat, setChat] = useState<ChatMessage[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [suggestions, setSuggestions] = useState<ChildrenGiftItem[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [freeTextInput, setFreeTextInput] = useState('');

  useEffect(() => {
    // 最初の挨拶メッセージを追加（一度だけ実行）
    const greetingMessage: ChatMessage = {
      id: 'greeting',
      from: 'bot',
      text: 'こんにちは！お子さんへの素敵なギフトを一緒に選びましょう。\n\nお子さんの年齢や興味、成長段階に合わせて、楽しくて安全なギフトを提案させていただきますね。',
      timestamp: new Date()
    };
    setChat([greetingMessage]);
    
    // 少し遅らせて最初の質問を追加
    setTimeout(() => {
      addQuestion(0);
    }, 2000);
  }, []); // 空の依存配列で一度だけ実行

  // 質問を追加
  const addQuestion = (questionIndex: number) => {
    if (questionIndex >= childrenQuestionFlow.length) {
      // 全ての質問が完了したら提案を生成
      generateSuggestions();
      return;
    }

    const question = childrenQuestionFlow[questionIndex];
    const questionMessage: ChatMessage = {
      id: `question-${questionIndex}`,
      from: 'bot',
      text: question.question,
      timestamp: new Date(),
      options: question.options,
      questionId: question.id
    };

    setChat(prev => [...prev, questionMessage]);
  };

  // 回答を処理
  const handleAnswer = (questionId: string, answer: string | string[]) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));

    // ユーザーの回答をチャットに追加
    const userMessage: ChatMessage = {
      id: `answer-${questionId}`,
      from: 'user',
      text: Array.isArray(answer) ? answer.join(', ') : answer,
      timestamp: new Date()
    };

    setChat(prev => [...prev, userMessage]);

    // 次の質問へ
    const nextQuestionIndex = currentQuestionIndex + 1;
    setCurrentQuestionIndex(nextQuestionIndex);

    // 少し遅らせて次の質問を追加
    setTimeout(() => {
      addQuestion(nextQuestionIndex);
    }, 1000);
  };

  // 自由記述の回答を処理
  const handleFreeTextSubmit = () => {
    if (freeTextInput.trim()) {
      const currentQuestion = childrenQuestionFlow[currentQuestionIndex];
      handleAnswer(currentQuestion.id, freeTextInput.trim());
      setFreeTextInput('');
    }
  };

  // 提案を生成
  const generateSuggestions = async () => {
    try {
      const generatedSuggestions = generateChildrenSuggestions(answers);
      setSuggestions(generatedSuggestions);
      setIsComplete(true);

      // 提案メッセージを追加
      const suggestionMessage: ChatMessage = {
        id: 'suggestions',
        from: 'bot',
        text: `お子さんにぴったりのギフトを${generatedSuggestions.length}つ提案させていただきました！\n\n年齢と発達段階に合わせた、安全で楽しいギフトです。`,
        timestamp: new Date()
      };

      setChat(prev => [...prev, suggestionMessage]);
    } catch (error) {
      console.error('提案生成エラー:', error);
    }
  };

  // 現在の質問を取得
  const getCurrentQuestion = () => {
    if (currentQuestionIndex < childrenQuestionFlow.length) {
      return childrenQuestionFlow[currentQuestionIndex];
    }
    return null;
  };

  const currentQuestion = getCurrentQuestion();

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* チャット表示エリア */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 max-h-96 overflow-y-auto">
        {chat.map((message) => (
          <div
            key={message.id}
            className={`mb-4 ${
              message.from === 'user' ? 'text-right' : 'text-left'
            }`}
          >
            <div
              className={`inline-block p-3 rounded-lg max-w-xs ${
                message.from === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              <p className="whitespace-pre-wrap">{message.text}</p>
              {message.options && (
                <div className="mt-2 space-y-2">
                  {message.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswer(message.questionId!, option)}
                      className="block w-full text-left p-2 bg-white text-gray-800 rounded border hover:bg-gray-50 transition-colors"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {message.timestamp.toLocaleTimeString()}
            </div>
          </div>
        ))}

        {/* 自由記述入力 */}
        {currentQuestion && currentQuestion.type === 'freeText' && !isComplete && (
          <div className="mt-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={freeTextInput}
                onChange={(e) => setFreeTextInput(e.target.value)}
                placeholder={currentQuestion.question}
                className="flex-1 p-2 border rounded-lg"
                onKeyPress={(e) => e.key === 'Enter' && handleFreeTextSubmit()}
              />
              <button
                onClick={handleFreeTextSubmit}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                送信
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 提案表示エリア */}
      {isComplete && suggestions.length > 0 && (
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
            🎁 お子さんへのおすすめギフト
          </h3>
          <div className="grid gap-6 md:grid-cols-3">
            {suggestions.map((item, index) => (
              <div key={item.id} className="bg-white rounded-xl p-4 shadow-md">
                <div className="text-center mb-3">
                  <div className="w-16 h-16 mx-auto mb-2 bg-yellow-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🎁</span>
                  </div>
                  <h4 className="font-semibold text-gray-900">{item.name}</h4>
                  <p className="text-sm text-yellow-600 font-medium">{item.priceRange}</p>
                </div>
                <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                <div className="space-y-2">
                  <a
                    href={item.mallLinks.rakuten}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-red-500 text-white text-center py-2 px-3 rounded-lg hover:bg-red-600 transition-colors text-sm"
                  >
                    楽天で見る
                  </a>
                  <a
                    href={item.mallLinks.amazon}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-orange-500 text-white text-center py-2 px-3 rounded-lg hover:bg-orange-600 transition-colors text-sm"
                  >
                    Amazonで見る
                  </a>
                  <a
                    href={item.mallLinks.yahoo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-purple-500 text-white text-center py-2 px-3 rounded-lg hover:bg-purple-600 transition-colors text-sm"
                  >
                    Yahoo!で見る
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChildrenGiftChatUI;


