import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title="プライバシーポリシー - Market Supporter AI"
        description="Market Supporter AIのプライバシーポリシーをご確認ください。"
      />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="bg-white rounded-2xl shadow-md p-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">プライバシーポリシー</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 mb-8">
              当サイト（Market Supporter AI）では、以下の方針に基づき個人情報を適切に取り扱います。
              本プライバシーポリシーは、当サイトの利用者（以下「ユーザー」）の個人情報の取り扱いについて定めるものです。
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">1. 個人情報の利用目的</h2>
            <p className="text-gray-700 mb-6">
              当サイトでは、お問い合わせの際に名前やメールアドレス等の個人情報をご入力いただく場合があります。
              これらの情報は以下の目的でのみ利用します。
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-8 space-y-2">
              <li>お問い合わせへの回答</li>
              <li>サービス改善のための分析</li>
              <li>法令に基づく対応</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">2. アクセス解析ツールについて</h2>
            <p className="text-gray-700 mb-6">
              当サイトでは、Google Analyticsを利用し、トラフィックデータ収集のためにCookieを使用します。
              このデータは匿名で収集され、個人を特定するものではありません。
            </p>
            <div className="bg-blue-50 rounded-xl p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Google Analyticsについて</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>利用目的：サイトの利用状況分析、サービス改善</li>
                <li>収集データ：ページビュー、滞在時間、参照元等</li>
                <li>データの取り扱い：匿名化された統計情報として利用</li>
                <li>オプトアウト：ブラウザの設定でCookieを無効化可能</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">3. アフィリエイトプログラムについて</h2>
            <p className="text-gray-700 mb-6">
              当サイトはAmazonアソシエイト、楽天アフィリエイト、その他ASPのアフィリエイトプログラムに参加しています。
              これらのプログラムでは、商品リンクをクリックした際にCookieが設定される場合があります。
            </p>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    <strong>ご注意：</strong>商品やサービスに関するお問い合わせはリンク先の販売店へ直接お願いいたします。
                    当サイトでは商品の販売は行っておりません。
                  </p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">4. 個人情報の管理</h2>
            <p className="text-gray-700 mb-6">
              当サイトでは、ユーザーの個人情報を正確かつ最新の状態に保ち、個人情報への不正アクセス・紛失・漏洩・改ざん・破壊を防止するため、セキュリティ対策を実施しています。
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">5. 個人情報の開示・訂正・削除</h2>
            <p className="text-gray-700 mb-6">
              ユーザーご本人からの個人情報の開示・訂正・削除のご要望については、法令に基づき適切に対応いたします。
              お問い合わせは以下の連絡先までお願いいたします。
            </p>

            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">お問い合わせ先</h3>
              <p className="text-gray-700">
                <strong>メールアドレス：</strong>info@example.com
              </p>
              <p className="text-sm text-gray-600 mt-2">
                ※件名に「個人情報について」と明記してください
              </p>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">6. 免責事項</h2>
            <p className="text-gray-700 mb-6">
              掲載内容の正確性には努めますが、誤情報や古い情報による損害については一切の責任を負いません。
              また、当サイトからリンクしている外部サイトのプライバシーポリシーについては、当サイトでは責任を負いかねます。
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">7. プライバシーポリシーの変更</h2>
            <p className="text-gray-700 mb-8">
              当サイトは、必要に応じてこのプライバシーポリシーを変更することがあります。
              重要な変更がある場合は、サイト上でお知らせいたします。
            </p>

            <div className="bg-green-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">最終更新日</h3>
              <p className="text-gray-700">2025年1月1日</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
} 