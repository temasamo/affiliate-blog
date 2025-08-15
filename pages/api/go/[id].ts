import type { NextApiRequest, NextApiResponse } from 'next';

const map: Record<string, string> = {
  // 提供いただいた正規URL
  jalan: 'https://px.a8.net/svt/ejp?a8mat=45BUIQ+EJC1IQ+14CS+68EPE',
  'rakuten-travel': 'https://af.moshimo.com/af/c/click?a_id=5140401&p_id=55&pc_id=55&pl_id=636',
  ikkyu: 'https://ck.jp.ap.valuecommerce.com/servlet/referral?sid=3751180&pid=891975133',

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
  const id = String(req.query.id || '');
  const to = map[id];
  if (!to) return res.status(404).end('Not found');
  res.setHeader('Cache-Control', 'no-store');
  res.redirect(307, to);
} 