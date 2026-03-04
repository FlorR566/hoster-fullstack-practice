from fastapi import APIRouter, Depends, HTTPException
from app.models.schemas import AIReservationAnalysisRequest, AIExecutionResponse
from app.services.ai_reservation_service import AIReservationService

router = APIRouter()
ai_service = AIReservationService()

@router.post("/reservations/analyze", response_model=AIExecutionResponse)
async def analyze_reservation(request: AIReservationAnalysisRequest):

    try:
        # Buscar reserva en BD
        reservation = ...  # tu lógica para traerla

        if not reservation:
            raise HTTPException(status_code=404, detail="Reserva no encontrada")

        result = await ai_service.analyze_reservation(reservation)

        return AIExecutionResponse(
            success=True,
            data=result
        )

    except Exception as e:
        return AIExecutionResponse(
            success=False,
            message=str(e)
        )