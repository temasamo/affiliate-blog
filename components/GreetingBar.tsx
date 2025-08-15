export default function GreetingBar() {
  const h = new Date().getHours();
  const hello = h < 11 ? "おはようございます！" : h < 18 ? "こんにちは！" : "こんばんは！";
  return (
    <div className="mb-6 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-5">
      <div className="text-lg font-semibold">{hello} 枕診断AIです。</div>
      <p className="opacity-90 mt-1">
        私は"枕診断AI"。最適なご提案のために、これからいくつかの質問にお答えください。
      </p>
    </div>
  );
} 