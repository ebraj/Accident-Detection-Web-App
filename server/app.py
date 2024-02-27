from flask import request, Response, Flask, jsonify, session, send_from_directory
from flask_cors import CORS, cross_origin
from blueprints.auth.auth import auth_bp
from blueprints.accident.accident import accident_bp
from blueprints.public.public import public_bp

# AUTH AND MONGODB
from bson import ObjectId
from pymongo import MongoClient
from flask_jwt_extended import JWTManager, create_access_token, get_jwt_identity, jwt_required
import datetime

client = MongoClient("localhost", 27017)
mongo_db = client.flask_database

# CLOUDINARY
import cloudinary
import cloudinary.api
import os
from dotenv import load_dotenv
load_dotenv()

app = Flask(__name__, static_folder='static')
app.config['UPLOAD_FOLDER'] = 'static/videos'

# JWT... 
jwt = JWTManager(app)
app.config['JWT_SECRET_KEY']='ebrajdon'
app.config['JWT_ACCESS_TOKEN_EXPIRES']=datetime.timedelta(days=1)

# ALL BLUEPRINTS...
app.register_blueprint(auth_bp)
app.register_blueprint(accident_bp)
app.register_blueprint(public_bp)

accidents_collection = mongo_db.accidents
users_collection = mongo_db.users
CORS(app, origins=["http://localhost:3000"], supports_credentials=True)

# ROUTE TO GET THE GEO
# @app.route('/api/v1/get-geo',methods=['GET'])
# def api_getgeo():
#     location = Nominatim(user_agent="server")
#     getLoc = location.reverse("28.237987,83.995588")
#     return jsonify({
#         "status": "success",
#         "location": {
#             "address": getLoc.address,
#             "latitude": getLoc.latitude,
#             "longitude": getLoc.longitude,
#             "city": getLoc.raw.get("address", {}).get("city"),
#         }
#     })

if __name__ == '__main__':
    app.run(debug=True, port=8080)