import { useEffect, useRef } from "react";
import Script from "next/script";

export default function AffiliateAdCardAlt() {
  const linkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const affLink = "https://af.moshimo.com/af/c/click?a_id=5122395&p_id=54&pc_id=54&pl_id=616&url=https%3A%2F%2Fitem.rakuten.co.jp%2Fyoitas%2Ff11-001%2F&m=https%3A%2F%2Fm.rakuten.co.jp%2Fyoitas%2Fi%2F10000088%2F";
    if (linkRef.current) {
      linkRef.current.href = affLink;
    }
  }, []);

  return (
    <div className="promo-card">
      <img
        src="https://thumbnail.image.rakuten.co.jp/@0_mall/yoitas/cabinet/10674721/f11_lp_square_02.jpg?_ex=300x300"
        alt="Yoitas 折りたたみ扇風機"
        style={{ border: "none", maxWidth: "100%" }}
      />

      <p style={{ marginTop: "10px", fontWeight: "bold" }}>
        【扇風機1位獲得】Yoitas 折りたたみ 扇風機 Design+ F11
      </p>

      <a
        ref={linkRef}
        target="_blank"
        rel="nofollow noopener noreferrer"
        className="promo-btn"
      >
        詳しく見る
      </a>

      <Script id="moshimo-impression-alt" strategy="afterInteractive">
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
          background: #fafafa;
          border-radius: 10px;
          padding: 15px;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
          max-width: 400px;
          margin: 20px auto;
          text-align: center;
        }
        .promo-btn {
          display: inline-block;
          margin-top: 10px;
          padding: 8px 15px;
          background: gold;
          color: #000;
          font-weight: bold;
          text-decoration: none;
          border-radius: 5px;
        }
        .promo-btn:hover {
          background: #d4af37;
        }
      `}</style>
    </div>
  );
} 