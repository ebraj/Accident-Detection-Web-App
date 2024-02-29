import asyncio
import numpy as np
from ultralytics import YOLO
import cv2
import cvzone
import math
import time
from modules.sort import *
from services.apis import post_accident_data
from geopy.geocoders import Nominatim
from modules.send_mail_async import send_mail_async
import base64

# Importing the model
model = YOLO('models/i1-yolov8s.pt')
# model = YOLO('models/current.pt')

# Importing the video
cap = cv2.VideoCapture("./assets/car-crash.mov")


async def main():
    emailDebounceTime = 5  # Time in seconds to wait before sending another email
    imageSaveDebounceTime = 5
    isSendMail = False

    # Implementing Tracker Code...
    tracker = Sort(max_age=20, min_hits=3, iou_threshold=0.3)
    totalAccidents = []
    tempConf = 0
    lastEmailSentTime = 0
    lastImageSavedTime = 0
    imageCount = 0
    task = None

    location = Nominatim(user_agent="iteration1-accident-detection-system", timeout=10)
    getLoc = location.reverse("28.236758299999998, 83.9960459255522")

    print(getLoc.raw)
    while True:
        success, img = cap.read()
        results = model(img, stream=True)
        detections = np.empty((0, 5))

        for r in results:
            boxes = r.boxes
            for box in boxes:
                x1, y1, x2, y2 = box.xyxy[0]
                x1, y1, x2, y2 = int(x1), int(y1), int(x2), int(y2)
                w, h = x2 - x1, y2 - y1

                conf = math.ceil((box.conf[0] * 100)) / 100
                tempConf = conf

                if float(tempConf) > 0.4:
                    cvzone.cornerRect(img, (x1, y1, w, h))
                    cvzone.putTextRect(img, f'Accident {conf}', (max(0, x1), max(35, y1)), colorR=(0, 165, 255))
                    currentArray = np.array([x1, y1, x2, y2, conf])
                    detections = np.vstack((detections, currentArray))

                    # if (time.time() - lastEmailSentTime) > emailDebounceTime and isSendMail == False:
                    #     lastEmailSentTime = time.time()
                    #     isSendMail = True
                    #     task = asyncio.create_task(send_mail_async())

        trackerResults = tracker.update(detections)

        for result in trackerResults:
            x1,y1,x2,y2,id = result
            x1, y1, x2, y2 = int(x1), int(y1), int(x2), int(y2)
            id = int(id)
            w, h = x2 - x1, y2 - y1
            if totalAccidents.count(id) == 0:

                if getLoc is not None:
                    # pass
                    _, frame_encoded = cv2.imencode('.jpg', img)
                    frame_base64 = base64.b64encode(frame_encoded).decode('utf-8')
                    data = {
                        "address": getLoc.address,
                        "city": getLoc.raw.get("address", {}).get("city"),
                        "latitude": getLoc.latitude,
                        "longitude": getLoc.longitude,
                        "severityInPercentage": tempConf * 100,
                        "severity": "Moderate",
                        "frame": frame_base64
                    }
                    task1 = asyncio.create_task(post_accident_data(data))
                    # if response.status_code == 200:
                    #     print("Request successful. 🔥🔥🔥🔥🔥")
                    #     print(response.json())
                    # else:
                    #     print(f"Error ❌❌❌❌❌❌: {response.status_code}\n{response.text}")
                cvzone.cornerRect(img, (x1, y1, w, h), colorR=(255, 0, 255))
                cvzone.putTextRect(img, f'{id}', (max(0, x1), max(35, y1)))
                cx, cy = x1 + w // 2, y1 + h // 2
                cv2.circle(img, (cx, cy), 5, (255, 0, 255), cv2.FILLED)
                totalAccidents.append(id)


        # if(float(tempConf) > 0.4):
        #     if (time.time() - lastEmailSentTime) > emailDebounceTime and isSendMail == False:
        #         lastEmailSentTime = time.time()
        #         send_mail()
        #         isSendMail = True

        # Displaying the video
        cv2.imshow("Video Capture", img)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

        await asyncio.sleep(0.01)

    # print('🔥🔥🔥🔥🔥', detections)
    if task is not None:
        await task
    if task1 is not None:
        await task1

if __name__ == "__main__":
    loop = asyncio.get_event_loop()
    try:
        loop.run_until_complete(main())
    finally:
        loop.close()