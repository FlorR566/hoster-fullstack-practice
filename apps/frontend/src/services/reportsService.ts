import { API_BASE_URL, API_ENDPOINTS } from '../constants/api';

export interface Report {
  id: number;
  report_date: string;
  analyzed_period: string;
  description: string;
}

export const reportsService = {
  // Obtener todos los reportes
  async getAll(): Promise<Report[]> {
    const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.reports.list}`);
    if (!res.ok) throw new Error('Error al obtener reportes');
    return res.json();
  },

  // Generar nuevo reporte (¡aquí se usa la IA!)
  async generate(month: number, year: number): Promise<{ status: string }> {
    const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.reports.generate}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ month, year }),
    });

    if (!res.ok) {
      const error = await res.text();
      throw new Error(error || 'Error al generar reporte');
    }
    return res.json();
  },

  // Obtener un reporte por ID (para ReportDetail)
  async getById(id: number): Promise<Report> {
    const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.reports.detail(id)}`);
    if (!res.ok) throw new Error('Reporte no encontrado');
    return res.json();
  },
};