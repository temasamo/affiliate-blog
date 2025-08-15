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
    <article className="prose mx-auto p-6">
      <h1>{frontMatter.title}</h1>
      <MDXRemote {...mdxSource} components={components} />
    </article>
  );
} 