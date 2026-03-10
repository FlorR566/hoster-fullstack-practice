import { User } from "../types";
import { API_ENDPOINTS } from "../constants/routes";

interface AuthResponse {
	user: User;
	token?: string;
	message: string;
}

export const api = {
	// REGISTRO
	async register(data: any): Promise<AuthResponse> {
		const response = await fetch(
			"http://localhost:5000/api/auth/create-account",
			//  `${API_ENDPOINTS.BASE}${API_ENDPOINTS.AUTH.REGISTER}`,
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			},
		);
		const result = await response.json();
		if (!response.ok) {
			throw new Error(result.error || "Registration failed");
		}
		return result;
	},

	// VERIFICACION MAIL
	async confirmAccount(data: any): Promise<AuthResponse> {
		const response = await fetch(
			"http://localhost:5000/api/auth/confirm-account",
			//  `${API_ENDPOINTS.BASE}${API_ENDPOINTS.AUTH.CONFIRMACCOUNT}`,

			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			},
		);

		const result = await response.json();
		if (!response.ok) {
			throw new Error(result.error || "Token no valido");
		}
		return result;
	},

	// LOGIN
	async login(data: any): Promise<string> {
		const response = await fetch(
			"http://localhost:5000/api/auth/login",
			//  `${API_ENDPOINTS.BASE}${API_ENDPOINTS.AUTH.LOGIN}`,
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			},
		);

		const result = await response.json();
		if (!response.ok) {
			throw new Error(result.error || "Login failed");
		}
		return result;
	},

	// GET USER
	async getUser(token: string): Promise<User> {
		const response = await fetch(
			"http://localhost:5000/api/auth/user",
			// `${API_ENDPOINTS.BASE}${API_ENDPOINTS.AUTH.GETUSER}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			},
		);
		const result = await response.json();
		if (!response.ok) {
			throw new Error(result.error || "Failed to get user");
		}
		return result;
	},

	async checkHealth(): Promise<boolean> {
		try {
			const response = await fetch(
				`${API_ENDPOINTS.BASE}${API_ENDPOINTS.HEALTH}`,
			);
			return response.ok;
		} catch {
			return false;
		}
	},
};
