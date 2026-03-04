import httpx
import json




class LLMClient:

   timeout = httpx.Timeout(
        connect=10.0,
        read=300.0,   # acá está la clave
        write=10.0,
        pool=10.0
    )
   
   async def generate(self, prompt: str) -> dict:
       
        async with httpx.AsyncClient(timeout=self.timeout) as client:
            response = await client.post(
                "http://localhost:11434/api/generate",
                json={
                "model": "gemma3:4b",
                "prompt": prompt,
                "stream": False,
                "format": "json"
                },  
                timeout=self.timeout
            )

            response.raise_for_status()
            data = response.json()
            print("RESPUESTA CRUDA:", data)
            print("TEXTO DEL MODELO:", data["response"])

            # 👇 El modelo devuelve texto, así que lo parseamos
            raw_text = data["response"]
            
            try:
                response = await client.post("http://localhost:11434/api/generate")
            except httpx.ReadTimeout:
                raise TimeoutError("El modelo tardó demasiado en responder")
            
            try:
                return data["response"]
            except json.JSONDecodeError:
                raise ValueError("La IA no devolvió un JSON válido")
            


# 👇 instancia exportada
llm_client = LLMClient()
    
# import httpx
# from app.config.settings import settings

# OPENROUTER_URL = f"{settings.openrouter_base_url}/chat/completions"

# class OpenRouterClient:

#     async def generate_text(self, prompt: str) -> str:
#         async with httpx.AsyncClient(timeout=60) as client:
#             print("Modelo enviado a OpenRouter:", settings.llm_model)
#             response = await client.post(
#                 OPENROUTER_URL,
#                 headers={
#                     "Authorization": f"Bearer {settings.openrouter_api_key}",
#                     "Content-Type": "application/json",
#                 },
#                 json={
#                     "model": settings.llm_model,
#                     "messages": [
#                         {"role": "user", "content": prompt}
#                     ],
#                     "temperature": 0.3
#                 }
#                 # print("Payload", payload),
#                 # json=payload                
#             )

#         if response.status_code != 429:
#             raise Exception(f"LLM rate limited. Retry later")
        
#         if response.status_code != 200:
#             raise Exception(f"LLM Error: {response.text}")
        

#         data = response.json()
#         return data["choices"][0]["message"]["content"]

# llm_client = OpenRouterClient()