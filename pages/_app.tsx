import type { AppProps } from 'next/app'
import '../styles/globals.css'   // Tailwind CSS グローバルスタイルを読み込み

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
