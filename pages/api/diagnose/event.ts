import type { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';
import { createClient } from '@supabase/supabase-js';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { message, event_type, relation_type, hobby } = req.body || {};

    const embeddingRes = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: message,
    });
    const queryEmbedding = embeddingRes.data[0].embedding;

    const { data: eventResults } = await supabase.rpc('gift_ai.match_event_articles', {
      query_embedding: queryEmbedding,
      match_count: 3,
      filter_event: event_type,
      filter_relation: relation_type,
    });

    let hobbyResults: any[] = [];
    if (hobby) {
      const { data } = await supabase.rpc('gift_ai.match_hobby_knowledge', {
        query_embedding: queryEmbedding,
        match_count: 3,
      });
      hobbyResults = data || [];
    }

    const context = `
  【イベント関連記事】
  ${eventResults?.map((r: any) => `・${r.title}\n${r.content}`).join('\n') || ''}

  【趣味関連アイデア】
  ${hobbyResults?.map((r: any) => `・${r.hobby}: ${r.gift_ideas}`).join('\n') || ''}
  `;

    const chat = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'あなたはギフト選びの専門アドバイザーAIです。' },
        { role: 'user', content: message },
        { role: 'assistant', content: context },
      ],
    });

    return res.status(200).json({ reply: chat.choices[0].message.content });
  } catch (e: any) {
    console.error(e);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}


