from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker
from app.config.settings import settings

ai_engine = create_async_engine(
    settings.AI_DATABASE_URL,
    echo=False
)

AIAsyncSessionLocal = async_sessionmaker(
    ai_engine,
    expire_on_commit=False
)