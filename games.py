import requests
import csv

def get_games(dev_name):
    game_url = f'https://api.rawg.io/api/games?developers={dev_name}&key=c3449055e060458a89ab5bf3102530d5'
    dev_games = []
    all_results = []

    # Fetch games data from the Rawg API
    while game_url is not None:
        response = requests.get(game_url)
        data = response.json()
        all_results.extend(data['results'])
        game_url = data['next']

    platform_names = []
    all_results = all_results[:40]
    for i in range(len(all_results)):
        try:
            platform_names = [platform['platform']['slug'] for platform in all_results[i]['platforms']]
        except TypeError:
            continue
        if 'ios' in platform_names:
            continue
        game = all_results[i]['name']
        dev_games.append(game)

    return dev_games
