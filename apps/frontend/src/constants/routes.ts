export const ROUTES = {
	LOGIN: "/login",
	REGISTER: "/create-account",
	CONFIRMACCOUNT: "/confirm-account",
	DASHBOARD: "/dashboard",
	HOME: "/",
} as const;

export const API_ENDPOINTS = {
	BASE: import.meta.env.VITE_API_URL,
	AUTH: {
		LOGIN: "/auth/login",
		REGISTER: "/auth/create-account",
	},
	UNITS: {
		GET_ALL: "/unit/get-units",
		UPDATE: (id: number) => `/unit/update-unit/${id}`,
		CREATE: "/unit/create-unit",
	},
	HEALTH: "/health",
} as const;

export const STORAGE_KEYS = {
	USER: "example_user",
	TOKEN: "example_token",
} as const;
