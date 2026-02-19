import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import RoomsOverview from "../pages/RoomsOverview";
import AppLayout from "../components/layout/AppLayout";

export const AppRoutes: React.FC = () => {
	return (
		<Routes>
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

			<Route element={<AppLayout />}>
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="/roomsOverview" element={<RoomsOverview />} />
			</Route>
			<Route path="/" element={<Navigate to="/login" replace />} />
		</Routes>
	);
};

export default AppRoutes;
