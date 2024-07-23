from flask import Flask, jsonify
from flask_cors import CORS
from mongo import fetch_and_insert_games, insert_games_for_studio
from games import get_games
import requests
import csv


app = Flask(__name__)
CORS(app, origins="*")
logo_links = []
global studios
studios = []
results = []
names = []


@app.route('/news', methods = ['GET'])
def news():
    response = requests.get('https://newsapi.org/v2/everything?language=en&q={game, studios}&apiKey=XXX')
    data = response.json()
    authors,titles,descs,urls,urlToImages,publish_dates = [],[],[],[],[],[]
    all_news = {}

    for i in range(27,39):
        authors.append(data['articles'][i]['author'])
        titles.append(data['articles'][i]['title'])
        descs.append(data['articles'][i]['description'])
        urls.append(data['articles'][i]['url'])
        urlToImages.append(data['articles'][i]['urlToImage'])
        publish_dates.append(data['articles'][i]['publishedAt'])

    all_news = {"titles": titles, "descriptions":descs, "urls": urls, "urlToImages":urlToImages, "published": publish_dates, "authors": authors}
    return all_news


@app.route('/search', methods=['GET'])
def search():
    with open('./developers.csv', newline='') as file:
        reader = csv.DictReader(file)
        developers_data = [row for row in reader]
    studios = []

    for dev_data in developers_data:
        logo = dev_data['logo']
        studios.append({
            'name': dev_data['name'],
            'logo': logo,
        })

    return studios

@app.route('/search/<studio_name>', methods=['GET'])
def selection(studio_name):
    global studios
    games = fetch_and_insert_games(studio_name)
    return jsonify(games)

if __name__ == '__main__':
    app.run(debug=True)
