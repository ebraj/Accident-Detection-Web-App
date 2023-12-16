from flask import request, Response, Flask, jsonify
from flask_cors import CORS

app = Flask(__name__, static_folder='static')
CORS(app)

@app.route('/api', methods=['GET'])
def api():
    return jsonify({'message': 'Hello World'})

if __name__ == '__main__':
    app.run(debug=True, port=8080)