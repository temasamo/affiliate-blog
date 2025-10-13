import React from 'react';
import { GetStaticProps } from 'next';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import matter from 'gray-matter';
import fs from 'fs';
import path from 'path';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';

interface CoupleChristmasPageProps {
  mdxSource: MDXRemoteSerializeResult;
  frontMatter: any;
}

const components = {
  // 必要に応じてカスタムコンポーネントを追加
};

export default function CoupleChristmasPage({ mdxSource, frontMatter }: CoupleChristmasPageProps) {
  return (
    <>
      <Header 
        title={frontMatter.title}
        description={frontMatter.description}
      />
      
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <article className="bg-white rounded-2xl shadow-md p-6 sm:p-8">
            <MDXRemote {...mdxSource} components={components} />
          </article>
        </div>
      </main>

      <Footer />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const filePath = path.join(process.cwd(), 'articles/gift/couple/2025-10-13-couple-christmas-gift.mdx');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data: frontMatter, content } = matter(fileContents);

    // MDXの処理（簡易版）
    const { serialize } = await import('next-mdx-remote/serialize');
    const mdxSource = await serialize(content);

    return {
      props: {
        mdxSource,
        frontMatter,
      },
    };
  } catch (error) {
    console.error('Error reading couple christmas article:', error);
    return {
      notFound: true,
    };
  }
};
