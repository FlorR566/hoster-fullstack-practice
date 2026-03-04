import json
from app.services.llm_client import LLMClient
from app.models.schemas import AIReservationAnalysisResponse
from app.core.database_ai import AIAsyncSessionLocal
from app.models.ai_models import AIReservationAnalysis


class AIReservationService:

    def __init__(self):
        self.llm = LLMClient()

    async def analyze_reservation(self, reservation):

        # 1️⃣ Construcción del prompt
        json_format = """
        {
        "risk_score": 0.0,
        "decision": "approve",
        "reason": "explicación breve"
        }
        """

        prompt = f"""
        Eres un sistema de análisis de riesgo.

        Cliente: {reservation.client_name}
        Precio Total: {reservation.total_price}
        No Shows Previos: {reservation.no_show_count}

        Responde EXCLUSIVAMENTE en JSON válido.
        No agregues texto adicional.
        
        La decisión SOLO puede ser:
        - "approve"
        - "reject"

        Cualquier otro valor está prohibido.

        Formato obligatorio:
        {json_format}
        """

        # 2️⃣ Llamada al modelo
        ai_raw = await self.llm.generate(prompt)

        ai_data = json.loads(ai_raw)
        
        risk_score = ai_data["risk_score"]
        decision = ai_data["decision"]
        reason = ai_data["reason"]
        
        if ai_data["decision"] not in ["approve", "reject"]:
            raise ValueError("Decision inválida devuelta por la IA")
        
        print("LONGITUD PROMPT:", len(prompt))
        print("RESPUESTA IA COMPLETA:")
        print(ai_raw)
        try:
                # ai_raw = await self.llm.generate(prompt)
                ai_data = json.loads(ai_raw)
        except json.JSONDecodeError:
                raise ValueError("La IA devolvió JSON inválido")
            
        required_fields = ["risk_score", "decision", "reason"]

        for field in required_fields:
            if field not in ai_data:
                raise ValueError(f"Falta campo obligatorio: {field}")
        if not isinstance(ai_data["risk_score"], (int, float)):
            raise ValueError("risk_score debe ser numérico")

        if not isinstance(ai_data["decision"], str):
            raise ValueError("decision debe ser string")

        if not isinstance(ai_data["reason"], str):
            raise ValueError("reason debe ser string")
        
        if not (0 <= ai_data["risk_score"] <= 1):
            raise ValueError("risk_score fuera de rango")

        if ai_data["decision"] not in ["approve", "reject"]:
            raise ValueError("decision inválida")
        
        
        # 3️⃣ Transformación a contrato
        structured = AIReservationAnalysisResponse(
            ai_data = json.loads(ai_raw),
            reason=ai_data["reason"],
            risk_score=ai_data["risk_score"],
            decision=ai_data["decision"]
        )

        # 4️⃣ Guardado en BD IA independiente
        await self.save_analysis(reservation.id, structured)

        # 5️⃣ Retorno
        return structured
        
    async def save_analysis(self, reservation_id: int, result):

        async with AIAsyncSessionLocal() as session:
            analysis = AIReservationAnalysis(
                reservation_id=reservation_id,
                reason=result.reason,
                risk_score=result.risk_score,
                decision=result.decision
            )

            session.add(analysis)
            await session.commit()