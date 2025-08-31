import { useEffect, useRef } from "react";
import Script from "next/script";

export default function AffiliateAdCardLark1() {
  const linkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const affLink =
      "https://af.moshimo.com/af/c/click?a_id=5122395&p_id=54&pc_id=54&pl_id=616&url=https%3A%2F%2Fitem.rakuten.co.jp%2Fpalmsamerica%2Fayygqlrkr8%2F&m=https%3A%2F%2Fm.rakuten.co.jp%2Fpalmsamerica%2Fi%2F10031370%2F";
    if (linkRef.current) {
      linkRef.current.href = affLink;
    }
  }, []);

  return (
    <div className="promo-card">
      <img
        src="https://thumbnail.image.rakuten.co.jp/@0_mall/palmsamerica/cabinet/img_20241120/4/ayygqlrkr8_0.jpg?_ex=300x300"
        alt="LARQ ラーク Bottle PureVis"
        className="promo-img"
      />
      <p className="promo-title">
        LARQ ラーク Bottle PureVis ボトル ピュアビス Monaco Blue 500ml
      </p>
      <a
        ref={linkRef}
        target="_blank"
        rel="nofollow noopener noreferrer"
        className="promo-btn"
      >
        詳しく見る
      </a>

      <Script id="moshimo-impression-lark1" strategy="afterInteractive">
        {`
          (function() {
            var img = document.createElement("img");
            img.src = "https://i.moshimo.com/af/i/impression?a_id=5122395&p_id=54&pc_id=54&pl_id=616";
            img.width = 1;
            img.height = 1;
            img.alt = "";
            img.style.border = "0";
            document.body.appendChild(img);
          })();
        `}
      </Script>

      <style jsx>{`
        .promo-card {
          all: unset;
          display: block !important;
          background: #fafafa !important;
          border-radius: 10px !important;
          padding: 15px !important;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1) !important;
          max-width: 400px !important;
          margin: 20px auto !important;
          text-align: center !important;
          font-family: sans-serif !important;
        }
        .promo-img {
          display: block !important;
          margin: 0 auto !important;
          border: none !important;
          max-width: 100% !important;
        }
        .promo-title {
          margin-top: 10px !important;
          font-weight: bold !important;
          font-size: 14px !important;
          color: #000 !important;
        }
        .promo-btn {
          display: inline-block !important;
          margin-top: 10px !important;
          padding: 8px 15px !important;
          background: gold !important;
          color: #000 !important;
          font-weight: bold !important;
          text-decoration: none !important;
          border-radius: 5px !important;
        }
        .promo-btn:hover {
          background: #d4af37 !important;
        }
      `}</style>
    </div>
  );
} 