import Head from 'next/head'
import Link from 'next/link'
export default function Home() {
  return (
    <>
      <Head><title>Market Supporter AI</title></Head>
      <main style={{ padding: 24 }}>
        <h1>Market Supporter AI</h1>
        <p>サイトは稼働中です。</p>
        <p><Link href="/pillow-diagnosis">▶ 枕診断へ</Link></p>
      </main>
    </>
  )
}

