from flask import Blueprint, jsonify, request
from datetime import datetime
from bson import ObjectId
from pymongo import MongoClient
import base64

# Blueprint and the mongo db collection setup...
accident_bp = Blueprint('accident', __name__, url_prefix='/api/v1/accident')
client = MongoClient("localhost", 27017)
mongo_db = client.flask_database
accidents_collection = mongo_db.accidents
users_collection = mongo_db.users

# CLOUDINARY
import cloudinary
import cloudinary.api
import cloudinary.uploader
import os
from dotenv import load_dotenv
load_dotenv()

# Create route
@accident_bp.route('/create', methods=['POST'])
def create_accident():
    if request.method == 'POST':
        accident_data = request.get_json()

        frame_base64 = accident_data.get('frame', '')
        frame_bytes = base64.b64decode(frame_base64)
        # with open('accident_frame.jpg', 'wb') as f:
        #     f.write(frame_bytes)

        try:
            cloudinary.config(cloud_name = os.getenv('CLOUD_NAME'), api_key=os.getenv('API_KEY'), api_secret=os.getenv('API_SECRET'))

            cloudinary_response = cloudinary.uploader.upload(frame_bytes, folder="accident_frames")
            image_url = cloudinary_response['url']
        except Exception as e:
            print(f'Error uploading image to Cloudinary: {str(e)}')
            return jsonify({
                "status": 'error',
                "message": f"Failed to upload image to Cloudinary: {str(e)}"
            }), 500
            
        # frame_bytes = base64.b64decode(frame_base64)
        accidents_collection.insert_one({
            "address" : accident_data['address'],
            "city" : accident_data['city'],
            "latitude" : accident_data['latitude'],
            "longitude" : accident_data['longitude'],
            "severityInPercentage" : accident_data['severityInPercentage'],
            "severity" : accident_data['severity'],
            "date": datetime.now(),
            "image_url": image_url
        })
        return jsonify({
            "status": "success",
            "message": "Accident data saved successfully.",
            'image_url': image_url
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
                "date": data['date'],
                "image_url": data['image_url']
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
                "date": accident['date'],
                "image_url": accident['image_url']
            }
        })
    else:
        return jsonify({
            "status": "error",
            "message": "Accident not found"
        }), 404
