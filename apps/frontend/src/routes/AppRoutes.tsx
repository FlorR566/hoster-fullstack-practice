import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import NuevaReserva from "../components/reservas/NuevaReserva";
import EditarReserva from "../components/reservas/EditarReserva";
import Mantenimiento from "../pages/Mantenimiento";
import RoomsOverview from "../pages/RoomsOverview";
import AppLayout from "../components/layout/AppLayout";
import VerMas from "../components/reservas/VerMas";

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
				path="/register"
				element={
					<PublicRoute>
						<Register />
					</PublicRoute>
				}
			/>

			{/* Rutas con Layout (Protegidas o con barra lateral/header) */}
			<Route element={<AppLayout />}>
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="/reservas/nueva" element={<NuevaReserva />} />
				<Route path="/editar-reserva/:id" element={<EditarReserva />} />
				<Route path="/reservas/:id" element={<VerMas />} />
				<Route path="/mantenimiento" element={<Mantenimiento />} />
				<Route path="/roomsOverview" element={<RoomsOverview />} />
			</Route>

			{/* Redirección por defecto */}
			<Route path="/" element={<Navigate to="/login" replace />} />
		</Routes>
	);
};

export default AppRoutes;
