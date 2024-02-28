from flask import Flask, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app, origins="*")


@app.route('/news', methods = ['GET'])
def news():
    response = requests.get('https://newsapi.org/v2/everything?language=en&q={game, studios}&apiKey=5a0114fc9a254f8783c3aa4ab861120e')
    data = response.json()
    authors,titles,descs,urls,urlToImages,publish_dates = [],[],[],[],[],[]
    all_news = {}

    for i in range(25,37):
        authors.append(data['articles'][i]['author'])
        titles.append(data['articles'][i]['title'])
        descs.append(data['articles'][i]['description'])
        urls.append(data['articles'][i]['url'])
        urlToImages.append(data['articles'][i]['urlToImage'])
        publish_dates.append(data['articles'][i]['publishedAt'])

    all_news = {"titles": titles, "descriptions":descs, "urls": urls, "urlToImages":urlToImages, "published": publish_dates, "authors": authors}
    return all_news


@app.route('/search', methods = ['GET'])
def search():
    url = 'https://rawg.io/api/developers/?token&key=c3449055e060458a89ab5bf3102530d5'
    developers = ['ubisoft', 'electronic-arts', 'capcom', 'sony-interactive-entertainment', 'nintendo', 'rockstar-games', 
            'arkane-studios', 'activision', 'epic-games', 'valve-software', 'bethesda-softworks', 'square-enix', 'bioware', 'raven-software', 'thq-nordic',
            'deep-silver', 'volition', 'firaxis', 'lucasfilm', 'codemasters', 'team17-digital', 'digital-extremes']
    logos = {'ubisoft':'https://cdn.icon-icons.com/icons2/2389/PNG/512/ubisoft_logo_icon_144779.png',
            'electronic-arts': 'https://upload.wikimedia.org/wikipedia/commons/e/e5/Electronic_Arts_Logo_2020.png', 
            'capcom': 'https://e7.pngegg.com/pngimages/143/843/png-clipart-viewtiful-joe-street-fighter-ii-the-world-warrior-capcom-electronic-entertainment-expo-capcom-logo-blue-game.png',
            'sony-interactive-entertainment': 'https://vgboxart.com/resources/logo/5525_sony-computer-entertainment-prev.png', 
            'nintendo':'https://seeklogo.com/images/N/nintendo-switch-logo-38D4F5C7E7-seeklogo.com.png',
            'rockstar-games':'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Rockstar_Games_Logo.svg/835px-Rockstar_Games_Logo.svg.png',
            'arkane-studios': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Arkane_Studios_Logo_2020.png/800px-Arkane_Studios_Logo_2020.png',
            'activision': 'https://brandslogos.com/wp-content/uploads/thumbs/activision-logo-vector.svg',
            'epic-games': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Epic_Games_logo.svg/882px-Epic_Games_logo.svg.png', 
            'valve-software': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Valve_logo.svg/2560px-Valve_logo.svg.png',
            'bethesda-softworks': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Bethesda_Game_Studios_logo.svg/1280px-Bethesda_Game_Studios_logo.svg.png', 
            'square-enix': 'https://www.seekpng.com/png/full/143-1431226_logo-square-enix-e3-2018-square-enix-collective.png',
            'bioware':'https://blog.bioware.com/wp-content/uploads/2019/02/cropped-BioWareB.png',
            'raven-software': 'https://blog.bioware.com/wp-content/uploads/2019/02/cropped-BioWareB.png',
            'thq-nordic': 'https://blog.bioware.com/wp-content/uploads/2019/02/cropped-BioWareB.png',
            'deep-silver': 'https://blog.bioware.com/wp-content/uploads/2019/02/cropped-BioWareB.png',
            'volition': 'https://blog.bioware.com/wp-content/uploads/2019/02/cropped-BioWareB.png',
            'firaxis': 'https://blog.bioware.com/wp-content/uploads/2019/02/cropped-BioWareB.png',
            'lucasfilm': 'https://blog.bioware.com/wp-content/uploads/2019/02/cropped-BioWareB.png',
            'codemasters': 'https://blog.bioware.com/wp-content/uploads/2019/02/cropped-BioWareB.png',
            'team17-digital': 'https://blog.bioware.com/wp-content/uploads/2019/02/cropped-BioWareB.png',
            'digital-extremes': 'https://blog.bioware.com/wp-content/uploads/2019/02/cropped-BioWareB.png'
            }
    logo_links = []
    studios = []
    results = []
    names = []
    '''
    while url != 'https://api.rawg.io/api/developers?key=c3449055e060458a89ab5bf3102530d5&page=10&token=':
        response = requests.get(url)
        data = response.json()
        results.extend(data['results'])
        url = data['next']
    for i in range(len(results)):
        name = results[i]['slug']
        if name in devs:
            developers = {}
            developers[name] = {}
            names.append(developers)
            logo_links.append(logos[name])
    '''
    for dev in developers:
        games = get_games(dev)
        logo = logos[dev]
        studios.append({
            'name': dev,
            'logo': logo,
            'games': games
        })
    return jsonify(studios)



    for dev_name in names:
        for developer in dev_name:
            dev_name[developer]['games'] = []

            game_url = 'https://api.rawg.io/api/games?developers=' + developer + '&key=c3449055e060458a89ab5bf3102530d5'
            dev_games = []
            all_results = []
        
            while game_url != None:
                response = requests.get(game_url)
                data = response.json()
                all_results.extend(data['results'])
                game_url = data['next']
            platform_names = []
            
            all_results = all_results[:40]
            for i in range(len(all_results)):
                platform_names = [platform['platform']['slug'] for platform in all_results[i]['platforms']]
                if 'ios' in platform_names:
                    continue
                game = all_results[i]['name']
                dev_games.append(game)

            dev_name[developer]['games'].extend(dev_games)


    final = {'names': names, 'logos': logo_links}
    return final

def get_games(dev_name):
    game_url = 'https://api.rawg.io/api/games?developers=' + dev_name + '&key=c3449055e060458a89ab5bf3102530d5'
    dev_games = []
    all_results = []
    while game_url != None:
        response = requests.get(game_url)
        data = response.json()
        all_results.extend(data['results'])
        game_url = data['next']
    platform_names = []
    all_results = all_results[:40]
    for i in range(len(all_results)):
        platform_names = [platform['platform']['slug'] for platform in all_results[i]['platforms']]
        if 'ios' in platform_names:
            continue
        game = all_results[i]['name']
        dev_games.append(game)
    return dev_games



if __name__ == '__main__':
    app.run(debug = True)


