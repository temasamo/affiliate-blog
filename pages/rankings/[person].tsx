import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";
import AffButton from "@/components/AffButton";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { GetStaticPaths, GetStaticProps } from "next";

interface RankingItem {
  rank: number;
  item_name: string;
  image_url?: string;
  description: string;
  price_range: string;
  score: number;
  mall: string;
  brand: string;
}

interface RankingPageProps {
  person: string;
  items: RankingItem[];
  personDisplayName: string;
}

const personTypeMap: Record<string, string> = {
  mother: "mother_total",
  father: "father_total", 
  partner: "partner_total",
  sibling: "sibling_total",
  child: "child_total"
};

const personDisplayNames: Record<string, string> = {
  mother: "母親向け",
  father: "父親向け",
  partner: "恋人向け", 
  sibling: "兄弟姉妹向け",
  child: "子供向け"
};

export default function RankingPage({ person, items, personDisplayName }: RankingPageProps) {
  return (
    <>
      <Header 
        title={`${personDisplayName}誕生日プレゼント総合ランキングTOP10 - Market Supporter AI`}
        description={`${personDisplayName}に人気のプレゼントを、楽天とYahoo!のデータをもとにAIスコアで総合ランキング。`}
      />
      
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-10">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h1 className="text-3xl font-bold mb-6 text-center">
              {personDisplayName}誕生日プレゼント総合ランキングTOP10
            </h1>

            <p className="text-gray-600 mb-10 text-center">
              {personDisplayName}に人気のプレゼントを、楽天とYahoo!のデータをもとにAIスコアで総合ランキング。
            </p>

            {items.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-500 text-lg">
                  現在、{personDisplayName}のランキング情報は準備中です。<br />
                  近日中に更新されます。
                </p>
              </div>
            ) : (
              <div className="space-y-8">
                {items.map((item) => (
                  <div
                    key={item.rank}
                    className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-start gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                          {item.rank}
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <h2 className="text-xl font-semibold mb-3 text-gray-900">
                          {item.item_name}
                        </h2>

                        {item.image_url && !item.image_url.includes('example.com') && (
                          <div className="mb-4">
                            <Image
                              src={item.image_url}
                              alt={item.item_name}
                              width={300}
                              height={200}
                              className="rounded-lg object-cover"
                            />
                          </div>
                        )}
                        {item.image_url && item.image_url.includes('example.com') && (
                          <div className="mb-4 bg-gray-100 rounded-lg p-8 text-center">
                            <div className="text-gray-500 text-sm">
                              📷 商品画像は準備中です
                            </div>
                          </div>
                        )}

                        <p className="text-gray-700 mb-4 leading-relaxed">
                          {item.description}
                        </p>

                        <div className="flex items-center gap-4 mb-4">
                          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                            💴 {item.price_range}
                          </span>
                          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                            🏷️ スコア：{item.score}
                          </span>
                        </div>

                        <div className="flex gap-3">
                          <AffButton mall={item.mall} brand={item.brand}>
                            {item.mall === "rakuten"
                              ? "楽天で探す"
                              : item.mall === "yahoo"
                              ? "Yahoo!で探す"
                              : "Amazonで探す"}
                          </AffButton>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = Object.keys(personTypeMap).map((person) => ({
    params: { person }
  }));

  return {
    paths,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps<RankingPageProps> = async ({ params }) => {
  const person = params?.person as string;
  
  if (!person || !personTypeMap[person]) {
    return {
      notFound: true
    };
  }

  const personType = personTypeMap[person];
  const personDisplayName = personDisplayNames[person];

  try {
    const { data: items, error } = await supabase
      .from("ranking_items")
      .select("*")
      .eq("person_type", personType)
      .order("rank", { ascending: true })
      .limit(10);

    if (error) {
      console.error("Supabase fetch error:", error);
      return {
        props: {
          person,
          items: [],
          personDisplayName
        }
      };
    }

    return {
      props: {
        person,
        items: items || [],
        personDisplayName
      },
      revalidate: 3600 // 1時間ごとに再生成
    };
  } catch (error) {
    console.error("Error fetching ranking data:", error);
    return {
      props: {
        person,
        items: [],
        personDisplayName
      }
    };
  }
};
