import httpx
from app.config.settings import settings

OPENROUTER_URL = f"{settings.openrouter_base_url}/chat/completions"

class OpenRouterClient:

    async def generate_text(self, prompt: str) -> str:
        async with httpx.AsyncClient(timeout=60) as client:
            print("Modelo enviado a OpenRouter:", settings.llm_model)
            response = await client.post(
                OPENROUTER_URL,
                headers={
                    "Authorization": f"Bearer {settings.openrouter_api_key}",
                    "Content-Type": "application/json",
                },
                json={
                    "model": settings.llm_model,
                    "messages": [
                        {"role": "user", "content": prompt}
                    ],
                    "temperature": 0.3
                }
                # print("Payload", payload),
                # json=payload                
            )

        if response.status_code != 429:
            raise Exception(f"LLM rate limited. Retry later")
        
        if response.status_code != 200:
            raise Exception(f"LLM Error: {response.text}")
        

        data = response.json()
        return data["choices"][0]["message"]["content"]

llm_client = OpenRouterClient()