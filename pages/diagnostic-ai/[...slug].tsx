import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { GetStaticPaths, GetStaticProps } from "next";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";

const ROOT = path.join(process.cwd(), "articles", "diagnostic-ai");

type Props = { source: MDXRemoteSerializeResult; frontMatter: any };

export default function Article({ source, frontMatter }: Props) {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <article>
        <h1 className="text-3xl font-bold">{frontMatter?.title}</h1>
        {frontMatter?.description && (
          <p className="mt-2 text-gray-500">{frontMatter.description}</p>
        )}
        <div className="prose mt-8 max-w-none">
          <MDXRemote {...source} />
        </div>
      </article>
    </main>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths: { params: { slug: string[] } }[] = [];
  const walk = (dir: string, parts: string[] = []) => {
    for (const f of fs.readdirSync(dir)) {
      const p = path.join(dir, f);
      const rel = [...parts, f];
      if (fs.statSync(p).isDirectory()) walk(p, rel);
      else if (/\.(md|mdx)$/i.test(f)) {
        const slug = rel.join("/").replace(/\.(md|mdx)$/i, "").split("/");
        paths.push({ params: { slug } });
      }
    }
  };
  if (fs.existsSync(ROOT)) walk(ROOT);
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = (params?.slug as string[]) || [];
  const file = path.join(ROOT, ...slug) + ".mdx";
  const raw = fs.readFileSync(file, "utf-8");
  const { content, data } = matter(raw);
  const mdx = await serialize(content, { scope: data });
  return { props: { source: mdx, frontMatter: data } };
}; 