import json
from flask import Blueprint, Response, jsonify,request, current_app
from modules.detect_object_on_video import detect_object_on_video
from PIL import Image
import os
from ultralytics import YOLO
from werkzeug.utils import secure_filename
import cv2

# PUBLIC BLUEPRINT...
public_bp = Blueprint('public',__name__, url_prefix='/api/v1/public')

# DETECT OBJECT ON IMAGE
def detect_object_on_image(image_file):
    # model = YOLO('./models/yolov8n.pt')
    model = YOLO('./models/i1-yolov8s.pt')
    results = model.predict(image_file)
    result = results[0]
    output = []
    for box in result.boxes:
        x1,y1,x2,y2 = [
            round(x) for x in box.xyxy[0].tolist()
        ]
        class_id = box.cls[0].item()
        prob = round(box.conf[0].item(),2)
        output.append([
            x1,y1,x2,y2,result.names[class_id],prob
        ])
    return output

# GENERATE FRAMES
def generate_frames(path_x = ''):
    yolo_output = detect_object_on_video(path_x)
    for detection_ in yolo_output:
        ref,buffer=cv2.imencode('.jpg',detection_)

        frame=buffer.tobytes()
        yield (b'--frame\r\n'
                    b'Content-Type: image/jpeg\r\n\r\n' + frame +b'\r\n')
        
# ROUTES FOR HOME...
@public_bp.route('/',methods=['GET'])
def return_home():
    return jsonify({
        "message": "Welcome to home api page."
    })

# ROUTES FOR APPLY MODEL...
@public_bp.route('/apply-model', methods=['POST'])
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

# ROUTES FOR UPLOAD VIDEO...
@public_bp.route('/upload-video', methods=['POST'])
def api_video():
    print('🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥')
    print(request.method)
    video_file = request.files['image']
    video_file.save(os.path.join(current_app.config['UPLOAD_FOLDER'],secure_filename(video_file.filename)))
    # video_path = os.path.join(app.config['UPLOAD_FOLDER'],secure_filename(video_file.filename))
    video_path = video_file.filename
    if request.method == 'POST':
        # session['video_path'] = os.path.join(os.path.abspath(os.path.dirname(__file__)), app.config['UPLOAD_FOLDER'],secure_filename(video_file.filename))
        # session['video_path'] = 'static/videos/bikes.mp4'
        return Response(
            json.dumps({
                "status": "success",
                "path": video_path
            }),
        )
        # return Response(generate_frames(path_x='static/videos/Accident-1.mp4'), mimetype='multipart/x-mixed-replace; boundary=frame')
    
# ROUTES FOR SHOW VIDEO...
@public_bp.route('/show-video/static/videos/<path>', methods=['GET'])
def show_video(path):
    print('🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥')
    final_path = 'static/videos/' + path
    return Response(generate_frames(path_x=final_path), mimetype='multipart/x-mixed-replace; boundary=frame')  
    
# ROUTES FOR WEBCAM...
@public_bp.route('/webcam', methods=['GET'])
def api_webcam():
    return Response(generate_frames(path_x=0), mimetype='multipart/x-mixed-replace; boundary=frame')