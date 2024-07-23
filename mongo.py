from pymongo import MongoClient
import requests
from games import get_games, get_general_stores
import csv
from bson import json_util, ObjectId
import json


def parse_json(data):
    return json.loads(json_util.dumps(data))

def check_for_studio(studio_name):
    client = MongoClient('mongodb://localhost:27017/')
    db = client['ss_studios']
    collection = db['developers']

    studio = collection.find_one({'name': studio_name})
    return parse_json(studio)

def fetch_and_insert_games(studio_name):
    existing = check_for_studio(studio_name)
    if existing:
        return existing
    else:
        with open('./developers.csv', newline='') as file:
            reader = csv.DictReader(file, quotechar='"')
            developers_data = [row for row in reader]

        matching_dev = next((dev for dev in developers_data if dev['name'] == studio_name), None)

        if matching_dev:
            dev_slug = matching_dev['slug']
            dev_logo = matching_dev['logo']
            dev_description = matching_dev['description']
            dev_games = get_games(dev_slug)
            general_stores = get_general_stores(dev_slug)
            to_return = insert_games_for_studio(studio_name, dev_games, dev_logo, dev_description, general_stores)
            return to_return

    return []

def insert_games_for_studio(studio_name, games,logo, description, general_stores):
    client = MongoClient('mongodb://localhost:27017/')
    db = client['ss_studios']
    collection = db['developers']
    
    inserted_doc = {
        'name': studio_name,
        'games': games,
        'logo': logo,
        'description': description,
        'stores': general_stores
    }

    # check for pre-existing studio
    existing_studio = check_for_studio(studio_name)

    if not existing_studio:
        # insert doc
        inserted_id = collection.insert_one(inserted_doc).inserted_id

        inserted_doc = collection.find_one({'_id': inserted_id}, {'_id': 0})

        # json_util for serialization
        inserted_doc = parse_json(inserted_doc)

    return inserted_doc
