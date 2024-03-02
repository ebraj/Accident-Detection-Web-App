from flask import Blueprint, current_app, jsonify, request
from flask_mail import Mail, Message
import os
from dotenv import load_dotenv
load_dotenv()

mail = Mail()
emails = Blueprint('emails',__name__, url_prefix='/api/v1/emails')

@emails.route('/send-email', methods=['POST'])
def send_email():
    latitude = request.json.get('latitude')
    longitude = request.json.get('longitude')
    severity = request.json.get('severity')
    location = request.json.get('location')
    msg = Message(subject="🚨 Accident Alert - Severity({})".format(severity), sender=os.getenv('EMAIL'), recipients=[os.getenv('SENDTO')])

    googleMapLink = 'https://www.google.com/maps/search/?api=1&query={},{}'.format(latitude, longitude)
    msg.body = "🚨 Accident Alert - Severity({})\nLocation:{}\nGoogle Map: {}".format(severity, location, googleMapLink)
    mail.send(msg)
    msg.body = "Hey Hash, sending you this email from my Flask app, lmk if it works"
    mail.send(msg)
    return jsonify({
        "message": "Email sent successfully."
    })

if __name__ == '__main__':
    mail.init_app(current_app)