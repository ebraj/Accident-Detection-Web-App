import httpx

API_URL = "http://127.0.0.1:8080/api/v1/accident/create"

async def post_accident_data(data):
    async with httpx.AsyncClient() as client:
        response = await client.post(API_URL, json=data)
        return response