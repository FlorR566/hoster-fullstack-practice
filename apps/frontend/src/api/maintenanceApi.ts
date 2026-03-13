const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const formatToDDMMYYYY = (dateInput: string | Date): string => {
  if (!dateInput) return '—';

  let date: Date;

  if (typeof dateInput === 'string') {
    // Si es ISO (ej: "2026-03-11T00:00:00.000Z")
    if (dateInput.includes('T')) {
      date = new Date(dateInput);
    } else if (dateInput.includes('/')) {
      // Ya viene en DD/MM/YYYY
      const [day, month, year] = dateInput.split('/');
      date = new Date(Number(year), Number(month) - 1, Number(day));
    } else {
      // Intenta parsear como YYYY-MM-DD
      date = new Date(dateInput);
    }
  } else {
    date = dateInput;
  }

  if (isNaN(date.getTime())) return 'Fecha inválida';

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

export const getAllMaintenanceReports = async () => {
  const res = await fetch(`${API_BASE}/api/maintenance-report/get-maintenance-reports`);
  if (!res.ok) throw new Error('Error al obtener reportes');
  const data = await res.json();
  return data.map((r: any) => ({
    id: r.reportId,
    roomId: r.unit?.type || r.unitId || 'Sin unidad',
    status: r.status,
    reportDate: formatToDDMMYYYY(r.date),
    description: r.description,
    time: r.startTime || '—',
    duration: r.estimatedDuration,
    owner: r.responsibleName,
  }));
};

export const getMaintenanceReportById = async (id: string) => {
  const res = await fetch(`${API_BASE}/api/maintenance-report/get-maintenance-report/${id}`);
  if (!res.ok) throw new Error('Error al obtener reporte');
  const r = await res.json();
  return {
    id: r.reportId,
    roomId: r.unit?.type || r.unitId || 'Sin unidad',
    status: r.status,
    reportDate: formatToDDMMYYYY(r.date),
    description: r.description,
    time: r.startTime || '—',
    duration: r.estimatedDuration,
    owner: r.responsibleName,
  };
};

export const createMaintenanceReport = async (formData: any) => {
  let dateFormatted = formData.reportDate;
  if (dateFormatted.includes('-')) {
    const [y, m, d] = dateFormatted.split('-');
    dateFormatted = `${d}/${m}/${y}`;
  }

  const body = {
    type: formData.category,
    unitId: parseInt(formData.roomId, 10),
    responsibleName: formData.owner,
    estimatedDuration: formData.duration,
    date: dateFormatted,
    startTime: formData.startTime,
    description: formData.description,
  };

  const res = await fetch(`${API_BASE}/api/maintenance-report/create-maintenance-report`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Error al crear el reporte');
  }
  return res.json();
};

export const getAllUnits = async () => {
  const res = await fetch(`${API_BASE}/api/unit/get-units`);
  if (!res.ok) throw new Error('Error al obtener unidades');
  return res.json();
};