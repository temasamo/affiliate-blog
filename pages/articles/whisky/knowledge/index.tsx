import { GetStaticProps } from 'next';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Header from '../../../../components/Header';

interface Article {
  slug: string;
  title: string;
  date: string;
  description: string;
  category: string;
  tags: string[];
  published: boolean;
}

interface KnowledgeIndexProps {
  articles: Article[];
}

export default function KnowledgeIndex({ articles }: KnowledgeIndexProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title="ウイスキー知識一覧 - ウイスキー | Market Supporter AI"
        description="ウイスキーに関する知識記事の過去記事一覧です。"
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="bg-white rounded-2xl shadow-md p-8">
          <div className="mb-8">
            <Link href="/whisky" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              ウイスキーに戻る
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">ウイスキー知識一覧</h1>
            <p className="text-gray-600">ウイスキーに関する知識記事の過去記事をすべて表示しています。</p>
          </div>

          {articles.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🥃</div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">記事準備中</h2>
              <p className="text-gray-600">ウイスキー知識記事を準備中です。近日公開予定です。</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/articles/whisky/knowledge/${article.slug}`}
                  className="group block bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100"
                >
                  <div className="p-6">
                    <div className="text-3xl mb-3">🥃</div>
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                      {article.description}
                    </p>
                    <div className="text-xs text-gray-500">
                      {article.date}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* 戻るリンク */}
          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <Link 
              href="/whisky" 
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              ウイスキーに戻る
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const articlesDirectory = path.join(process.cwd(), 'articles/whisky/knowledge');
  const articles: Article[] = [];
  
  if (fs.existsSync(articlesDirectory)) {
    const files = fs.readdirSync(articlesDirectory).filter(f => f.endsWith('.mdx') || f.endsWith('.md'));
    files.forEach(file => {
      const filePath = path.join(articlesDirectory, file);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data: frontMatter } = matter(fileContents);
      
      // publishedがfalseの場合はスキップ
      if (frontMatter.published === false) {
        return;
      }
      
      // ファイル名ベースのslugを使用（ルーティングがファイル名ベースのため）
      const fileBasedSlug = file.replace(/\.(md|mdx)$/, '');
      
      articles.push({
        slug: fileBasedSlug,
        title: frontMatter.title || '記事タイトル',
        description: frontMatter.description || '記事の説明',
        date: frontMatter.date || '2025.01.01',
        category: frontMatter.category || 'ウイスキー知識',
        tags: frontMatter.tags || [],
        published: frontMatter.published !== false
      });
    });
  }

  // 日付でソート（新しい順）
  const sortedArticles = articles.sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return {
    props: {
      articles: sortedArticles,
    },
  };
};
