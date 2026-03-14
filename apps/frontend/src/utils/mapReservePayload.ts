export const mapReservePayload = (form: any, econ: any, guestId?: number) => {
	const user = JSON.parse(localStorage.getItem("example_user") || "{}");

	// Esta función convierte "2026-03-13" (del input) a "13-03-2026" (lo que pide tu backend)
	const formatDateForBackend = (date: string) => {
		if (!date) return "";
		const [year, month, day] = date.split("-");
		return `${day}-${month}-${year}`;
	};

	return {
		unitId: Number(form.numeroAlojamiento),
		userId: Number(user.id),
		guestId: guestId ?? Number(form.guestId || 1),

		currencyId: 1,
		originId: 1,

		// 1. Aplicamos el formato que el popup exige
		estimatedCheckIn: formatDateForBackend(form.fechaCheckin),
		estimatedCheckOut: formatDateForBackend(form.fechaCheckout),

		estimatedCheckInTime: form.horaLlegada,
		estimatedCheckOutTime: form.horaCheckout,

		// 2. IMPORTANTÍSIMO: Asegúrate de que estos sean Number
		guestAdult: Number(form.adultos),
		guestChild: Number(form.ninos || 0),

		//observation: econ.nota || "",
		observation: (econ.nota || "").substring(0, 20),

		serviceIds: form.serviciosAgregados.map((s: any) => Number(s.id || 1)),
		numberDocument: form.documentoIdentidad,
	};
};
