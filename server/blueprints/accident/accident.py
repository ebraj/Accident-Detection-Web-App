from flask import Blueprint, jsonify, request
from datetime import datetime
from bson import ObjectId
from pymongo import MongoClient

# Blueprint and the mongo db collection setup...
accident_bp = Blueprint('accident', __name__, url_prefix='/api/v1/accident')
client = MongoClient("localhost", 27017)
mongo_db = client.flask_database
accidents_collection = mongo_db.accidents
users_collection = mongo_db.users

# Create route
@accident_bp.route('/create', methods=['POST'])
def create_accident():
    if request.method == 'POST':
        accident_data = request.get_json()
        accidents_collection.insert_one({
            "address" : accident_data['address'],
            "city" : accident_data['city'],
            "latitude" : accident_data['latitude'],
            "longitude" : accident_data['longitude'],
            "severityInPercentage" : accident_data['severityInPercentage'],
            "severity" : accident_data['severity'],
            "date": datetime.now()       
        })
        return jsonify({
            "status": "success",
            "message": "Accident data saved successfully."
        }), 201
    else:
        return jsonify({
            "status": 'Something went wrong.'
        }), 404

# List Route
@accident_bp.route('/all', methods=['GET'])
def get_all_accidents():
    allDatas = accidents_collection.find()
    # if allDatas.count() == 0:
    #     return jsonify({
    #         "status": "success",
    #         "message": "No accident data found."
    #     }), 200
    return jsonify({
        "status": "success",
        "datas": [
            {
                "id": str(data['_id']),
                "address": data['address'],
                "city": data['city'],
                "latitude": data['latitude'],
                "longitude": data['longitude'],
                "severityInPercentage": data['severityInPercentage'],
                "severity": data['severity'],
                "date": data['date']
            } for data in allDatas
        ]
    })


# Individual Accident Route
@accident_bp.route('/<accidentId>', methods=['GET'])
def get_single_accident(accidentId):
    accident_id = ObjectId(accidentId)
    accident = accidents_collection.find_one({"_id": accident_id})
    if accident:
        return jsonify({
            "status": "success",
            "data": {
                "id": str(accident['_id']),  # Convert ObjectId to string for JSON serialization
                "address": accident['address'],
                "city": accident['city'],
                "latitude": accident['latitude'],
                "longitude": accident['longitude'],
                "severityInPercentage": accident['severityInPercentage'],
                "severity": accident['severity'],
                "date": accident['date']
            }
        })
    else:
        return jsonify({
            "status": "error",
            "message": "Accident not found"
        }), 404
