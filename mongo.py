from pymongo import MongoClient
import requests
from games import get_games;
import csv

def get_games_for_studio(studio_name):
    client = MongoClient('mongodb://localhost:27017/')
    db = client['ss_studios']
    collection = db['developers']

    studio = collection.find_one({'name': studio_name})

    if studio:
        return studio['games']
    else:
        return []

def fetch_and_insert_games(studio_name):
    with open('./developers.csv', newline='') as file:
        reader = csv.DictReader(file, quotechar='"')
        developers_data = [row for row in reader]

    matching_dev = next((dev for dev in developers_data if dev['name'] == studio_name), None)

    if matching_dev:
        dev_slug = matching_dev['slug']
        dev_logo = matching_dev['logo']
        dev_description = matching_dev['description']
        dev_games = get_games(dev_slug)

        to_return = insert_games_for_studio(studio_name, dev_games, dev_logo, dev_description)
        return to_return

    return []

def insert_games_for_studio(studio_name, games, logo, description):
    client = MongoClient('mongodb://localhost:27017/')
    db = client['ss_studios']
    collection = db['developers']
    
    # Insert document
    inserted_id = collection.insert_one({
        'name': studio_name,
        'games': games,
        'logo': logo,
        'description': description
    }).inserted_id

    # Retrieve the inserted document
    inserted_doc = collection.find_one({'_id': inserted_id}, {'_id': 0})

    return inserted_doc
