import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { questionFlows, generateCategorySuggestions, GiftItem, getMallLinks } from '../lib/gift_items';

interface ChatMessage {
  id: string;
  from: 'user' | 'bot';
  text?: string;
  options?: string[];
  suggestions?: GiftItem[];
  timestamp: Date;
  type?: string;
  optional?: boolean;
}

interface GiftChatUIProps {
  category: string;
  target: string;
}

export default function GiftChatUI({ category, target }: GiftChatUIProps) {
  const [chat, setChat] = useState<ChatMessage[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isTyping, setIsTyping] = useState(false);
  const [textareaValue, setTextareaValue] = useState("");
  const chatRef = useRef<HTMLDivElement>(null);

  // 初期メッセージ
  useEffect(() => {
    const initialMessage: ChatMessage = {
      id: 'initial',
      from: 'bot',
      text: `🎁「${category}」がおすすめカテゴリですね。\nいくつかお伺いしますね。`,
      timestamp: new Date()
    };
    setChat([initialMessage]);
  }, [category]);

  // チャットを最下部にスクロール
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [chat]);

  // タイピングアニメーション
  const addTypingMessage = () => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
    }, 1500);
  };

  // カテゴリ別の質問フローを取得
  const getQuestionsForCategory = () => {
    return questionFlows[category as keyof typeof questionFlows] || [];
  };

  // 質問を追加
  const addQuestion = (questionIndex: number) => {
    const questions = getQuestionsForCategory();
    if (questionIndex >= questions.length) return;
    
    const question = questions[questionIndex];
    const questionMessage: ChatMessage = {
      id: `question_${questionIndex}`,
      from: 'bot',
      text: question.question,
      options: question.options,
      type: question.type,
      optional: question.optional,
      timestamp: new Date()
    };
    
    setChat(prev => [...prev, questionMessage]);
  };

  // 次の質問を表示
  useEffect(() => {
    const questions = getQuestionsForCategory();
    if (currentQuestionIndex < questions.length) {
      const timer = setTimeout(() => {
        addTypingMessage();
        setTimeout(() => {
          addQuestion(currentQuestionIndex);
        }, 1500);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [currentQuestionIndex, category]);

  // オプション選択時の処理
  const handleOption = (option: string) => {
    const questions = getQuestionsForCategory();
    const currentQuestion = questions[currentQuestionIndex];
    
    // ユーザーの回答を追加
    const userMessage: ChatMessage = {
      id: `user_${currentQuestionIndex}`,
      from: 'user',
      text: option,
      timestamp: new Date()
    };
    
    setChat(prev => [...prev, userMessage]);
    
    // 回答を保存
    const newAnswers = {
      ...answers,
      [`question_${currentQuestionIndex}`]: option
    };
    setAnswers(newAnswers);
    
    // 次の質問へ
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // 最後の質問の場合、提案を生成（回答を直接渡す）
      setTimeout(() => {
        generateSuggestionsWithAnswers(newAnswers);
      }, 1000);
    }
  };

  // textarea送信処理
  const handleTextareaSubmit = () => {
    if (!textareaValue.trim()) return;
    
    const questions = getQuestionsForCategory();
    const currentQuestion = questions[currentQuestionIndex];
    
    // ユーザーの回答を追加
    const userMessage: ChatMessage = {
      id: `user_${currentQuestionIndex}`,
      from: 'user',
      text: textareaValue,
      timestamp: new Date()
    };
    
    setChat(prev => [...prev, userMessage]);
    
    // 回答を保存
    const newAnswers = {
      ...answers,
      [`question_${currentQuestionIndex}`]: textareaValue
    };
    setAnswers(newAnswers);
    
    // 提案を生成
    setTimeout(() => {
      generateSuggestionsWithAnswers(newAnswers);
    }, 1000);
    
    setTextareaValue("");
  };

  // 提案を生成（回答を直接受け取る）
  const generateSuggestionsWithAnswers = (answersToUse: Record<string, string>) => {
    console.log("=== generateSuggestionsWithAnswers 呼び出し ===");
    console.log("カテゴリ:", category);
    console.log("回答:", answersToUse);
    
    addTypingMessage();
    
    setTimeout(() => {
      // カテゴリ別の提案生成関数を使用
      const suggestions = generateCategorySuggestions(category, answersToUse);
      
      const suggestionMessage: ChatMessage = {
        id: 'suggestions',
        from: 'bot',
        text: `${target}にぴったりのギフトを3つ選びました！`,
        suggestions: suggestions,
        timestamp: new Date()
      };
      
      setChat(prev => [...prev, suggestionMessage]);
    }, 2000);
  };

  // 提案を生成（従来の方法）
  const generateSuggestions = () => {
    console.log("=== generateSuggestions 呼び出し ===");
    console.log("カテゴリ:", category);
    console.log("回答:", answers);
    
    addTypingMessage();
    
    setTimeout(() => {
      // カテゴリ別の提案生成関数を使用
      const suggestions = generateCategorySuggestions(category, answers);
      
      const suggestionMessage: ChatMessage = {
        id: 'suggestions',
        from: 'bot',
        text: `${target}にぴったりのギフトを3つ選びました！`,
        suggestions: suggestions,
        timestamp: new Date()
      };
      
      setChat(prev => [...prev, suggestionMessage]);
    }, 2000);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      {/* ヘッダー */}
      <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-4">
        <h3 className="font-semibold text-center">🎁 ギフト相談AI</h3>
        <p className="text-sm text-center opacity-90">{target}への{category}</p>
      </div>
      
      {/* チャットエリア */}
      <div 
        className="h-[500px] overflow-y-auto p-4 space-y-4 bg-gray-50"
        ref={chatRef}
      >
        <AnimatePresence>
          {chat.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={`flex ${message.from === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                  message.from === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white border border-gray-200'
                }`}
              >
                {message.text && (
                  <p className="whitespace-pre-line text-sm">{message.text}</p>
                )}
                
                {message.options && (
                  <div className="mt-3 space-y-2">
                    {message.options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleOption(option)}
                        className="block w-full text-left px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors text-sm"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
                
                {message.type === "textarea" && (
                  <div className="mt-3">
                    <textarea
                      value={textareaValue}
                      onChange={(e) => setTextareaValue(e.target.value)}
                      placeholder={message.optional ? "（任意）ご自由にご記入ください" : "ご記入ください"}
                      className="w-full h-20 px-3 py-2 border border-gray-300 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="mt-2 flex justify-end gap-2">
                      {message.optional && (
                        <button
                          onClick={() => {
                            const newAnswers = {
                              ...answers,
                              [`question_${currentQuestionIndex}`]: ""
                            };
                            setTimeout(() => {
                              generateSuggestionsWithAnswers(newAnswers);
                            }, 1000);
                          }}
                          className="px-3 py-1 text-xs bg-gray-200 text-gray-600 rounded hover:bg-gray-300 transition-colors"
                        >
                          スキップ
                        </button>
                      )}
                      <button
                        onClick={handleTextareaSubmit}
                        disabled={!textareaValue.trim()}
                        className="px-4 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                      >
                        送信
                      </button>
                    </div>
                  </div>
                )}
                
                {message.suggestions && (
                  <div className="mt-4 space-y-3">
                    {message.suggestions.map((suggestion, index) => {
                      const mallLinks = getMallLinks(suggestion.keywords);
                      return (
                        <div key={index} className="border border-gray-200 rounded-lg p-3 bg-white">
                          <h4 className="font-semibold text-gray-900 text-sm">
                            🎁 {suggestion.name}
                          </h4>
                          <p className="text-xs text-gray-600 mt-1">
                            {suggestion.description}
                          </p>
                          <p className="text-xs font-medium text-blue-600 mt-1">
                            {suggestion.priceRange}
                          </p>
                          <div className="flex gap-2 mt-2">
                            <a
                              href={mallLinks.amazon}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded hover:bg-orange-200 transition-colors"
                            >
                              Amazon
                            </a>
                            <a
                              href={mallLinks.rakuten}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded hover:bg-red-200 transition-colors"
                            >
                              楽天
                            </a>
                            <a
                              href={mallLinks.yahoo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded hover:bg-green-200 transition-colors"
                            >
                              Yahoo
                            </a>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {/* タイピングインジケーター */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-white border border-gray-200 rounded-2xl px-4 py-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
      
      {/* フッター */}
      <div className="bg-gray-100 p-3 text-center">
        <p className="text-xs text-gray-500">
          AIがあなたにぴったりのギフトを提案します
        </p>
      </div>
    </div>
  );
}
