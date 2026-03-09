import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ConfirmAccount from "../pages/ConfirmAccount";
import Dashboard from "../pages/Dashboard";
import NuevaReserva from "../components/reservas/NuevaReserva";
import EditarReserva from "../components/reservas/EditarReserva";
import ReporteIncidente from "../components/dashboard/Incidente/ReporteIncidente";
import Mantenimiento from "../pages/Mantenimiento";
import RoomsOverview from "../pages/RoomsOverview";
import AppLayout from "../components/layout/AppLayout";
import VerMas from "../components/reservas/VerMas";
import Reports from "../pages/Reports";
import ReportDetail from "../components/reports/ReportDetail";

export const AppRoutes: React.FC = () => {
	return (
		<Routes>
			{/* Rutas Públicas */}
			<Route
				path="/login"
				element={
					<PublicRoute>
						<Login />
					</PublicRoute>
				}
			/>
			<Route
				path="/create-account"
				element={
					<PublicRoute>
						<Register />
					</PublicRoute>
				}
			/>
			<Route
				path="/confirm-account"
				element={
					<PublicRoute>
						<ConfirmAccount />
					</PublicRoute>
				}
			/>
			{/* Rutas Privadas */}
			<Route
				element={
					<ProtectedRoute>
						<AppLayout /> 
					</ProtectedRoute>
				}
			>
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="/reservas/nueva" element={<NuevaReserva />} />
				<Route path="/editar-reserva/:id" element={<EditarReserva />} />
				<Route path="/reservas/:id" element={<VerMas />} />
				<Route path="/incidentes/reporte" element={<ReporteIncidente />} />
				<Route path="/mantenimiento" element={<Mantenimiento />} />
				<Route path="/roomsOverview" element={<RoomsOverview />} />
				<Route path="/reports" element={<Reports />} />
				<Route path="/reports/:id" element={<ReportDetail />} />
			</Route>

			{/* Redirección por defecto */}
			<Route path="*" element={<Navigate to="/login" replace />} />
		</Routes>
	);
};

export default AppRoutes;
