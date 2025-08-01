import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

interface ArticleProps {
  content: string;
  frontMatter: {
    title?: string;
    date?: string;
    [key: string]: any;
  };
}

export default function Article({ content, frontMatter }: ArticleProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <article className="prose prose-lg max-w-none">
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </article>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const articlesDirectory = path.join(process.cwd(), 'articles');
  const filenames = fs.readdirSync(articlesDirectory);

  const paths = filenames
    .filter(filename => filename.endsWith('.md'))
    .map(filename => ({
      params: {
        slug: filename.replace(/\.md$/, ''),
      },
    }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<ArticleProps> = async ({ params }) => {
  const slug = params?.slug as string;
  const fullPath = path.join(process.cwd(), 'articles', `${slug}.md`);
  
  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data: frontMatter, content } = matter(fileContents);

    const processedContent = await remark()
      .use(html)
      .process(content);
    const contentHtml = processedContent.toString();

    return {
      props: {
        content: contentHtml,
        frontMatter,
      },
    };
  } catch (error) {
    console.error(`Error reading article ${slug}:`, error);
    return {
      notFound: true,
    };
  }
}; 