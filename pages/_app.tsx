import type { AppProps } from "next/app";
import Script from "next/script";
import { useEffect } from "react";
import { useRouter } from "next/router";
import "../styles/globals.css";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || ""; // Vercelにも同名で設定

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    if (!GA_ID) return;
    const sendPV = (url: string) => {
      // @ts-ignore
      window.gtag?.("event","page_view",{
        page_title: document.title,
        page_location: window.location.origin + url,
        page_path: url,
      });
    };
    sendPV(router.asPath);                    // 初回
    router.events.on("routeChangeComplete", sendPV);
    return () => router.events.off("routeChangeComplete", sendPV);
  }, [router.events, router.asPath]);

  return (
    <>
      {GA_ID && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="ga-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('consent','default',{ ad_storage:'denied', analytics_storage:'granted' });
              gtag('config','${GA_ID}', { send_page_view: false });
            `}
          </Script>
        </>
      )}
      <Component {...pageProps} />
    </>
  );
}
