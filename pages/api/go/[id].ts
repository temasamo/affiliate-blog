import type { NextApiRequest, NextApiResponse } from "next";

// 必要に応じて ID と遷移先を追加
const LINKS: Record<string, string> = {
  "amazon-makura": "https://af.moshimo.com/af/c/click?a_id=5122703&p_id=170&pc_id=185&pl_id=4064",
  
  // 既存の ID を残す
  jalan: 'https://px.a8.net/svt/ejp?a8mat=45BUIQ+EJC1IQ+14CS+68EPE',
  'rakuten-travel': 'https://af.moshimo.com/af/c/click?a_id=5140401&p_id=55&pc_id=55&pl_id=636',
  ikkyu: 'https://ck.jp.ap.valuecommerce.com/servlet/referral?sid=3751180&pid=891975133',
  airtrip: 'https://px.a8.net/svt/ejp?a8mat=45BUIQ+DB9YR6+2YGS+64JTE',

  // 一休：宿ごとのディープリンク（広告OK宿）
  'ikkyu-asaba':
    'https://ck.jp.ap.valuecommerce.com/servlet/referral?sid=3751180&pid=891975133&vc_url=' +
    encodeURIComponent('https://www.ikyu.com/00002155/?lc=1&ppc=2&rc=1&st=1&top=rooms'),
  'ikkyu-kasho':
    'https://ck.jp.ap.valuecommerce.com/servlet/referral?sid=3751180&pid=891975133&vc_url=' +
    encodeURIComponent('https://www.ikyu.com/00001255/?lc=1&ppc=2&rc=1&st=1'),
  'ikkyu-gorakadan':
    'https://ck.jp.ap.valuecommerce.com/servlet/referral?sid=3751180&pid=891975133&vc_url=' +
    encodeURIComponent('https://www.ikyu.com/00000362/?lc=1&ppc=2&rc=1&st=1'),
  'ikkyu-hiiragiya':
    'https://ck.jp.ap.valuecommerce.com/servlet/referral?sid=3751180&pid=891975133&vc_url=' +
    encodeURIComponent('https://www.ikyu.com/00000291/?lc=1&ppc=2&rc=1&st=1'),
  'ikkyu-sakurai':
    'https://ck.jp.ap.valuecommerce.com/servlet/referral?sid=3751180&pid=891975133&vc_url=' +
    encodeURIComponent('https://www.ikyu.com/00001013/?lc=1&ppc=2&rc=1&st=1'),
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const idParam = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id;
  const to = idParam ? LINKS[idParam] : undefined;

  if (!to) {
    res.status(404).json({ error: "Unknown link id", id: idParam });
    return;
  }

  res.setHeader("Location", to);
  res.status(307).end();
}

// （任意）bodyParserを切る・外部解決を明示
export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
} as const; 