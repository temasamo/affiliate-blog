import type { AppProps } from 'next/app';
import Script from 'next/script';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import '../styles/globals.css';

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-BJW9PXZKZB';

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    if (!GA_ID) return;
    
    const handleRoute = (url: string) => {
      // @ts-ignore
      window.gtag?.('event', 'page_view', {
        page_location: window.location.origin + url,
        page_path: url,
        page_title: document.title
      });
    };
    
    handleRoute(router.asPath); // 初回
    router.events.on('routeChangeComplete', handleRoute);
    return () => router.events.off('routeChangeComplete', handleRoute);
  }, [router.events, router.asPath]);

  return (
    <>
      {GA_ID && (
        <>
          <Script 
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} 
            strategy="afterInteractive" 
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}', { send_page_view: false });
            `}
          </Script>
        </>
      )}
      <Component {...pageProps} />
    </>
  );
}
