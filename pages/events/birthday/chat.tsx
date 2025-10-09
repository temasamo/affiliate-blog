import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import GiftChatUI from '../../../components/GiftChatUI';
import { questionFlows } from '../../../lib/gift_items';

export default function GiftChatPage() {
  const router = useRouter();
  const { category, target } = router.query;
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // カテゴリとターゲットのバリデーション
  const validCategories = Object.keys(questionFlows);
  const validTargets = ['実母', '実父', '義母', '義父'];

  const isValidCategory = category && validCategories.includes(category as string);
  const isValidTarget = target && validTargets.includes(target as string);

  if (!isClient) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">読み込み中...</p>
        </div>
      </div>
    );
  }

  if (!isValidCategory || !isValidTarget) {
    return (
      <>
        <Header 
          title="ギフト相談 - Market Supporter AI" 
          description="AIがあなたにぴったりのギフトを提案します。"
        />
        <main className="min-h-screen bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">ページが見つかりません</h1>
              <p className="text-gray-600 mb-8">指定されたカテゴリまたは対象者が無効です。</p>
              <Link 
                href="/events/birthday"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                誕生日プレゼント一覧に戻る
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header 
        title={`${target}への${category} - ギフト相談AI`} 
        description={`AIが${target}にぴったりの${category}を提案します。`}
      />
      
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* パンくずリスト */}
          <nav className="mb-8">
            <ol className="flex items-center space-x-2 text-sm text-gray-500">
              <li><Link href="/events" className="hover:text-blue-600">イベント</Link></li>
              <li>/</li>
              <li><Link href="/events/birthday" className="hover:text-blue-600">誕生日プレゼント</Link></li>
              <li>/</li>
              <li><Link href={`/events/birthday/${target === '実母' ? 'mother' : target === '実父' ? 'father' : target === '義母' ? 'mother-in-law' : 'father-in-law'}`} className="hover:text-blue-600">{target}へのプレゼント</Link></li>
              <li>/</li>
              <li className="text-gray-900">AI相談</li>
            </ol>
          </nav>

          {/* ヒーローセクション */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {target}への{category} AI相談
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              AIが{target}の好みや生活スタイルを聞き出して、<br />
              ぴったりの{category}を提案します。
            </p>
          </div>

          {/* チャットUI */}
          <div className="flex justify-center">
            <GiftChatUI 
              category={category as string} 
              target={target as string} 
            />
          </div>

          {/* 実父母と義理父母の分け方について */}
          <div className="mt-12 bg-gradient-to-r from-pink-50 to-blue-50 rounded-2xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              💝 なぜ実父母と義理父母で分けているの？
            </h2>
            <div className="max-w-3xl mx-auto">
              <p className="text-gray-700 text-center leading-relaxed">
                ギフトを贈る相手によって、気持ちもちょっと変わるから。<br />
                実のお母さんには「ありがとう」をストレートに。<br />
                義理のお母さんには「気遣い」や「礼儀」も込めて。<br />
                <br />
                ギフトを贈る時の気持ちのニュアンスの違いを大切にしたくて、<br />
                私たちはご両親と義理のご両親で相談の入り口を分けています。<br />
                <br />
                <span className="text-blue-600 font-medium">
                  相手のことを考える、やさしい時間になりますように。
                </span>
              </p>
            </div>
          </div>

          {/* 説明セクション */}
          <div className="mt-12 bg-white rounded-2xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              🤖 AI相談の使い方
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">💬</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">質問に回答</h3>
                <p className="text-gray-600 text-sm">
                  お母さまの好みや生活スタイルについて、簡単な質問にお答えください。
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">AIが分析</h3>
                <p className="text-gray-600 text-sm">
                  あなたの回答を基に、AIが最適なギフトを3つ選んで提案します。
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🛒</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">購入リンク</h3>
                <p className="text-gray-600 text-sm">
                  お気に入りのギフトが見つかったら、各ECサイトで購入できます。
                </p>
              </div>
            </div>
          </div>

          {/* 関連ページ */}
          <div className="mt-12 bg-gray-100 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              🔗 関連ページ
            </h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Link 
                href="/events/birthday/mother" 
                className="block bg-white rounded-xl p-4 hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">実母へのプレゼント</h3>
                <p className="text-gray-600 text-sm">美容・癒し・食・花・思い出系など、母への感謝を込めたギフト選び</p>
              </Link>

              <Link 
                href="/events/birthday/father" 
                className="block bg-white rounded-xl p-4 hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">実父へのプレゼント</h3>
                <p className="text-gray-600 text-sm">健康・趣味・実用品など、父への感謝を込めたギフト選び</p>
              </Link>

              <Link 
                href="/events/birthday" 
                className="block bg-white rounded-xl p-4 hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">誕生日プレゼント一覧</h3>
                <p className="text-gray-600 text-sm">すべてのカテゴリと対象者向けのギフト選び</p>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
