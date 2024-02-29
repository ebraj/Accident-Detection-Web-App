from email.message import EmailMessage
from dotenv import load_dotenv
import os
import asyncio
import aiosmtplib

load_dotenv()

async def send_mail_async():
    try:
        email_sender = os.environ['EMAIL_SENDER']
        email_password = os.environ['EMAIL_PASSWORD']
        email_receiver = 'hashoneonehash@gmail.com'

        subject = 'Check out this recent video.'
        body = '''
        Checkout my Untitled Dev Channel for coding videos on Frontend Techs like NextJS...
        '''

        em = EmailMessage()
        em['From'] = email_sender
        em['To'] = email_receiver
        em['Subject'] = subject
        em.set_content(body)

        await aiosmtplib.send(em, hostname='smtp.gmail.com', port=465, use_tls=True,username=email_sender, password=email_password)
        print("🔥🔥🔥🔥🔥🔥🔥")
        await asyncio.sleep(0)
    except Exception as e:
        print(f"An error occured: {e}")

if __name__ == "__main__":
    asyncio.run(send_mail_async())