# import asyncio
# from app.services.llm_client import llm_client

# async def test():
#     response = await llm_client.generate_text("Respondé solo con la palabra: HOLA")
#     print(response)

# asyncio.run(test())

import asyncio
from app.services.ai_reservation_service import AIReservationService

class FakeReservation:
    id = 1
    client_name = "Juan Pérez"
    total_price = 50000
    no_show_count = 1

async def main():
    service = AIReservationService()
    reservation = FakeReservation()

    result = await service.analyze_reservation(reservation)
    print(result)
    # result = await service.analyze_reservation(reservation)
    # print(result)
    # print(result)

asyncio.run(main())