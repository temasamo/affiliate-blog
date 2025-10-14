// pages/articles/japanesesake/brands/[slug].tsx
import React from 'react';
import Link from 'next/link';
import { GetStaticProps, GetStaticPaths } from 'next';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import Header from '../../../../components/Header';
import Footer from '../../../../components/Footer';
import AffButton from '../../../../components/AffButton';

interface ArticlePageProps {
  frontMatter: {
    title: string;
    description: string;
    date: string;
    category: string;
    tags: string[];
    lang: string;
    slug: string;
  };
  mdxSource: MDXRemoteSerializeResult;
}

const components = {
  AffButton,
};

export default function ArticlePage({ frontMatter, mdxSource }: ArticlePageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title={`${frontMatter.title} - Market Supporter AI`}
        description={frontMatter.description}
      />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* パンくずリスト */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li><Link href="/japanese-sake" className="hover:text-blue-600">日本酒</Link></li>
            <li>/</li>
            <li><Link href="/articles/japanesesake/brands" className="hover:text-blue-600">銘柄紹介</Link></li>
            <li>/</li>
            <li className="text-gray-900">{frontMatter.title}</li>
          </ol>
        </nav>

        <article className="bg-white rounded-2xl shadow-md p-8">
          {/* 記事ヘッダー */}
          <header className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {frontMatter.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
              <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full">
                {frontMatter.category}
              </span>
              <span>{frontMatter.date}</span>
            </div>
            {frontMatter.tags && frontMatter.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {frontMatter.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* 記事本文 */}
          <div className="prose prose-lg max-w-none">
            <MDXRemote {...mdxSource} components={components} />
          </div>

          {/* 戻るリンク */}
          <div className="mt-12 pt-8 border-t border-gray-200 text-center">
            <Link
              href="/articles/japanesesake/brands"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              銘柄紹介一覧に戻る
            </Link>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const articlesDirectory = path.join(process.cwd(), 'articles/japanesesake/brands');
  const paths: { params: { slug: string } }[] = [];
  
  if (fs.existsSync(articlesDirectory)) {
    const files = fs.readdirSync(articlesDirectory).filter(f => f.endsWith('.mdx') || f.endsWith('.md'));
    files.forEach(file => {
      const slug = file.replace(/\.(mdx?)$/, '');
      paths.push({ params: { slug } });
    });
  }

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<ArticlePageProps> = async ({ params }) => {
  const slug = params?.slug as string;
  const filePath = path.join(process.cwd(), 'articles/japanesesake/brands', `${slug}.mdx`);
  
  if (!fs.existsSync(filePath)) {
    return {
      notFound: true,
    };
  }

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data: frontMatter, content } = matter(fileContents);
  
  const mdxSource = await serialize(content);

  return {
    props: {
      frontMatter: frontMatter as ArticlePageProps['frontMatter'],
      mdxSource,
    },
  };
};
