from fastapi import FastAPI, APIRouter, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional
import uuid
from datetime import datetime

# Load environment variables
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Create the main FastAPI app
app = FastAPI(
    title="TimeTracker Pro API",
    description="API for TimeTracker Pro - Time Management System",
    version="1.0.0"
)

# CORS Configuration for home.pl hosting
# Using ["*"] as allow_origins to ensure proper wildcard handling for all requests including OPTIONS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins - this ensures proper wildcard handling
    allow_credentials=False,  # Must be False when using "*" for origins
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

# MongoDB connection
try:
    mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
    client = AsyncIOMotorClient(mongo_url)
    db = client[os.environ.get('DB_NAME', 'timetracker_db')]
    logging.info(f"Connected to MongoDB: {mongo_url}")
except Exception as e:
    logging.error(f"Failed to connect to MongoDB: {e}")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Define Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

class ContactMessage(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_name: str
    user_email: str
    user_company: Optional[str] = None
    user_phone: Optional[str] = None
    message: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class ContactMessageCreate(BaseModel):
    user_name: str
    user_email: str
    user_company: Optional[str] = None
    user_phone: Optional[str] = None
    message: str

# API Routes
@api_router.get("/")
async def root():
    """Health check endpoint"""
    return {"message": "TimeTracker Pro API is running", "status": "ok"}

@api_router.get("/health")
async def health_check():
    """Detailed health check"""
    try:
        # Test database connection
        await db.list_collection_names()
        db_status = "connected"
    except Exception as e:
        db_status = f"error: {str(e)}"
    
    return {
        "status": "ok",
        "timestamp": datetime.utcnow().isoformat(),
        "database": db_status,
        "api_version": "1.0.0"
    }

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    """Create a new status check"""
    try:
        status_dict = input.dict()
        status_obj = StatusCheck(**status_dict)
        await db.status_checks.insert_one(status_obj.dict())
        return status_obj
    except Exception as e:
        logging.error(f"Error creating status check: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    """Get all status checks"""
    try:
        status_checks = await db.status_checks.find().to_list(1000)
        return [StatusCheck(**status_check) for status_check in status_checks]
    except Exception as e:
        logging.error(f"Error fetching status checks: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.post("/contact", response_model=ContactMessage)
async def submit_contact_form(input: ContactMessageCreate):
    """Submit contact form"""
    try:
        contact_dict = input.dict()
        contact_obj = ContactMessage(**contact_dict)
        await db.contact_messages.insert_one(contact_obj.dict())
        
        # Log the contact submission
        logging.info(f"New contact form submission from {contact_obj.user_email}")
        
        return contact_obj
    except Exception as e:
        logging.error(f"Error submitting contact form: {e}")
        raise HTTPException(status_code=500, detail="Failed to submit contact form")

@api_router.get("/contact", response_model=List[ContactMessage])
async def get_contact_messages():
    """Get all contact messages (admin only)"""
    try:
        messages = await db.contact_messages.find().sort("timestamp", -1).to_list(100)
        return [ContactMessage(**message) for message in messages]
    except Exception as e:
        logging.error(f"Error fetching contact messages: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

# Include the router in the main app
app.include_router(api_router)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("startup")
async def startup_event():
    logger.info("TimeTracker Pro API is starting up...")

@app.on_event("shutdown")
async def shutdown_event():
    logger.info("TimeTracker Pro API is shutting down...")
    if 'client' in globals():
        client.close()

# Root endpoint (outside of /api prefix)
@app.get("/")
async def root_endpoint():
    return {"message": "TimeTracker Pro API", "docs": "/docs"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "server:app",
        host="0.0.0.0",
        port=8001,
        reload=True,
        log_level="info"
    )