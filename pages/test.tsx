export default function TestPage() {
  return (
    <div>
      <h1>テストページ</h1>
      <p>Next.jsが正常に動作しています。</p>
      <p>現在時刻: {new Date().toLocaleString()}</p>
    </div>
  );
} 