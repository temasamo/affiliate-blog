import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

interface Guide {
  slug: string;
  title: string;
  description: string;
  date: string;
  excerpt?: string;
}

interface GuidesPageProps {
  guides: Guide[];
}

export default function GuidesPage({ guides }: GuidesPageProps) {
  return (
    <>
      <Head>
        <title>ガイド一覧 | Market Supporter AI</title>
        <meta name="description" content="Market Supporter AI の各種ガイド記事を一覧で確認できます。枕診断AIシリーズなど、科学的根拠に基づいた診断コンテンツを提供します。" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* ヘッダー */}
          <div className="text-center mb-12">
            <div className="flex justify-between items-center mb-8">
              <Link href="/" className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                トップへ戻る
              </Link>
              <div></div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              ガイド一覧
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              科学的根拠に基づいた診断コンテンツで、あなたの生活をサポートします。
            </p>
          </div>

          {/* 枕診断AIシリーズ */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                枕診断AIシリーズ
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                科学的根拠に基づく枕選びの新時代
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {guides
                .sort((a, b) => {
                  if (!a.date || !b.date) return 0;
                  return new Date(a.date).getTime() - new Date(b.date).getTime();
                })
                .map((guide, index) => (
                  <Link
                    key={guide.slug}
                    href={`/diagnostic-ai/makura/${guide.slug}`}
                    className="block bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden border border-gray-100"
                  >
                    <div className="p-6">
                      <div className="flex items-center mb-3">
                        <div className="bg-blue-500 text-white text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center mr-3">
                          {index + 1}
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                          {guide.title}
                        </h3>
                      </div>
                      {guide.excerpt && (
                        <p className="text-gray-600 text-sm line-clamp-3 mb-3">
                          {guide.excerpt}
                        </p>
                      )}
                      {guide.date && (
                        <p className="text-xs text-gray-500">
                          {new Date(guide.date).toLocaleDateString('ja-JP')}
                        </p>
                      )}
                    </div>
                  </Link>
                ))}
            </div>
          </div>

          {/* その他のガイドコンテンツ */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              その他のガイドコンテンツ
            </h2>
            <p className="text-gray-600 mb-8">
              今後、睡眠診断、健康診断など、様々な診断コンテンツを追加予定です。
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<GuidesPageProps> = async () => {
  const guides: Guide[] = [];
  
  try {
    // 枕診断AIシリーズの記事を取得
    const diagnosticAiPath = path.join(process.cwd(), 'content', 'blog', 'diagnostic-ai', 'makura');
    
    if (fs.existsSync(diagnosticAiPath)) {
      const files = fs.readdirSync(diagnosticAiPath);
      const mdxFiles = files.filter(file => file.endsWith('.mdx'));
      
      mdxFiles.forEach(file => {
        try {
          const filePath = path.join(diagnosticAiPath, file);
          const fileContents = fs.readFileSync(filePath, 'utf8');
          const { data: frontMatter } = matter(fileContents);
          
          guides.push({
            slug: file.replace(/\.mdx$/, ''),
            title: frontMatter.title || '記事タイトル',
            description: frontMatter.description || '記事の説明',
            date: frontMatter.date || '2025-08-28',
            excerpt: frontMatter.excerpt || null,
          });
        } catch (e) {
          console.error(`Front matter parse error: ${file}`, e);
        }
      });
    }
  } catch (e) {
    console.error('Error loading guides:', e);
  }

  return {
    props: {
      guides,
    },
  };
}; 