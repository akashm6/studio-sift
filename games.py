import requests
import csv

def get_games(dev_name):
    game_url = f'https://api.rawg.io/api/games?developers={dev_name}&key=82803018efd943c897ffab0462fc136a'
    dev_games = []
    all_results = []

    while game_url is not None:
        response = requests.get(game_url)
        data = response.json()
        all_results.extend(data['results'])
        game_url = data['next']

    platform_names = []
    all_results = all_results[:100]
    for i in range(len(all_results)):
        try:
            platform_names = ', '.join([platform['platform']['slug'] for platform in all_results[i]['platforms']])
        except TypeError:
            continue
        if 'ios' in platform_names:
            continue
        try:
            genre = ', '.join([tag['name'] for tag in all_results[i]['tags'] if tag['name'] not in ['exclusive', 'true exclusive', 'Cult Classic', 'Funny']])
            if genre == []:
                genre = ['N/A']
        except TypeError:
            genre = ['N/A']
        rating = all_results[i]['metacritic']
        released = all_results[i]['released']
        try:
            stores = ', '.join([store['store']['name'] for store in all_results[i]['stores']])
        except TypeError:
            stores = ['N/A']        
        game = all_results[i]['name']
        dev_games.append({'name': game, 'platforms': platform_names, 'tags': genre, 'rating': rating, 'release': released, 'stores': stores})

    return dev_games

def get_general_stores(dev_name):
    stores_url = f'https://api.rawg.io/api/stores?developers={dev_name}&key=82803018efd943c897ffab0462fc136a'
    stores = []
    domains = []
    general_stores = []
    all_results = []
    while stores_url is not None:
        response = requests.get(stores_url)
        data = response.json()
        all_results.extend(data['results'])
        stores_url = data['next']
    for i in range(len(all_results)):
        store = all_results[i]['name']
        domain = 'https://' + all_results[i]['domain']
        general_stores.append({'store': store, 'domain': domain})
    return general_stores
        

