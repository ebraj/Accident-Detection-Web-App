# CNN-based Vehicle Collision Detection and Emergency Response System

A system that will continuously monitor for the accident through the CCTV installed and notify the concerned authorities for the instant rescue.

## Tech Stack Used

- Frontend
  - Next JS v.14
- Backend
  - Flask
  - Python
- ML Model
  - YOLOv8

## Setup Guide

1. Firstly clone this repo locally(if you want you can fork it and clone it too) :
   ```
   git clone https://github.com/ebraj/Accident-Detection-Web-App.git
   ```
2. Once cloned successfully, open this project in your favourite IDE(VSCode in my case)

### Backend Setup

1. Once the above steps are done, open the terminal of your IDE and head over to the `server` directory using `cd server`
2. Then we will create the `virutalenv`. To create the `virtualenv` we will use the below command :

   ```
   # For windows
   python -m venv venv

   <!-- OR -->

   # For macos
   python3 -m venv venv
   ```

3. Once the `virtualenv` is created, we will activate it using the below command :
   ```
   source venv/bin/activate
   ```
4. And finally we will install the packages which are required for our project using the below command :

   ```
   # For windows
   pip install -r requirements.txt

   <!-- OR -->

   # For macos
   pip3 install -r requirements.txt
   ```

5. As everything is ready now, we can run the backend as

   ```
   # For windows
   python app.py

   <!-- OR -->

   # For macos
   python3 app.py

   ```

### Frontend Setup

The frontend setup is quite easy, unlike backend setup as it does not require any virtual env setup. Let's proceed to frontend setup.

1. Open the new vscode terminal, and head over into the client directory as `cd client` simply run the package installation command as
   ```
   npm install
   ```
2. Once the packages are installed properly, run the frontend application
   ```
   npm run dev
   ```
3. And you can view the page with the url `http://localhost:3000`

## Helpful References

- Blogs :
  - Flask :
    - [The complete Flask beginner tutorial](https://dev.to/gajesh/the-complete-flask-beginner-tutorial-124i)
  - Flask with YOLO Model + Frontend :
    - [How to Detect Objects in Images Using the YOLOv8 Neural Network](https://www.freecodecamp.org/news/how-to-detect-objects-in-images-using-yolov8/)
  - Model Deployment :
    - [Develop Your Machine Learning API for Image Object Detection(YOLOv8) with Python Flask API](https://freedium.cfd/https://python.plainenglish.io/develop-your-machine-learning-api-for-image-object-detection-yolov8-with-python-flask-api-f393cb7e1e43)
- Videos :
  - NextJS(Frontend) + Flask(Backend)
    - [How to Create a Flask + Next.js Project | Python Backend + Next.js & React Frontend](https://youtu.be/OwxxCibSFKk?si=0BBvmiY8WkK2cjTj)
  - Projects
    - [YOLOv8 Course - Real Time Object Detection Web Application using YOLOv8 and Flask - Webcam/IP Camera](https://youtu.be/xzN_aG917-8?si=svQKzEL14o-afgFX)
- Codes :
  - https://github.com/MuhammadMoinFaisal/Computervisionprojects/tree/main/YOLOv8-CrashCourse

## UIS

![Login](./uis/login.png)
![Homepage](./uis/homepage.png)
![AllDatas](./uis/datas.png)
![Single Datas](./uis/single-data.png)
