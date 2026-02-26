import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../components/register/Input";
import { Button } from "../components/register/Button";
import { User } from "../types";
import { getSecurityTip } from "../services/service";
import { api } from "../services/api";
import { useAuth } from "../hooks/useAuth";

const Register: React.FC = () => {
	const navigate = useNavigate();
	const { login } = useAuth();
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [isLoading, setIsLoading] = useState(false);
	const [errors, setErrors] = useState<Record<string, string>>({});
	const [serverError, setServerError] = useState<string | null>(null);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
		setServerError(null);
		if (errors[name]) {
			setErrors((prev) => {
				const newErrors = { ...prev };
				delete newErrors[name];
				return newErrors;
			});
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setServerError(null);

		const newErrors: Record<string, string> = {};
		if (formData.password !== formData.confirmPassword) {
			newErrors.confirmPassword = "Passwords don't match";
		}
		if (formData.password.length < 8) {
			newErrors.password = "Password must be at least 8 characters";
		}

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
			setIsLoading(false);
			return;
		}

		try {
			const response = await api.register({
				name: formData.name,
				email: formData.email,
				password: formData.password,
			});
			login(response.user);
			navigate("/dashboard");
		} catch (err: any) {
			setServerError(err.message || "Registration failed");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="font-['Poppins'] text-[var(--light-text)] min-h-screen flex items-center justify-center p-4 bg-[#0F172A]">
			<div className="w-full max-w-[570px]">
				<div className="bg-[var(--light-bg)] p-8 rounded-2xl">
					<div className="flex flex-col items-center mb-6 h-[135px] bg-[var(--light-outline)] -mx-8 -mt-8 pt-7 rounded-t-2xl">
						<h1 className="text-[32px] font-bold">¡Bienvenido!</h1>
						<p className="text-[16px]">
							Ingresa tus credenciales para registrarte al sitio
						</p>
					</div>

					{serverError && (
						<div className="mb-6 bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded-lg flex items-center gap-2">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-5 h-5"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
								/>
							</svg>
							{serverError}
						</div>
					)}

					<form
						onSubmit={handleSubmit}
						className="grid grid-cols-1 md:grid-cols-2 gap-4"
					>
						<div className="md:col-span-2">
							<Input
								label="Nombre de usuario"
								name="name"
								placeholder="Usuario"
								required
								disabled={isLoading}
								value={formData.name}
								onChange={handleChange}
							/>
						</div>
						<div className="md:col-span-2">
							<Input
								label="Email"
								name="email"
								type="email"
								placeholder="****@gmail.com"
								required
								disabled={isLoading}
								value={formData.email}
								onChange={handleChange}
							/>
						</div>
						<div className="md:col-span-2">
							{" "}
							<Input
								label="Contraseña"
								name="password"
								type="password"
								placeholder="************"
								required
								disabled={isLoading}
								error={errors.password}
								value={formData.password}
								onChange={handleChange}
							/>
						</div>

						<div className="md:col-span-2">
							{" "}
							<Input
								label="Repetir Contraseña"
								name="confirmPassword"
								type="password"
								placeholder="************"
								required
								disabled={isLoading}
								error={errors.confirmPassword}
								value={formData.confirmPassword}
								onChange={handleChange}
							/>
						</div>

						<div className="md:col-span-2 mt-4">
							<Button
								type="submit"
								className="w-full font-['Poppins'] font-light"
								isLoading={isLoading}
							>
								Registrarse
							</Button>
						</div>
					</form>

					<div className="mt-8 pt-6 text-center h-[67px] bg-[var(--light-outline)] -mx-8 -mb-8 rounded-b-2xl">
						<p className="text-[16px]">
							¿Ya sos un usuario?{" "}
							<Link to="/login" className="underline">
								INICIAR SESION
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Register;
