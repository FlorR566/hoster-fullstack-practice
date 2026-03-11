import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/register/Button";
import { api } from "../services/api";
import { useAuth } from "../hooks/useAuth";

const ConfirmAccount: React.FC = () => {
	const navigate = useNavigate();
	const { login } = useAuth();

	// Estado de los 6 dígitos
	const [code, setCode] = useState<string[]>(Array(6).fill(""));
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState<string | null>(null);
	const pendingEmail = sessionStorage.getItem("pendingEmail");

	// Un ref por cada casilla para manejar el foco
	const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(6).fill(null));

	// Ponemos el foco en la primera casilla al montar el componente
	useEffect(() => {
		inputRefs.current[0]?.focus();
	}, []);

	// Manejo de escritura en cada casilla
	const handleChange = (value: string, index: number) => {
		setError(null);

		// Solo aceptar dígitos numéricos
		if (value && !/^\d$/.test(value)) return;

		const newCode = [...code];
		newCode[index] = value;
		setCode(newCode);

		// Auto-avanzar al siguiente campo si se ingresó un dígito
		if (value && index < 5) {
			inputRefs.current[index + 1]?.focus();
		}
	};

	// Manejo de teclas especiales
	const handleKeyDown = (
		e: React.KeyboardEvent<HTMLInputElement>,
		index: number,
	) => {
		if (e.key === "Backspace" && !code[index] && index > 0) {
			// Retroceder y borrar el campo anterior
			const newCode = [...code];
			newCode[index - 1] = "";
			setCode(newCode);
			inputRefs.current[index - 1]?.focus();
		}
		if (e.key === "ArrowLeft" && index > 0) {
			inputRefs.current[index - 1]?.focus();
		}
		if (e.key === "ArrowRight" && index < 5) {
			inputRefs.current[index + 1]?.focus();
		}
	};

	// Pegado (Ctrl+V / Cmd+V)
	const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
		e.preventDefault();
		const pasted = e.clipboardData
			.getData("text")
			.replace(/\D/g, "")
			.slice(0, 6);
		if (!pasted) return;

		const newCode = [...code];
		pasted.split("").forEach((char, i) => {
			newCode[i] = char;
		});
		setCode(newCode);

		// Foco en la última casilla llenada
		const lastIndex = Math.min(pasted.length - 1, 5);
		inputRefs.current[lastIndex]?.focus();
	};

	// Submit del formulario
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const token = code.join("");

		// Validación: los 6 dígitos deben estar completos
		if (token.length < 6) {
			setError("Por favor ingresá los 6 dígitos del código.");
			return;
		}

		setIsLoading(true);
		setError(null);

		try {
			// Llamada a POST /api/auth/confirm-account con { token: "123456" }
			const response = await api.confirmAccount({ token });

			// Guardamos el usuario autenticado en el contexto global
			login(response.user);

			setSuccess(response.message || "¡Cuenta verificada con éxito!");

			// Redirigimos al dashboard después de 1.5 segundos
			setTimeout(() => navigate("/dashboard"), 2500);
		} catch (err: any) {
			setError(err.message || "Token no válido. Intentá de nuevo.");
			// Limpiamos las casillas para que el usuario reingrese el código
			setCode(Array(6).fill(""));
			inputRefs.current[0]?.focus();
		} finally {
			setIsLoading(false);
		}
	};

	// ─────────────────────────────────────────────────────────
	// TODO: Reenvío del código
	//
	// Llama al endpoint de reenvío (si existe) o muestra un mensaje.
	// Por ahora está preparado para conectarse cuando tengas el endpoint.
	// ─────────────────────────────────────────────────────────
	const handleResend = async () => {
		// TODO: conectar con api.resendToken() cuando el endpoint esté disponible
		// Por ahora solo reseteamos el estado visual
		setCode(Array(6).fill(""));
		setError(null);
		setSuccess("Se reenvió el código a tu email.");
		inputRefs.current[0]?.focus();
	};

	return (
		<div className="font-['Poppins'] text-[var(--light-text)] min-h-screen flex flex-col items-center justify-center gap-4 p-4 bg-[#000000] bg-[linear-gradient(to_bottom,rgba(0,0,0,0.7),rgba(0,0,0,0.7)),url('/images/FondoHoster.webp')] bg-cover bg-center h-screen">
			{/* Logo + Nombre */}
			<div className="w-[570px] flex flex-col items-center">
				<img
					src="/images/Hoster.svg"
					alt="Hoster"
					className="w-[63px] h-[63px] bg-[#fff] rounded-lg"
				/>
				<h1 className="text-[#f7f7ff] text-[36px] font-bold text-center">
					HOSTER
				</h1>
			</div>

			{/* Card principal */}
			<div className="w-full max-w-[570px]">
				<div className="bg-[var(--light-bg-center)] p-8 rounded-2xl">
					{/* Header de la card */}
					<div className="flex flex-col items-center mb-6 h-[135px] bg-[var(--light-bg-register)] -mx-8 -mt-8 pt-7 rounded-t-2xl text-center px-4">
						<h1 className="text-[32px] font-bold">Verificar Registro</h1>
						<p className="text-[16px] mt-1">
							Enviamos un código de 6 dígitos a{" "}
							<span className="font-semibold">
								{pendingEmail ?? "tu email"}
							</span>
						</p>
					</div>

					{/* Mensaje de éxito */}
					{success && (
						<div className="mb-6 bg-green-500/10 border border-green-500/20 text-green-400 text-sm p-3 rounded-lg flex items-center gap-2">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-5 h-5 flex-shrink-0"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
								/>
							</svg>
							{success}
						</div>
					)}

					{/* Mensaje de error del servidor */}
					{error && (
						<div className="mb-6 bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded-lg flex items-center gap-2">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-5 h-5 flex-shrink-0"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
								/>
							</svg>
							{error}
						</div>
					)}

					{/* Formulario */}
					<form onSubmit={handleSubmit} className="space-y-6">
						<p className="text-center text-[16px]">
							Ingrese el código de 6 dígitos
						</p>

						{/*  6 casillas OTP */}
						<div className="flex gap-3 justify-center">
							{code.map((digit, index) => (
								<input
									key={index}
									ref={(el) => {
										inputRefs.current[index] = el;
									}}
									type="text"
									inputMode="numeric"
									maxLength={1}
									value={digit}
									disabled={isLoading}
									onChange={(e) => handleChange(e.target.value, index)}
									onKeyDown={(e) => handleKeyDown(e, index)}
									onPaste={handlePaste}
									className={`
										w-[72px] h-[72px] text-center text-[32px] font-light
										rounded-xl border-2 outline-none transition-all duration-150
										bg-[var(--light-bg-register)]
										text-[var(--light-text)]
										${
											digit
												? "border-[var(--light-accent)] text-[var(--light-accent)]"
												: "border-transparent"
										}
										focus:border-[var(--light-accent)]
										disabled:opacity-50 disabled:cursor-not-allowed
										caret-transparent
									`}
								/>
							))}
						</div>

						{/* Botón submit */}
						<Button
							type="submit"
							className="w-full font-['Poppins'] font-light"
							isLoading={isLoading}
						>
							Verificar Mail
						</Button>
					</form>

					{/* Footer */}
					<div className="mt-8 pt-6 text-center h-[67px] bg-[var(--light-bg-register)] -mx-8 -mb-8 rounded-b-2xl">
						<p className="text-[16px]">
							¿No recibiste el código?{" "}
							<button
								type="button"
								onClick={handleResend}
								disabled={isLoading}
								className="underline disabled:opacity-50"
							>
								REENVIAR
							</button>
						</p>
					</div>
				</div>

				<p className="p-2 text-center text-[var(--light-copyright)]">
					© 2026 Hoster. Todos los derechos reservados
				</p>
			</div>
		</div>
	);
};

export default ConfirmAccount;
