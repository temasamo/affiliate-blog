from flask import Flask, request
import requests
import os

app = Flask(__name__)

# 環境変数からAPIキー取得
RAKUTEN_APP_ID = os.environ.get("RAKUTEN_APP_ID")
YAHOO_APP_ID = os.environ.get("YAHOO_APP_ID")

@app.route("/compare")
def compare():
    keyword = request.args.get("keyword", "エアウィーヴ")

    # 楽天API
    rakuten_url = "https://app.rakuten.co.jp/services/api/IchibaItem/Search/20170706"
    rakuten_params = {
        "applicationId": RAKUTEN_APP_ID,
        "keyword": keyword,
        "hits": 5,
        "sort": "+itemPrice"
    }
    rakuten_data = requests.get(rakuten_url, params=rakuten_params).json()

    # Yahoo API
    yahoo_url = "https://shopping.yahooapis.jp/ShoppingWebService/V3/itemSearch"
    yahoo_params = {
        "appid": YAHOO_APP_ID,
        "query": keyword,
        "results": 5,
        "sort": "+price"
    }
    yahoo_data = requests.get(yahoo_url, params=yahoo_params).json()

    # 結果整形
    results = []

    for item in rakuten_data.get("Items", []):
        i = item["Item"]
        results.append({
            "モール": "楽天市場",
            "商品名": i["itemName"],
            "価格": i["itemPrice"],
            "レビュー平均": i["reviewAverage"],
            "リンク": i["itemUrl"]
        })

    for item in yahoo_data.get("hits", []):
        results.append({
            "モール": "Yahoo!ショッピング",
            "商品名": item["name"],
            "価格": item["price"],
            "レビュー平均": item.get("review", {}).get("rate", "N/A"),
            "リンク": item["url"]
        })

    # HTML生成
    html = """
    <html>
    <head><meta charset="utf-8"></head>
    <body>
    <table border="1" style="border-collapse: collapse; width: 100%;">
    <tr><th>モール</th><th>商品名</th><th>価格</th><th>レビュー平均</th><th>リンク</th></tr>
    """
    for r in results:
        html += f"<tr><td>{r['モール']}</td><td>{r['商品名']}</td><td>¥{r['価格']}</td><td>{r['レビュー平均']}</td><td><a href='{r['リンク']}' target='_blank'>商品ページ</a></td></tr>"
    html += "</table></body></html>"

    return html

if __name__ == "__main__":
    app.run(debug=True)
