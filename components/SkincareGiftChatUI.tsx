import React, { useState, useEffect } from 'react';
import { 
  skincareQuestionFlow, 
  generateSkincareSuggestions, 
  generateAIComment,
  Question,
  SkincareGiftItem 
} from '../lib/gift_items_mother_v2';

interface ChatMessage {
  id: string;
  from: 'bot' | 'user';
  text: string;
  options?: string[];
  timestamp: Date;
  isMultiple?: boolean;
  isFreeText?: boolean;
}

interface SkincareGiftChatUIProps {
  version?: string;
}

const SkincareGiftChatUI: React.FC<SkincareGiftChatUIProps> = ({ version = "v2" }) => {
  const [chat, setChat] = useState<ChatMessage[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [suggestions, setSuggestions] = useState<SkincareGiftItem[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [freeTextInput, setFreeTextInput] = useState('');

  useEffect(() => {
    // 最初の挨拶メッセージを追加（一度だけ実行）
    const greetingMessage: ChatMessage = {
      id: 'greeting',
      from: 'bot',
      text: 'こんにちは！実母さまへの素敵なスキンケアギフトを一緒に選びましょう。\n\nお母さまの年齢や肌の悩み、お好みなど、色々お伺いさせていただきますね。',
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
    if (questionIndex >= skincareQuestionFlow.length) return;

    const question = skincareQuestionFlow[questionIndex];

    // 既に同じ質問が表示されているかチェック
    const questionId = `question_${questionIndex}`;
    const alreadyExists = chat.some(msg => msg.id === questionId);
    if (alreadyExists) {
      return; // 既に表示されている場合は何もしない
    }

    // 条件分岐チェック
    if (question.condition) {
      const shouldSkip = checkSkipCondition(question.condition);
      if (shouldSkip) {
        setCurrentQuestionIndex(prev => prev + 1);
        return;
      }
    }

    const questionMessage: ChatMessage = {
      id: questionId,
      from: 'bot',
      text: question.question,
      options: question.options,
      isMultiple: question.type === 'multiple',
      isFreeText: question.type === 'freeText',
      timestamp: new Date()
    };

    setChat(prev => [...prev, questionMessage]);
  };

  // スキップ条件チェック
  const checkSkipCondition = (condition: { questionId: string; expectedAnswer: string | string[] }): boolean => {
    const prevAnswer = answers[condition.questionId];
    const expected = condition.expectedAnswer;

    if (Array.isArray(expected)) {
      if (Array.isArray(prevAnswer)) {
        return prevAnswer.some(ans => expected.includes(ans));
      } else if (typeof prevAnswer === 'string') {
        return expected.includes(prevAnswer);
      }
    } else {
      return prevAnswer === expected;
    }
    return false;
  };

  // 会話メッセージを生成
  const getConversationMessage = (questionIndex: number, answer: string): string[] => {
    const messages: string[] = [];
    
    switch (questionIndex) {
      case 0: // 年齢
        if (answer.includes('40代')) {
          messages.push('40代のお母さまですね。まだまだ若々しい時期ですが、エイジングケアの準備を始めるのに良いタイミングですね。');
        } else if (answer.includes('50代')) {
          messages.push('50代のお母さまですね。成熟した美しさを保つためのケアが大切な時期ですね。');
        } else if (answer.includes('60代')) {
          messages.push('60代のお母さまですね。長年の経験と知恵が美しさに表れる素敵な年代ですね。');
        } else if (answer.includes('70代')) {
          messages.push('70代のお母さまですね。上品で落ち着いた美しさを大切にしたい時期ですね。');
        } else if (answer.includes('80代以上')) {
          messages.push('80代以上のお母さまですね。長寿の美しさを大切にしたい素晴らしい年代ですね。');
        }
        break;
        
      case 1: // 肌の悩み
        if (answer.includes('乾燥・小じわ')) {
          messages.push('乾燥や小じわが気になるのですね。保湿をしっかりと行うことで、肌のハリと潤いを取り戻せますよ。');
        } else if (answer.includes('シミ・くすみ')) {
          messages.push('シミやくすみが気になるのですね。美白ケアで明るい肌を取り戻しましょう。');
        } else if (answer.includes('たるみ・ハリ不足')) {
          messages.push('たるみやハリ不足が気になるのですね。エイジングケアで肌の弾力をサポートしましょう。');
        } else if (answer.includes('敏感肌')) {
          messages.push('敏感肌なのですね。肌に優しい成分で、安心して使えるものを選びましょう。');
        }
        break;
        
      case 2: // スキンケアスタイル
        if (answer.includes('シンプル')) {
          messages.push('シンプルなケアを好まれるのですね。手軽に使えるアイテムで、毎日のケアを楽しんでいただけるものを選びましょう。');
        } else if (answer.includes('平均的')) {
          messages.push('適度なケアをされているのですね。バランスの良いアイテムで、さらに美しい肌を目指しましょう。');
        } else if (answer.includes('しっかり')) {
          messages.push('しっかりとしたケアをされているのですね。本格的なアイテムで、より効果的なケアをサポートしましょう。');
        }
        break;
    }
    
    return messages;
  };

  // オプション選択時の処理
  const handleOption = (option: string) => {
    const currentQuestion = skincareQuestionFlow[currentQuestionIndex];
    
    // ユーザーの回答を追加
    const userMessage: ChatMessage = {
      id: `user_${currentQuestionIndex}`,
      from: 'user',
      text: option,
      timestamp: new Date()
    };

    setChat(prev => [...prev, userMessage]);

    // 回答を保存
    const newAnswers = { ...answers };
    
    if (currentQuestion.type === 'multiple') {
      const currentAnswers = (newAnswers[currentQuestion.id] as string[]) || [];
      if (currentAnswers.includes(option)) {
        // 既に選択済みの場合は削除
        newAnswers[currentQuestion.id] = currentAnswers.filter(a => a !== option);
      } else {
        // 新規追加
        newAnswers[currentQuestion.id] = [...currentAnswers, option];
      }
    } else {
      newAnswers[currentQuestion.id] = option;
    }
    
    setAnswers(newAnswers);

    // 次の質問を探す
    let nextQuestionIndex = currentQuestionIndex + 1;
    
    // 条件分岐を考慮して次の質問を決定
    while (nextQuestionIndex < skincareQuestionFlow.length) {
      const nextQuestion = skincareQuestionFlow[nextQuestionIndex];
      if (nextQuestion.condition) {
        const shouldSkip = checkSkipCondition(nextQuestion.condition);
        if (shouldSkip) {
          nextQuestionIndex++;
          continue;
        }
      }
      break;
    }

    if (nextQuestionIndex < skincareQuestionFlow.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
      
      // 質問の間に自然な会話を挟む
      const conversationMessages = getConversationMessage(currentQuestionIndex, option);
      if (conversationMessages.length > 0) {
        conversationMessages.forEach((message, index) => {
          setTimeout(() => {
            const conversationMessage: ChatMessage = {
              id: `conversation_${currentQuestionIndex}_${index}`,
              from: 'bot',
              text: message,
              timestamp: new Date()
            };
            setChat(prev => [...prev, conversationMessage]);
          }, (index + 1) * 1500);
        });
        
        // 会話の後に次の質問を追加
        setTimeout(() => addQuestion(nextQuestionIndex), conversationMessages.length * 1500 + 1000);
      } else {
        setTimeout(() => addQuestion(nextQuestionIndex), 1000);
      }
    } else {
      // 最後の質問の場合、提案を生成
      setTimeout(() => {
        generateSuggestionsWithAnswers(newAnswers);
      }, 1000);
    }
  };

  // 提案生成
  const generateSuggestionsWithAnswers = async (finalAnswers: Record<string, string | string[]>) => {
    const generatedSuggestions = generateSkincareSuggestions(finalAnswers);
    setSuggestions(generatedSuggestions);
    setIsComplete(true);

    // 提案メッセージを追加
    const suggestionMessage: ChatMessage = {
      id: 'suggestions',
      from: 'bot',
      text: 'お母さまにぴったりのスキンケアギフトをご提案いたします！',
      timestamp: new Date()
    };

    setChat(prev => [...prev, suggestionMessage]);

    // GPT APIでAIコメントを生成
    try {
      const response = await fetch('/api/gpt/skincare-suggestions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          answers: finalAnswers,
          suggestions: generatedSuggestions
        }),
      });

      if (response.ok) {
        const { aiComment } = await response.json();
        
        // AIコメントを追加
        const aiCommentMessage: ChatMessage = {
          id: 'ai-comment',
          from: 'bot',
          text: aiComment,
          timestamp: new Date()
        };

        setChat(prev => [...prev, aiCommentMessage]);
      }
    } catch (error) {
      console.error('GPT API Error:', error);
      // エラー時はデフォルトのコメントを表示
      const defaultComment: ChatMessage = {
        id: 'default-comment',
        from: 'bot',
        text: 'お母さまへの感謝の気持ちが一番大切ですね。きっと喜んでいただけると思います！',
        timestamp: new Date()
      };
      setChat(prev => [...prev, defaultComment]);
    }
  };

  // 自由記述の送信
  const handleFreeTextSubmit = () => {
    if (freeTextInput.trim()) {
      const currentQuestion = skincareQuestionFlow[currentQuestionIndex];
      const userMessage: ChatMessage = {
        id: `user_${currentQuestionIndex}`,
        from: 'user',
        text: freeTextInput,
        timestamp: new Date()
      };

      setChat(prev => [...prev, userMessage]);

      const newAnswers = {
        ...answers,
        [currentQuestion.id]: freeTextInput
      };
      setAnswers(newAnswers);

      setFreeTextInput('');
      setCurrentQuestionIndex(prev => prev + 1);
      
      setTimeout(() => {
        if (currentQuestionIndex + 1 < skincareQuestionFlow.length) {
          addQuestion(currentQuestionIndex + 1);
        } else {
          generateSuggestionsWithAnswers(newAnswers);
        }
      }, 1000);
    }
  };

  // チャットをリセット
  const resetChat = () => {
    setChat([]);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setSuggestions([]);
    setIsComplete(false);
    setFreeTextInput('');
    setTimeout(() => addQuestion(0), 500);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* チャット表示エリア */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="h-96 overflow-y-auto mb-4 space-y-4">
          {chat.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.from === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.from === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <p className="text-sm">{message.text}</p>
                {message.options && message.options.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {message.options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleOption(option)}
                        className="block w-full text-left px-3 py-2 text-xs bg-white text-gray-700 rounded border hover:bg-gray-50 transition-colors"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
                
                {message.isFreeText && (
                  <div className="mt-2">
                    <textarea
                      value={freeTextInput}
                      onChange={(e) => setFreeTextInput(e.target.value)}
                      placeholder="メッセージを入力してください..."
                      className="w-full p-2 text-xs border rounded resize-none"
                      rows={3}
                    />
                    <button
                      onClick={handleFreeTextSubmit}
                      disabled={!freeTextInput.trim()}
                      className="mt-2 px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                      送信
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* リセットボタン */}
        <div className="text-center">
          <button
            onClick={resetChat}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
          >
            最初からやり直す
          </button>
        </div>
      </div>

      {/* 提案カード表示 */}
      {isComplete && suggestions.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-gray-800 text-center">
            おすすめのスキンケアギフト
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {suggestions.map((suggestion) => (
              <SuggestionCard 
                key={suggestion.id} 
                suggestion={suggestion} 
                answers={answers}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// 提案カードコンポーネント
interface SuggestionCardProps {
  suggestion: SkincareGiftItem;
  answers: Record<string, string | string[]>;
}

const SuggestionCard: React.FC<SuggestionCardProps> = ({ suggestion, answers }) => {
  const aiComment = generateAIComment(answers, suggestion);

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* 画像エリア */}
      <div className="h-48 bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center">
        <div className="text-6xl">🧴</div>
      </div>
      
      {/* コンテンツエリア */}
      <div className="p-6">
        <h4 className="text-lg font-bold text-gray-800 mb-2">
          {suggestion.name}
        </h4>
        
        <p className="text-sm text-gray-600 mb-3">
          {aiComment}
        </p>
        
        <div className="mb-4">
          <span className="inline-block bg-pink-100 text-pink-800 text-xs px-2 py-1 rounded-full">
            {suggestion.priceRange}
          </span>
        </div>
        
        {/* 特徴 */}
        <div className="mb-4">
          <h5 className="text-sm font-semibold text-gray-700 mb-2">特徴</h5>
          <ul className="text-xs text-gray-600 space-y-1">
            {suggestion.features.map((feature, index) => (
              <li key={index} className="flex items-center">
                <span className="w-1 h-1 bg-pink-400 rounded-full mr-2"></span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
        
        {/* モールリンク */}
        <div className="space-y-2">
          <a
            href={suggestion.mallLinks.rakuten}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center bg-red-500 text-white text-sm py-2 px-4 rounded hover:bg-red-600 transition-colors"
          >
            楽天で見る
          </a>
          <a
            href={suggestion.mallLinks.amazon}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center bg-orange-500 text-white text-sm py-2 px-4 rounded hover:bg-orange-600 transition-colors"
          >
            Amazonで見る
          </a>
          <a
            href={suggestion.mallLinks.yahoo}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center bg-purple-500 text-white text-sm py-2 px-4 rounded hover:bg-purple-600 transition-colors"
          >
            Yahoo!で見る
          </a>
        </div>
      </div>
    </div>
  );
};

export default SkincareGiftChatUI;
