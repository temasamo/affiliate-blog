import type { NextApiRequest, NextApiResponse } from "next";

// 必要に応じて ID と遷移先を追加
const LINKS: Record<string, string> = {
  // --- Amazon汎用（モシモ） ---
  amazon: "https://af.moshimo.com/af/c/click?a_id=5122703&p_id=170&pc_id=185&pl_id=4064",
  "amazon-makura": "https://af.moshimo.com/af/c/click?a_id=5122703&p_id=170&pc_id=185&pl_id=4064",
  
  // 旅行サイトのトップページ（アフィリエイト）
  'rakuten-travel': 'https://af.moshimo.com/af/c/click?a_id=5140401&p_id=55&pc_id=55&pl_id=636&url=' + encodeURIComponent('https://travel.rakuten.co.jp/'),
  jalan: 'https://px.a8.net/svt/ejp?a8mat=45BUIQ+EJC1IQ+14CS+68EPE&a8ejpredirect=' + encodeURIComponent('https://www.jalan.net/'),
  ikkyu: 'https://ck.jp.ap.valuecommerce.com/servlet/referral?sid=3751180&pid=891975133&vc_url=' + encodeURIComponent('https://www.ikkyu.com/'),
  ikyu: 'https://ck.jp.ap.valuecommerce.com/servlet/referral?sid=3751180&pid=891975133&vc_url=' + encodeURIComponent('https://www.ikkyu.com/'),
  'yahoo-travel': 'https://ck.jp.ap.valuecommerce.com/servlet/referral?sid=3751180&pid=892040663&vc_url=' + encodeURIComponent('https://travel.yahoo.co.jp/'),
  airtrip: 'https://px.a8.net/svt/ejp?a8mat=45BUIQ+DB9YR6+2YGS+64JTE&a8ejpredirect=' + encodeURIComponent('https://www.airtrip.jp/'),

  // 一休：宿ごとのディープリンク（広告OK宿）
  'ikkyu-asaba':
    'https://ck.jp.ap.valuecommerce.com/servlet/referral?sid=3751180&pid=891975133&vc_url=' +
    encodeURIComponent('https://www.ikkyu.com/00002155/?lc=1&ppc=2&rc=1&st=1&top=rooms'),
  'ikkyu-kasho':
    'https://ck.jp.ap.valuecommerce.com/servlet/referral?sid=3751180&pid=891975133&vc_url=' +
    encodeURIComponent('https://www.ikkyu.com/00001255/?lc=1&ppc=2&rc=1&st=1'),
  'ikkyu-gorakadan':
    'https://ck.jp.ap.valuecommerce.com/servlet/referral?sid=3751180&pid=891975133&vc_url=' +
    encodeURIComponent('https://www.ikkyu.com/00000362/?lc=1&ppc=2&rc=1&st=1'),
  'ikkyu-hiiragiya':
    'https://ck.jp.ap.valuecommerce.com/servlet/referral?sid=3751180&pid=891975133&vc_url=' +
    encodeURIComponent('https://www.ikkyu.com/00000291/?lc=1&ppc=2&rc=1&st=1'),
  'ikkyu-sakurai':
    'https://ck.jp.ap.valuecommerce.com/servlet/referral?sid=3751180&pid=891975133&vc_url=' +
    encodeURIComponent('https://www.ikkyu.com/00001013/?lc=1&ppc=2&rc=1&st=1'),
  // 下呂温泉用のリンク
  'gero-rakuten-travel': 'https://af.moshimo.com/af/c/click?a_id=5140401&p_id=55&pc_id=55&pl_id=636&url=' + encodeURIComponent('https://travel.rakuten.co.jp/HOTEL/search/keyword?f_keyword=下呂温泉'),
  'gero-jalan': 'https://px.a8.net/svt/ejp?a8mat=45BUIQ+EJC1IQ+14CS+68EPE&url=' + encodeURIComponent('https://www.jalan.net/uw/uwp2000/uww2001.do?keyword=下呂温泉'),
  'gero-ikkyu': 'https://ck.jp.ap.valuecommerce.com/servlet/referral?sid=3751180&pid=891975133&vc_url=' + encodeURIComponent('https://www.ikkyu.com/search/?keyword=下呂温泉'),
  'gero-yahoo-travel': 'https://ck.jp.ap.valuecommerce.com/servlet/referral?sid=3751180&pid=892040663&vc_url=' + encodeURIComponent('https://travel.yahoo.co.jp/search/?keyword=下呂温泉'),

  // 山形庄内温泉用のリンク
  'yamagata-rakuten': 'https://af.moshimo.com/af/c/click?a_id=5140401&p_id=55&pc_id=55&pl_id=636&url=' + encodeURIComponent('https://travel.rakuten.co.jp/yado/yamagata/shonai.html'),
  'yamagata-jalan': 'https://px.a8.net/svt/ejp?a8mat=45BUIQ+EJC1IQ+14CS+68EPE&a8ejpredirect=' + encodeURIComponent('https://www.jalan.net/060000/LRG_061400/?stayYear=2025&stayMonth=10&stayDay=4&stayCount=1&roomCount=1&adultNum=2&ypFlg=1&kenCd=060000&screenId=UWW1380&roomCrack=200000&lrgCd=061400&distCd=01&rootCd=04'),
  'yamagata-ikkyu': 'https://ck.jp.ap.valuecommerce.com/servlet/referral?sid=3751180&pid=891975133&vc_url=' + encodeURIComponent('https://www.ikkyu.com/00000912/?discsort=1&lc=1&mtc=003&ppc=2&rc=1&st=1'),
  'yamagata-yahoo': 'https://ck.jp.ap.valuecommerce.com/servlet/referral?sid=3751180&pid=892040663&vc_url=' + encodeURIComponent('https://travel.yahoo.co.jp/tohoku/12025003/?adc=1&adcid=14528835824&adgid=129729906627&discsort=1&gclid=CjwKCAjwxfjGBhAUEiwAKWPwDk7kw_Msrs0QLX6ejykyd7c9kvzN1db4tcDtt0uPEuUP6P0A8DnTyBoC8RoQAvD_BwE&ikCo=y_google&lc=1&per_page=20&pn=1&ppc=2&rc=1&si=6'),

};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const idParam = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id;
  const to = idParam ? LINKS[idParam] : undefined;

  if (!to) {
    res.status(404).json({ error: "Unknown link id", id: idParam });
    return;
  }

  // 追加：インデックス防止＆キャッシュ抑制
  res.setHeader("X-Robots-Tag", "noindex, nofollow");
  res.setHeader("Cache-Control", "no-store");

  res.writeHead(307, { Location: to });
  res.end();
}

// （任意）bodyParserを切る・外部解決を明示
export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};