import asyncio
from app.services.llm_client import llm_client

async def test():
    response = await llm_client.generate_text("Respondé solo con la palabra: HOLA")
    print(response)

asyncio.run(test())