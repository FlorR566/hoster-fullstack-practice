export const ROUTES = {
	LOGIN: "/login",
	REGISTER: "/create-account",
	CONFIRMACCOUNT: "/confirm-account",
	DASHBOARD: "/dashboard",
	HOME: "/",
} as const;

export const API_ENDPOINTS = {
	BASE: import.meta.env.VITE_API_BASE_URL,
	AUTH: {
		LOGIN: "/auth/login",
		REGISTER: "/auth/create-account",
		CONFIRMACCOUNT: "/auth/confirm-account",
		GETUSER: "/auth/user",
	},
	HEALTH: "/health",
} as const;

export const STORAGE_KEYS = {
	USER: "example_user",
	TOKEN: "example_token",
} as const;
