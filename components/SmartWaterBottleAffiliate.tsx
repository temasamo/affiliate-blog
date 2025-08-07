import { useEffect, useRef } from "react";

interface SmartWaterBottleProduct {
  name: string;
  image: string;
  amazonUrl?: string;
  rakutenUrl?: string;
  yahooUrl?: string;
  officialUrl: string;
  description: string;
}

interface SmartWaterBottleAffiliateProps {
  product: SmartWaterBottleProduct;
}

export default function SmartWaterBottleAffiliate({ product }: SmartWaterBottleAffiliateProps) {
  const rakutenRef = useRef<HTMLAnchorElement>(null);
  const yahooRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    // 楽天アフィリエイトリンクの設定
    if (rakutenRef.current && product.rakutenUrl) {
      rakutenRef.current.href = `//af.moshimo.com/af/c/click?a_id=5122395&p_id=54&pc_id=54&pl_id=621&url=${encodeURIComponent(product.rakutenUrl)}`;
    }

    // Yahoo!アフィリエイトリンクの設定
    if (yahooRef.current && product.yahooUrl) {
      yahooRef.current.href = `//ck.jp.ap.valuecommerce.com/servlet/referral?sid=3751180&pid=891946975&url=${encodeURIComponent(product.yahooUrl)}`;
    }
  }, [product]);

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8 mt-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">🛒 商品詳細情報</h3>
      <div className="bg-gray-50 rounded-lg p-6 text-center">
        <img
          src={product.image}
          alt={product.name}
          className="mx-auto mb-4 rounded-lg"
          style={{ maxWidth: '300px' }}
        />
        <h4 className="text-lg font-bold mb-2">
          {product.name}
        </h4>
        <p className="text-sm text-gray-600 mb-4">
          {product.description}
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
          {product.amazonUrl && (
            <a
              href={product.amazonUrl}
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg transition-colors text-sm"
            >
              Amazon
            </a>
          )}
          
          {product.rakutenUrl && (
            <a
              ref={rakutenRef}
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="inline-block bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors text-sm"
            >
              楽天市場
            </a>
          )}
          
          {product.yahooUrl && (
            <a
              ref={yahooRef}
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="inline-block bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-lg transition-colors text-sm"
            >
              Yahoo!
            </a>
          )}
          
          <a
            href={product.officialUrl}
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="inline-block bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition-colors text-sm"
          >
            公式サイト
          </a>
        </div>

        {/* 楽天アフィリエイトのインプレッションタグ */}
        {product.rakutenUrl && (
          <img
            src="//i.moshimo.com/af/i/impression?a_id=5122395&p_id=54&pc_id=54&pl_id=621"
            width="1"
            height="1"
            style={{ border: 'none' }}
            alt=""
          />
        )}

        {/* Yahoo!アフィリエイトのインプレッションタグ */}
        {product.yahooUrl && (
          <img
            src="//ad.jp.ap.valuecommerce.com/servlet/gifbanner?sid=3751180&pid=891946975"
            height="1"
            width="1"
            style={{ border: '0' }}
            alt=""
          />
        )}
      </div>
    </div>
  );
} 