import { MDXRemote } from 'next-mdx-remote';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import AffiliateLink from '@/components/AffiliateLink';
import AffiliateDisclosure from '@/components/common/AffiliateDisclosure';
import OnsenBookingLinks from '@/components/OnsenBookingLinks';
import TravelStyleMatcher from '@/components/TravelStyleMatcher';
import { getAllTravelSlugs } from '@/lib/travel-slugs';
import { getTravelPostBySlug, serializeMDX } from '@/lib/mdx';

export async function getStaticPaths() {
  const slugs = getAllTravelSlugs();
  return {
    paths: slugs.map((s: string) => ({ params: { slug: s.split("/") } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }: any) {
  const slugArray = params.slug as string[];
  const slug = slugArray.join("/");
  try {
    const { content, frontMatter } = getTravelPostBySlug(slug);
    
    // 非公開記事の場合は404を返す
    if (frontMatter?.published === false) {
      return { notFound: true };
    }
    
    const mdxSource = await serializeMDX(content);
    return { props: { mdxSource, frontMatter } };
  } catch (e) {
    console.error("[getTravelPostBySlug failed]", slug, e);
    return { notFound: true };
  }
}

const components = { 
  AffiliateLink, 
  TravelStyleMatcher,
  OnsenBookingLinks
};

export default function TravelPost({ mdxSource, frontMatter }: any) {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <article className="mx-auto max-w-4xl p-6 sm:p-10">
        {/* ヘッダー部分 */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 text-sm font-medium mb-6">
            <span className="mr-2">✈️</span>
            旅行ガイド
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            {frontMatter.title}
          </h1>
          {frontMatter.date && (
            <div className="text-gray-600 text-sm">
              {frontMatter.date}
            </div>
          )}
        </div>

        {/* アフィリエイト開示 */}
        <AffiliateDisclosure variant="top" />

        {/* 記事コンテンツ */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-white/20 p-8 sm:p-12 shadow-xl shadow-blue-500/10">
          <div className="prose prose-lg max-w-none">
            <MDXRemote {...mdxSource} components={components} />
          </div>
        </div>

        {/* アフィリエイト開示（下部） */}
        <AffiliateDisclosure variant="bottom" />

        {/* トップへ戻るボタン */}
        <div className="text-center mt-12">
          <Link 
            href="/"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-full hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            トップページへ戻る
          </Link>
        </div>
      </article>
    </main>
  );
}
