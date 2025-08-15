import { MDXRemote } from 'next-mdx-remote';
import AffiliateLink from '@/components/AffiliateLink';
import { getTravelSlugs, getTravelPostBySlug, serializeMDX } from '@/lib/mdx';

export async function getStaticPaths() {
  const paths = getTravelSlugs().map((s) => ({ params: { slug: s.replace(/\.mdx$/, '') } }));
  return { paths, fallback: false };
}
export async function getStaticProps({ params }: any) {
  const { content, frontMatter } = getTravelPostBySlug(params.slug);
  const mdxSource = await serializeMDX(content);
  return { props: { mdxSource, frontMatter } };
}
const components = { AffiliateLink };

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

        {/* 記事コンテンツ */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-white/20 p-8 sm:p-12 shadow-xl shadow-blue-500/10">
          <div className="prose prose-lg max-w-none">
            <MDXRemote {...mdxSource} components={components} />
          </div>
        </div>
      </article>
    </main>
  );
} 