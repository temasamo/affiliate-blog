import { serialize } from "next-mdx-remote/serialize";
import AffButton from "../components/AffButton";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

/** Global Hot Picks 専用：MDXに変換 */
export async function toHotPicksMdx(source: string) {
  return serialize(source, {
    components: { AffButton },
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
    components: { AffButton },
    parseFrontmatter: true,
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
    },
  });
}
