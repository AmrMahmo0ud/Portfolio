
import os

import resend
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field

load_dotenv()

resend.api_key = os.environ["RESEND_API_KEY"]

CONTACT_EMAIL = os.environ["CONTACT_EMAIL"]
EMAIL_FROM = os.environ["EMAIL_FROM"]

app = FastAPI(title="Portfolio Contact API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        os.getenv("FRONTEND_URL", "http://localhost:5173"),
    ],
    allow_credentials=False,
    allow_methods=["POST"],
    allow_headers=["Content-Type", "Accept"],
)


class ContactRequest(BaseModel):
    name: str = Field(min_length=2, max_length=100)
    email: EmailStr
    subject: str = Field(min_length=3, max_length=150)
    message: str = Field(min_length=20, max_length=5000)


@app.get("/")
def health_check():
    return {"status": "ok"}


@app.post("/api/contact")
def send_contact_email(data: ContactRequest):
    try:
        result = resend.Emails.send({
            "from": EMAIL_FROM,
            "to": [CONTACT_EMAIL],
            "reply_to": str(data.email),
            "subject": f"Portfolio Contact: {data.subject}",
            "text": (
                f"Name: {data.name}\n"
                f"Email: {data.email}\n"
                f"Subject: {data.subject}\n\n"
                f"Message:\n{data.message}"
            ),
        })

        return {
            "success": True,
            "message": "Your message was submitted successfully.",
            "id": result["id"],
        }

    except Exception:
        # Log the exception on the server in a real deployment.
        raise HTTPException(
            status_code=502,
            detail="Unable to send your message right now.",
        )
