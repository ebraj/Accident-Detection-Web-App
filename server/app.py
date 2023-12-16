from flask import request, Response, Flask, jsonify
from flask_cors import CORS
from ultralytics import YOLO
from PIL import Image

app = Flask(__name__, static_folder='static')
CORS(app)

@app.route('/api/home',methods=['GET'])
def return_home():
    return jsonify({
        "message": "Welcome to home api page."
    })

@app.route('/api/apply-model', methods=['POST'])
def detect_object():
    try:
        image_file = request.files['image']
        boxes = detect_object_on_image(Image.open(image_file.stream))
        return Response(
            json.dumps(boxes),
            mimetype='application/json'
        )
    except Exception as e:
        return jsonify({
            "status": 'error',
            'message': str(e)
        })
def detect_object_on_image(image_file):
    model = YOLO('yolov8n.pt')
    results = model.predict(image_file)
    result = results[0]
    output = []
    for box in result.boxes:
        x1,y1,x2,y2 = [
            rounx(x) for x in box.xyxy[0].tolist()
        ]
        class_id = box.cls[0].item()
        prob = round(box.conf[0].item(),2)
        output.append([
            x1,y1,x2,y2,result.names[class_id],prob
        ])
    return output

if __name__ == '__main__':
    app.run(debug=True, port=8080)