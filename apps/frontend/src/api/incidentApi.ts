const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const getAllIncidents = async () => {
  const res = await fetch(`${API_BASE}/api/incident-report/get-incidents`);
  if (!res.ok) {
    throw new Error(`Error al obtener incidentes: ${res.status} ${res.statusText}`);
  }
  const data = await res.json();
  return data.map((i: any) => ({
    numeroReserva: `HSTR-${i.reserveId?.toString().padStart(6, '0') || '000000'}`,
    nombreHuesped: i.guestName || '—',
    tipoIncidente: i.incidentType || '—',
    fechaIncidente: formatToDDMMYYYY(i.incidentDate),
    horaIncidente: i.incidentTime || '—',
    descripcion: i.description || 'Sin descripción',
    nombreRecepcionista: i.receptionist?.name || 'Sin recepcionista',
    recibeCompensacion: i.receivesCompensation ? 'Sí' : 'No',
    compensacion: i.compensationDetail || '—',
  }));
};

export const createIncidentReport = async (data: any) => {
  let formattedDate = data.fechaOcurrencia || '';
  if (formattedDate.includes('-')) {
    const [y, m, d] = formattedDate.split('-');
    formattedDate = `${d?.padStart(2, '0') || '01'}/${m?.padStart(2, '0') || '01'}/${y || '2025'}`;
  }

  let reserveId: number;
  const numeroReservaStr = String(data.numeroReserva || '').trim();

  if (/^\d+$/.test(numeroReservaStr)) {
    reserveId = Number(numeroReservaStr);
  } else {
    const digitsOnly = numeroReservaStr.replace(/\D/g, '');
    reserveId = digitsOnly ? Number(digitsOnly) : 7; // fallback a 7 si no hay dígitos
  }

  // Evitar IDs absurdamente grandes (por si alguien pega algo raro)
  if (reserveId > 99999999 || reserveId < 1) {
    reserveId = 7;
  }

  const body = {
    reserveId,
    guestName: data.nombreHuesped?.trim() || 'Huésped no especificado',
    incidentType: data.tipoIncidente || 'Otro',
    incidentDate: formattedDate || '01/01/2025',
    incidentTime: data.horaOcurrencia || '10:00',
    description: data.descripcion?.trim() || 'Sin descripción',
    receptionistId: Number(data.receptionistId) || 1,
    receivesCompensation: data.recibeCompensacion === 'si',
    compensationDetail:
      data.recibeCompensacion === 'si' && data.compensacion?.trim()
        ? data.compensacion.trim()
        : null,
  };

  console.log('[createIncidentReport] Datos enviados al backend:', {
    originalNumeroReserva: data.numeroReserva,
    reserveIdCalculado: reserveId,
    fullBody: body,
  });

  const res = await fetch(`${API_BASE}/api/incident-report/create-incident`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    let errorMessage = `Error ${res.status} - ${res.statusText}`;
    try {
      const errData = await res.json();
      errorMessage = errData.error || errorMessage;
    } catch {
    }
    throw new Error(errorMessage);
  }

  return res.json();
};

const formatToDDMMYYYY = (isoDate: string) => {
  if (!isoDate) return '';
  try {
    const date = new Date(isoDate);
    if (isNaN(date.getTime())) return '';
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  } catch {
    return '';
  }
};