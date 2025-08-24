import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { getPostsByPredicate } from '@/lib/content';
import { isGlobalHotPicks } from '@/lib/categories';

type Card = {
  title: string;
  date: string;
  description: string | null;
  thumbnail: string | null;
  url: string;
};

type Props = { posts: Card[] };

export default function GlobalHotPicksPage({ posts }: Props) {
  return (
    <>
      <Head>
        <title>Global Hot Picks | Market Supporter AI</title>
        <meta name="description" content="海外で話題のアイテムを厳選して紹介するGlobal Hot Picksの最新＆過去記事アーカイブ" />
        <link rel="canonical" href="https://www.marketsupporter-ai.com/global-hot-picks" />
      </Head>

      <nav className="text-sm mb-4">
        <Link href="/">Home</Link> <span className="mx-1">›</span>
        <span className="text-gray-500">Global Hot Picks</span>
      </nav>

      <h1 className="text-3xl font-bold mb-6">Global Hot Picks</h1>

      {posts.length === 0 ? (
        <p className="text-gray-500">まだ記事がありません。</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((p) => (
            <li key={p.url} className="rounded-2xl shadow-md overflow-hidden bg-white">
              <Link href={p.url}>
                <img src={p.thumbnail ?? '/images/no-image.webp'} alt="" className="w-full h-48 object-cover" />
                <div className="p-4">
                  <time className="block text-xs text-gray-500">{p.date}</time>
                  <h2 className="mt-1 font-semibold line-clamp-2">{p.title}</h2>
                  {p.description && <p className="mt-2 text-sm text-gray-600 line-clamp-3">{p.description}</p>}
                  <span className="inline-flex items-center text-blue-600 text-sm mt-3">続きを読む →</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const items = await getPostsByPredicate(isGlobalHotPicks);
  const posts: Card[] = items.map(p => ({
    title: p.title,
    date: p.date,
    description: p.description,
    thumbnail: p.thumbnail,
    url: p.url.replace(/\/index$/,''),
  }));
  return { props: { posts } };
}; 