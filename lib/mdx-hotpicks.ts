import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeRaw from "rehype-raw";

/** Global Hot Picks 専用：MDXに変換 */
export async function toHotPicksMdx(source: string) {
  return serialize(source, {
    parseFrontmatter: false,
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
    },
  });
}

/** 日本酒記事専用：MDXに変換（フロントマターを除外） */
export async function toSakeMdx(source: string) {
  return serialize(source, {
    parseFrontmatter: true,
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        [
          rehypeRaw,
          {
            passThrough: ['mdxJsxFlowElement', 'mdxJsxTextElement'], // JSX要素をパススルー
          },
        ],
        rehypeSlug,
        rehypeAutolinkHeadings,
      ],
    },
  });
}

/** 日本茶記事専用：MDXに変換（フロントマターを除外） */
export async function toJapaneseTeaMdx(source: string) {
  return serialize(source, {
    parseFrontmatter: false,
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
    },
  });
}

/** AIアプリ記事専用：MDXに変換（フロントマターを除外） */
export async function toAiAppsMdx(source: string) {
  return serialize(source, {
    parseFrontmatter: true,
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
    },
  });
}

/** ウイスキー記事専用：MDXに変換（フロントマターを除外） */
export async function toWhiskyMdx(source: string) {
  return serialize(source, {
    parseFrontmatter: false,
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        [
          rehypeRaw,
          {
            passThrough: ['mdxJsxFlowElement', 'mdxJsxTextElement'], // JSX要素をパススルー
          },
        ],
        rehypeSlug,
        rehypeAutolinkHeadings,
      ],
    },
  });
}
