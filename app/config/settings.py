"""Application settings and configuration."""

from pydantic_settings import BaseSettings
from typing import Optional


class Settings(BaseSettings):
    """Application settings with environment variable support."""
    
    app_name: str = "FastAPI AI Template"
    app_version: str = "1.0.0"
    debug: bool = True

    openrouter_api_key: str 
    openrouter_base_url: str = "https://openrouter.ai/api/v1"
    llm_model: str = "google/gemma3:4b"

    AI_DATABASE_URL: str = "postgresql+asyncpg://postgres:m4rt1np0stgr3s@localhost:5432/hoster_AI"
    
    # API Configuration
    api_host: str = "0.0.0.0"
    api_port: int = 8000
    
    # CORS Configuration
    cors_origins: list[str] = ["*"]
    cors_allow_credentials: bool = True
    cors_allow_methods: list[str] = ["*"]
    cors_allow_headers: list[str] = ["*"]
    
    # Logging Configuration
    log_level: str = "INFO"
    
    class Config:
        env_file = ".env"
        case_sensitive = False


# Global settings instance
settings = Settings()
