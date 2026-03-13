export const mapReservePayload = (form: any, econ: any) => {

  const user = JSON.parse(localStorage.getItem("example_user") || "{}");

  const formatDate = (date: string) => {
    const [year, month, day] = date.split("-");
    return `${day}-${month}-${year}`;
  };

  return {
    unitId: Number(form.numeroAlojamiento),

    userId: Number(user.id),

    guestId: Number(form.guestId || 1), // ajustar luego

    currencyId: 1, // USD por ahora
    originId: Number(form.canalReserva || 1),

    estimatedCheckIn: formatDate(form.fechaCheckin),
    estimatedCheckOut: formatDate(form.fechaCheckout),

    estimatedCheckInTime: form.horaLlegada,
    estimatedCheckOutTime: form.horaCheckout,

    guestAdult: String(form.adultos),
    guestChild: String(form.ninos || 0),

    observation: econ.nota || "",

    serviceIds: form.serviciosAgregados.map((s: any) =>
      Number(s.id || 1)
    ),
    numberDocument: form.documentoIdentidad,
  };
};