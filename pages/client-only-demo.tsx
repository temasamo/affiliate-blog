import dynamic from 'next/dynamic';

// クライアント専用ウィジェットを dynamic import で読み込み
const ClientOnlyWidget = dynamic(() => import('@/components/ClientOnlyWidget'), {
  ssr: false,
  loading: () => (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md max-w-md mx-auto">
      <div className="animate-pulse">
        <div className="h-6 bg-gray-300 rounded mb-4"></div>
        <div className="space-y-3">
          <div className="h-4 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded"></div>
          <div className="h-8 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  )
});

export default function ClientOnlyDemoPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">
          Client-Only Widget Demo
        </h1>
        
        <div className="text-center mb-8">
          <p className="text-gray-600 mb-4">
            このページでは、ブラウザ固有の機能を使用するウィジェットを
            <code className="bg-gray-200 px-2 py-1 rounded">dynamic import</code> で
            <code className="bg-gray-200 px-2 py-1 rounded">ssr: false</code> オプションを使用して読み込んでいます。
          </p>
          <p className="text-gray-600">
            サーバーサイドではローディング状態が表示され、クライアントサイドでのみ実際のウィジェットがレンダリングされます。
          </p>
        </div>

        <ClientOnlyWidget />

        <div className="mt-8 p-6 bg-blue-50 rounded-lg">
          <h2 className="text-xl font-bold mb-4">実装のポイント</h2>
          <ul className="space-y-2 text-sm">
            <li>• <code>dynamic(() =&gt; import(&apos;@/components/ClientOnlyWidget&apos;), &#123; ssr: false &#125;)</code></li>
            <li>• <code>ssr: false</code> によりサーバーサイドレンダリングを無効化</li>
            <li>• <code>loading</code> プロパティでローディング状態をカスタマイズ</li>
            <li>• ブラウザ固有の機能（navigator, window, localStorage）を安全に使用</li>
            <li>• hydration mismatch を完全に回避</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 