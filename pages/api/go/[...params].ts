// カテゴリ単位のアフィリエイトAPI
// 例: /api/go/skincare-aging-rakuten → 楽天のエイジングケアカテゴリページ

import { NextApiRequest, NextApiResponse } from 'next';

// アフィリエイトURL設定
const AFFILIATE_URLS: Record<string, Record<string, string>> = {
  // スキンケアギフト関連
  'skincare-aging': {
    rakuten: 'https://af.moshimo.com/af/c/click?a_id=XXXX&p_id=54&pc_id=54&pl_id=6163&url=https://search.rakuten.co.jp/search/mall/エイジングケア+スキンケア/',
    amazon: 'https://af.moshimo.com/af/c/click?a_id=XXXX&p_id=170&pc_id=185&pl_id=4062&url=https://www.amazon.co.jp/s?k=エイジングケア+スキンケア',
    yahoo: 'https://ck.jp.ap.valuecommerce.com/servlet/referral?sid=XXXX&pid=XXXX&vc_url=https://shopping.yahoo.co.jp/search?p=エイジングケア+スキンケア'
  },
  'skincare-organic': {
    rakuten: 'https://af.moshimo.com/af/c/click?a_id=XXXX&p_id=54&pc_id=54&pl_id=6163&url=https://search.rakuten.co.jp/search/mall/オーガニック+スキンケア/',
    amazon: 'https://af.moshimo.com/af/c/click?a_id=XXXX&p_id=170&pc_id=185&pl_id=4062&url=https://www.amazon.co.jp/s?k=オーガニック+スキンケア',
    yahoo: 'https://ck.jp.ap.valuecommerce.com/servlet/referral?sid=XXXX&pid=XXXX&vc_url=https://shopping.yahoo.co.jp/search?p=オーガニック+スキンケア'
  },
  'skincare-premium': {
    rakuten: 'https://af.moshimo.com/af/c/click?a_id=XXXX&p_id=54&pc_id=54&pl_id=6163&url=https://search.rakuten.co.jp/search/mall/高級+スキンケア+ギフト/',
    amazon: 'https://af.moshimo.com/af/c/click?a_id=XXXX&p_id=170&pc_id=185&pl_id=4062&url=https://www.amazon.co.jp/s?k=高級+スキンケア+ギフト',
    yahoo: 'https://ck.jp.ap.valuecommerce.com/servlet/referral?sid=XXXX&pid=XXXX&vc_url=https://shopping.yahoo.co.jp/search?p=高級+スキンケア+ギフト'
  },
  // 恋人向けギフト関連
  'gift-accessory': {
    rakuten: 'https://af.moshimo.com/af/c/click?a_id=5122395&p_id=54&pc_id=54&pl_id=616&url=' + encodeURIComponent('https://search.rakuten.co.jp/search/mall/ペアアクセサリー+ペアウォッチ/'),
    amazon: 'https://af.moshimo.com/af/c/click?a_id=5122395&p_id=170&pc_id=185&pl_id=4062&url=' + encodeURIComponent('https://www.amazon.co.jp/s?k=ペアアクセサリー+ペアウォッチ'),
    yahoo: 'https://ck.jp.ap.valuecommerce.com/servlet/referral?sid=3751180&pid=891975133&vc_url=' + encodeURIComponent('https://shopping.yahoo.co.jp/search?p=ペアアクセサリー+ペアウォッチ')
  },
  'gift-flower': {
    rakuten: 'https://af.moshimo.com/af/c/click?a_id=5122395&p_id=54&pc_id=54&pl_id=616&url=' + encodeURIComponent('https://search.rakuten.co.jp/search/mall/フラワーボックス+ギフト/'),
    amazon: 'https://af.moshimo.com/af/c/click?a_id=5122395&p_id=170&pc_id=185&pl_id=4062&url=' + encodeURIComponent('https://www.amazon.co.jp/s?k=フラワーボックス+ギフト'),
    yahoo: 'https://ck.jp.ap.valuecommerce.com/servlet/referral?sid=3751180&pid=891975133&vc_url=' + encodeURIComponent('https://shopping.yahoo.co.jp/search?p=フラワーボックス+ギフト')
  },
  'gift-care': {
    rakuten: 'https://af.moshimo.com/af/c/click?a_id=5122395&p_id=54&pc_id=54&pl_id=616&url=' + encodeURIComponent('https://search.rakuten.co.jp/search/mall/スキンケア+アロマ加湿器/'),
    amazon: 'https://af.moshimo.com/af/c/click?a_id=5122395&p_id=170&pc_id=185&pl_id=4062&url=' + encodeURIComponent('https://www.amazon.co.jp/s?k=スキンケア+アロマ加湿器'),
    yahoo: 'https://ck.jp.ap.valuecommerce.com/servlet/referral?sid=3751180&pid=891975133&vc_url=' + encodeURIComponent('https://shopping.yahoo.co.jp/search?p=スキンケア+アロマ加湿器')
  },
  'gift-experience': {
    rakuten: 'https://af.moshimo.com/af/c/click?a_id=5122395&p_id=54&pc_id=54&pl_id=616&url=' + encodeURIComponent('https://search.rakuten.co.jp/search/mall/体験ギフト+ディナー+宿泊/'),
    amazon: 'https://af.moshimo.com/af/c/click?a_id=5122395&p_id=170&pc_id=185&pl_id=4062&url=' + encodeURIComponent('https://www.amazon.co.jp/s?k=体験ギフト+ディナー+宿泊'),
    yahoo: 'https://ck.jp.ap.valuecommerce.com/servlet/referral?sid=3751180&pid=891975133&vc_url=' + encodeURIComponent('https://shopping.yahoo.co.jp/search?p=体験ギフト+ディナー+宿泊')
  },
  'gift-home': {
    rakuten: 'https://af.moshimo.com/af/c/click?a_id=5122395&p_id=54&pc_id=54&pl_id=616&url=' + encodeURIComponent('https://search.rakuten.co.jp/search/mall/コーヒー+お茶+ペアマグ/'),
    amazon: 'https://af.moshimo.com/af/c/click?a_id=5122395&p_id=170&pc_id=185&pl_id=4062&url=' + encodeURIComponent('https://www.amazon.co.jp/s?k=コーヒー+お茶+ペアマグ'),
    yahoo: 'https://ck.jp.ap.valuecommerce.com/servlet/referral?sid=3751180&pid=891975133&vc_url=' + encodeURIComponent('https://shopping.yahoo.co.jp/search?p=コーヒー+お茶+ペアマグ')
  },
  'gift-winter': {
    rakuten: 'https://af.moshimo.com/af/c/click?a_id=5122395&p_id=54&pc_id=54&pl_id=616&url=' + encodeURIComponent('https://search.rakuten.co.jp/search/mall/手袋+ストール+ルームウェア/'),
    amazon: 'https://af.moshimo.com/af/c/click?a_id=5122395&p_id=170&pc_id=185&pl_id=4062&url=' + encodeURIComponent('https://www.amazon.co.jp/s?k=手袋+ストール+ルームウェア'),
    yahoo: 'https://ck.jp.ap.valuecommerce.com/servlet/referral?sid=3751180&pid=891975133&vc_url=' + encodeURIComponent('https://shopping.yahoo.co.jp/search?p=手袋+ストール+ルームウェア')
  },
  'gift-practical': {
    rakuten: 'https://af.moshimo.com/af/c/click?a_id=5122395&p_id=54&pc_id=54&pl_id=616&url=' + encodeURIComponent('https://search.rakuten.co.jp/search/mall/スマートウォッチ+名刺入れ+財布/'),
    amazon: 'https://af.moshimo.com/af/c/click?a_id=5122395&p_id=170&pc_id=185&pl_id=4062&url=' + encodeURIComponent('https://www.amazon.co.jp/s?k=スマートウォッチ+名刺入れ+財布'),
    yahoo: 'https://ck.jp.ap.valuecommerce.com/servlet/referral?sid=3751180&pid=891975133&vc_url=' + encodeURIComponent('https://shopping.yahoo.co.jp/search?p=スマートウォッチ+名刺入れ+財布')
  },
  'gift-romantic': {
    rakuten: 'https://af.moshimo.com/af/c/click?a_id=5122395&p_id=54&pc_id=54&pl_id=616&url=' + encodeURIComponent('https://search.rakuten.co.jp/search/mall/フラワーボックス+ペアアクセサリー/'),
    amazon: 'https://af.moshimo.com/af/c/click?a_id=5122395&p_id=170&pc_id=185&pl_id=4062&url=' + encodeURIComponent('https://www.amazon.co.jp/s?k=フラワーボックス+ペアアクセサリー'),
    yahoo: 'https://ck.jp.ap.valuecommerce.com/servlet/referral?sid=3751180&pid=891975133&vc_url=' + encodeURIComponent('https://shopping.yahoo.co.jp/search?p=フラワーボックス+ペアアクセサリー')
  },
  'gift-hobby': {
    rakuten: 'https://af.moshimo.com/af/c/click?a_id=5122395&p_id=54&pc_id=54&pl_id=616&url=' + encodeURIComponent('https://search.rakuten.co.jp/search/mall/推し活グッズ+体験ギフト/'),
    amazon: 'https://af.moshimo.com/af/c/click?a_id=5122395&p_id=170&pc_id=185&pl_id=4062&url=' + encodeURIComponent('https://www.amazon.co.jp/s?k=推し活グッズ+体験ギフト'),
    yahoo: 'https://ck.jp.ap.valuecommerce.com/servlet/referral?sid=3751180&pid=891975133&vc_url=' + encodeURIComponent('https://shopping.yahoo.co.jp/search?p=推し活グッズ+体験ギフト')
  }
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { params } = req.query;
  
  if (!params || !Array.isArray(params) || params.length < 2) {
    return res.status(400).json({ error: 'Invalid parameters' });
  }

  const [category, mall] = params;
  
  // カテゴリとモールの組み合わせをチェック
  if (!AFFILIATE_URLS[category] || !AFFILIATE_URLS[category][mall]) {
    return res.status(404).json({ 
      error: 'Category or mall not found',
      available: Object.keys(AFFILIATE_URLS)
    });
  }

  const affiliateUrl = AFFILIATE_URLS[category][mall];
  
  // リダイレクト
  res.redirect(302, affiliateUrl);
}

// 静的パス生成用（将来のSSG対応）
export function getStaticPaths() {
  const paths: { params: { params: string[] } }[] = [];
  
  Object.keys(AFFILIATE_URLS).forEach(category => {
    Object.keys(AFFILIATE_URLS[category]).forEach(mall => {
      paths.push({
        params: {
          params: [category, mall]
        }
      });
    });
  });
  
  return {
    paths,
    fallback: false
  };
}
