import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title="運営者情報 - Market Supporter AI"
        description="Market Supporter AIの運営者情報をご紹介します。"
      />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="bg-white rounded-2xl shadow-md p-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">運営者情報</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 mb-6">
              当サイト「Market Supporter AI」は、TEMOMASAが運営しています。
              訪問者の皆さまに役立つ商品比較・ランキング・レビュー情報を発信し、より良い購買選択のサポートを目的としています。
            </p>

            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">サイト情報</h2>
              <dl className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center">
                  <dt className="text-sm font-medium text-gray-600 sm:w-32 sm:flex-shrink-0">サイト名</dt>
                  <dd className="text-sm text-gray-900 sm:ml-6">Market Supporter AI</dd>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center">
                  <dt className="text-sm font-medium text-gray-600 sm:w-32 sm:flex-shrink-0">運営者</dt>
                  <dd className="text-sm text-gray-900 sm:ml-6">TEMOMASA</dd>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center">
                  <dt className="text-sm font-medium text-gray-600 sm:w-32 sm:flex-shrink-0">所在地</dt>
                  <dd className="text-sm text-gray-900 sm:ml-6">神奈川県川崎市</dd>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center">
                  <dt className="text-sm font-medium text-gray-600 sm:w-32 sm:flex-shrink-0">連絡先</dt>
                  <dd className="text-sm text-gray-900 sm:ml-6">info@example.com</dd>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center">
                  <dt className="text-sm font-medium text-gray-600 sm:w-32 sm:flex-shrink-0">サイトURL</dt>
                  <dd className="text-sm text-gray-900 sm:ml-6">https://example.com</dd>
                </div>
              </dl>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    <strong>ご注意：</strong>当サイトはアフィリエイトプログラムを利用して商品を紹介しています。
                    掲載内容・リンク先の商品は予告なく変更される場合があります。
                  </p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">プライバシーポリシー</h2>
            
            <p className="text-gray-700 mb-6">
              当サイト（Market Supporter AI）では、以下の方針に基づき個人情報を適切に取り扱います。
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">個人情報の利用目的</h3>
            <p className="text-gray-700 mb-6">
              当サイトでは、お問い合わせの際に名前やメールアドレス等の個人情報をご入力いただく場合があります。
              これらの情報はお問い合わせ対応のみに利用します。
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">アクセス解析ツールについて</h3>
            <p className="text-gray-700 mb-6">
              Google Analyticsを利用し、トラフィックデータ収集のためにCookieを使用します。
              このデータは匿名で収集され、個人を特定するものではありません。
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">アフィリエイトプログラムについて</h3>
            <p className="text-gray-700 mb-6">
              当サイトはAmazonアソシエイト、楽天アフィリエイト、その他ASPのアフィリエイトプログラムに参加しています。
              商品やサービスに関するお問い合わせはリンク先の販売店へ直接お願いいたします。
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">免責事項</h3>
            <p className="text-gray-700 mb-8">
              掲載内容の正確性には努めますが、誤情報や古い情報による損害については一切の責任を負いません。
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">お問い合わせ</h2>
            
            <p className="text-gray-700 mb-6">
              当サイトへのご質問やご意見は、以下のフォームまたはメールアドレスまでご連絡ください。
            </p>

            <div className="bg-blue-50 rounded-xl p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">連絡先情報</h3>
              <div className="space-y-2">
                <p className="text-gray-700">
                  <strong>メールアドレス：</strong>info@example.com
                </p>
                <p className="text-sm text-gray-600">
                  ※スパム防止のため、件名に「お問い合わせ」と明記してください
                </p>
              </div>
            </div>

            <div className="bg-green-50 rounded-xl p-6 mb-12">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Googleフォームを利用する場合</h3>
              <p className="text-gray-700 mb-4">
                お問い合わせフォームをご利用いただけます。
              </p>
              <a 
                href="https://docs.google.com/forms/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
              >
                お問い合わせフォームはこちら
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
              <p className="text-sm text-gray-600 mt-2">
                ※Googleフォームを作成し、このリンクを差し替えてください。
              </p>
            </div>

            {/* 新規追加部分 */}
            <div className="border-t border-gray-200 pt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">【プライバシーポリシー】</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                当サイトでは、第三者配信の広告サービス（もしもアフィリエイト、A8.net など）を利用しています。<br />
                これらの広告配信事業者は、ユーザーの興味に応じた商品やサービスの広告を表示するために Cookie を使用することがあります。<br />
                Cookie は匿名で収集され、個人を特定するものではありません。
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-6 mt-8">【免責事項】</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                当サイトに掲載する情報については正確性を保つよう努めておりますが、その内容やリンク先から生じる損害については一切責任を負いかねます。<br />
                ご利用は自己責任にてお願いいたします。
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-6 mt-8">【運営者情報】</h2>
              <div className="bg-gray-50 rounded-xl p-6">
                <dl className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center">
                    <dt className="text-sm font-medium text-gray-600 sm:w-24 sm:flex-shrink-0">運営者</dt>
                    <dd className="text-sm text-gray-900 sm:ml-6">TEMOMASA</dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center">
                    <dt className="text-sm font-medium text-gray-600 sm:w-24 sm:flex-shrink-0">メール</dt>
                    <dd className="text-sm text-gray-900 sm:ml-6">busintemasamo1@gmail.com</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
} 