import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    SUPABASE_SERVICE_ROLE: process.env.SUPABASE_SERVICE_ROLE ? '**** (hidden)' : 'not set',
    NEXT_PUBLIC_CTA_URL: process.env.NEXT_PUBLIC_CTA_URL,
    NEXT_PUBLIC_RAKUTEN_URL: process.env.NEXT_PUBLIC_RAKUTEN_URL,
    NEXT_PUBLIC_AMAZON_URL: process.env.NEXT_PUBLIC_AMAZON_URL,
    NEXT_PUBLIC_YAHOO_URL: process.env.NEXT_PUBLIC_YAHOO_URL
  });
}

  