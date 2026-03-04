from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.orm import declarative_base
from datetime import datetime

AIBase = declarative_base()

class AIReservationAnalysis(AIBase):
    __tablename__ = "reservation_analysis"

    id = Column(Integer, primary_key=True, index=True)
    reservation_id = Column(Integer, nullable=False)
    reason = Column(Text, nullable=False)
    risk_score = Column(String(50), nullable=False)
    decision = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)