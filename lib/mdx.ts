import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolink from 'rehype-autolink-headings';
import rehypeExternalLinks from 'rehype-external-links';
import { h } from 'hastscript';

const TRAVEL_DIR = path.join(process.cwd(), 'content', 'travel');

function getAllMdxFiles(dir: string, basePath = ''): string[] {
  // .mdx と .md ファイルの両方に対応
  const files: string[] = [];
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const relativePath = path.join(basePath, item);
    
    if (fs.statSync(fullPath).isDirectory()) {
      files.push(...getAllMdxFiles(fullPath, relativePath));
    } else if (item.endsWith('.mdx') || item.endsWith('.md')) {
      files.push(relativePath.replace(/\.mdx$/, '').replace(/\.md$/, ''));
    }
  }
  
  return files;
}

export function getTravelSlugs() {
  return getAllMdxFiles(TRAVEL_DIR);
}

export function getTravelPostBySlug(slug: string) {
  // .mdx と .md ファイルの両方を試す
  let filePath = path.join(TRAVEL_DIR, slug + '.mdx');
  if (!fs.existsSync(filePath)) {
    filePath = path.join(TRAVEL_DIR, slug + '.md');
  }
  
  // ファイルが存在しない場合はエラーを投げる
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }
  
  const file = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(file);
  if (data.date instanceof Date) {
    data.date = data.date.toISOString().split('T')[0];
  }
  return { frontMatter: data, content, slug };
}


export async function serializeMDX(source: string) {
  return serialize(source, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        rehypeSlug,
        // ← ここ変更：見出しの末尾にだけ小さなリンクアイコンを追加
        [rehypeAutolink, {
          behavior: 'append',
          properties: { className: ['heading-anchor'], ariaLabel: '見出しリンク' },
          content: h('span', { class: 'anchor-icon', 'aria-hidden': 'true' }, '#')
        }],
        [rehypeExternalLinks, { rel: ['nofollow', 'noopener'], target: '_blank' }],
      ],
      format: 'mdx',
    },
  });
}
