// components/ArticleContent.tsx
export default function ArticleContent({ children }: { children: React.ReactNode }) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10">
        <article className="prose prose-lg max-w-none">
          {children}
        </article>
  
        <style jsx global>{`
          /* 記事タイトル */
          h1 {
            @apply text-3xl font-bold mb-6 text-gray-800;
          }
  
          /* セクションタイトル */
          h2 {
            @apply text-2xl font-semibold mt-8 mb-4 border-b border-gray-200 pb-2;
          }
  
          /* 順位タイトル（例: 1位 ○○） */
          h3 {
            @apply text-xl font-bold mt-6 mb-3 text-indigo-700;
          }
  
          /* 各ランキング項目をカード化 */
          h3 + ul {
            @apply bg-white shadow-md rounded-lg p-4 border border-gray-100;
          }
  
          /* リスト */
          ul {
            @apply list-disc pl-6 space-y-1 text-gray-700;
          }
  
          /* 強調テキスト */
          strong {
            @apply text-indigo-600;
          }
  
          /* 段落 */
          p {
            @apply text-gray-800 leading-relaxed;
          }
        `}</style>
      </div>
    );
  }
  