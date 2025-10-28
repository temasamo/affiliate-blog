import 'dotenv/config';
import OpenAI from 'openai';
import { createClient } from '@supabase/supabase-js';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE_KEY as string
);

async function generateEmbedding(input: string) {
  const res = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input,
  });
  return res.data[0].embedding;
}

async function seedGiftAI() {
  const articles = [
    {
      title: '父の日の人気プレゼント傾向',
      content:
        '父の日には財布やネクタイなど実用的なアイテムが定番ですが、最近では趣味グッズや健康家電など個性重視のギフトが人気です。',
      event_type: 'fathers_day',
      relation_type: 'father',
      tags: ['実用的', '趣味', '人気'],
      source_url: 'https://www.marketsupporter-ai.com/events/fathers-day',
    },
    {
      title: '母の日のプレゼントアイデア',
      content:
        '母の日は花やスイーツなど“癒し”をテーマにしたギフトが人気。健康グッズや美容アイテムも注目を集めています。',
      event_type: 'mothers_day',
      relation_type: 'mother',
      tags: ['癒し', '健康', '花'],
    },
  ];

  const hobbies = [
    {
      hobby: '車',
      gift_ideas: '車のキーホルダー, ミニカー, プラモデル, ラジコン, カーケア用品',
      context: '車好きの方には、実用性とコレクション性を兼ねたギフトが喜ばれます。',
      tags: ['father', 'men', 'car'],
    },
    {
      hobby: '音楽',
      gift_ideas: 'ヘッドホン, レコードプレイヤー, 音楽ギフトカード',
      context: '音楽好きには、リラックスや感性を刺激するアイテムが最適です。',
      tags: ['lover', 'music'],
    },
  ];

  for (const article of articles) {
    const embedding = await generateEmbedding(`${article.title} ${article.content}`);
    await supabase.from('gift_ai.event_articles').insert({ ...article, embedding });
  }

  for (const hobby of hobbies) {
    const embedding = await generateEmbedding(`${hobby.hobby} ${hobby.gift_ideas} ${hobby.context}`);
    await supabase.from('gift_ai.hobby_knowledge').insert({ ...hobby, embedding });
  }

  console.log('✅ Event AI 初期データ登録完了');
}

seedGiftAI().catch((err) => {
  console.error('Seeding failed:', err);
  process.exit(1);
});


