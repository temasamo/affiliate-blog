// pages/diagnostic-ai/tea.tsx
import React, { useState } from 'react';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

interface TeaPreference {
  taste: string;
  occasion: string;
  experience: string;
  budget: string;
}

export default function TeaDiagnostic() {
  const [currentStep, setCurrentStep] = useState(0);
  const [preferences, setPreferences] = useState<TeaPreference>({
    taste: '',
    occasion: '',
    experience: '',
    budget: ''
  });
  const [result, setResult] = useState<any>(null);

  const questions = [
    {
      id: 'taste',
      question: 'どのような味のお茶がお好みですか？',
      options: [
        { value: 'sweet', label: '甘みのあるお茶', description: '抹茶、玉露など' },
        { value: 'bitter', label: '苦みのあるお茶', description: '煎茶、番茶など' },
        { value: 'mild', label: 'まろやかなお茶', description: 'ほうじ茶、玄米茶など' },
        { value: 'fragrant', label: '香りの良いお茶', description: 'ジャスミン茶、ウーロン茶など' }
      ]
    },
    {
      id: 'occasion',
      question: '主にどのような場面でお茶を飲みますか？',
      options: [
        { value: 'daily', label: '日常的に', description: '毎日の生活に' },
        { value: 'relax', label: 'リラックスタイム', description: '休憩時、読書時など' },
        { value: 'formal', label: '正式な場面', description: 'お客様接待、茶道など' },
        { value: 'gift', label: 'ギフト用', description: 'プレゼントとして' }
      ]
    },
    {
      id: 'experience',
      question: '日本茶の経験はどの程度ですか？',
      options: [
        { value: 'beginner', label: '初心者', description: 'これから始めたい' },
        { value: 'intermediate', label: '中級者', description: '基本的な知識がある' },
        { value: 'advanced', label: '上級者', description: '深い知識と経験がある' },
        { value: 'expert', label: '専門家', description: '茶道や製茶の専門知識がある' }
      ]
    },
    {
      id: 'budget',
      question: 'お茶の予算はどの程度ですか？',
      options: [
        { value: 'low', label: '1,000円以下', description: '手軽に楽しみたい' },
        { value: 'medium', label: '1,000円〜5,000円', description: '品質を重視したい' },
        { value: 'high', label: '5,000円〜10,000円', description: '高級茶を楽しみたい' },
        { value: 'premium', label: '10,000円以上', description: '最高級の茶を求める' }
      ]
    }
  ];

  const handleAnswer = (questionId: string, answer: string) => {
    setPreferences(prev => ({
      ...prev,
      [questionId]: answer
    }));
    
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // 診断結果を生成
      generateResult({ ...preferences, [questionId]: answer });
    }
  };

  const generateResult = (finalPreferences: TeaPreference) => {
    // 簡単な診断ロジック（実際のAI診断に置き換え可能）
    const recommendations = [];
    
    if (finalPreferences.taste === 'sweet' && finalPreferences.experience === 'beginner') {
      recommendations.push({
        type: '抹茶',
        brand: '宇治園',
        reason: '初心者でも飲みやすい甘みのある抹茶',
        link: '/articles/japanesetea/recommend/ujien'
      });
    }
    
    if (finalPreferences.taste === 'bitter' && finalPreferences.occasion === 'daily') {
      recommendations.push({
        type: '煎茶',
        brand: '伊藤園',
        reason: '日常的に楽しめる上質な煎茶',
        link: '/articles/japanesetea/recommend/itoen'
      });
    }
    
    if (finalPreferences.taste === 'mild' && finalPreferences.budget === 'low') {
      recommendations.push({
        type: 'ほうじ茶',
        brand: '山本山',
        reason: '手軽でまろやかな味わいのほうじ茶',
        link: '/articles/japanesetea/recommend/yamamotoyama'
      });
    }

    setResult({
      recommendations,
      summary: `あなたの好みに合ったお茶は「${recommendations[0]?.type || '煎茶'}」です。`
    });
  };

  const resetDiagnostic = () => {
    setCurrentStep(0);
    setPreferences({
      taste: '',
      occasion: '',
      experience: '',
      budget: ''
    });
    setResult(null);
  };

  if (result) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header 
          title="お茶診断AI 結果 - Market Supporter AI"
          description="あなたに最適なお茶を診断します。"
        />
        
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="bg-white rounded-2xl shadow-md p-8">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">🍵</div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                診断結果
              </h1>
              <p className="text-lg text-gray-600">
                {result.summary}
              </p>
            </div>

            <div className="space-y-6">
              {result.recommendations.map((rec: any, index: number) => (
                <div key={index} className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {rec.type} - {rec.brand}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {rec.reason}
                      </p>
                      <Link 
                        href={rec.link}
                        className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        詳細を見る
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={resetDiagnostic}
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                もう一度診断する
              </button>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title="お茶診断AI - Market Supporter AI"
        description="あなたに最適なお茶を診断します。"
      />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="bg-white rounded-2xl shadow-md p-8">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🤖</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              お茶診断AI
            </h1>
            <p className="text-lg text-gray-600">
              あなたの好みに合った最適なお茶を見つけましょう
            </p>
          </div>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-medium text-gray-600">
                質問 {currentStep + 1} / {questions.length}
              </span>
              <span className="text-sm text-gray-500">
                {Math.round(((currentStep + 1) / questions.length) * 100)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              {questions[currentStep].question}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {questions[currentStep].options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(questions[currentStep].id, option.value)}
                  className="text-left p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
                >
                  <div className="font-medium text-gray-900 mb-1">
                    {option.label}
                  </div>
                  <div className="text-sm text-gray-600">
                    {option.description}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

