import httpx

API_URL = "http://127.0.0.1:8080/api/v1/accident/create"
SEND_MAIL_URL = "http://127.0.0.1:8080/api/v1/emails/send-email"

async def post_accident_data(data):
    async with httpx.AsyncClient() as client:
        response = await client.post(API_URL, json=data)
        return response
    
async def send_mail_async_final(latitude, longitude, severity, location):
    async with httpx.AsyncClient() as client:
        response = await client.post(SEND_MAIL_URL, json={"latitude": latitude, "longitude": longitude, "severity": severity, "location": location})
        return response