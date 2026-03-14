import React, { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	error?: string;
	icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
	label,
	error,
	icon,
	className = "",
	type,
	...props
}) => {
	const [showPassword, setShowPassword] = useState(false);

	const isPassword = type === "password";
	const inputType = isPassword ? (showPassword ? "text" : "password") : type;

	return (
		<div className="flex flex-col gap-1.5 w-full">
			{label && (
				<label className=" text-[var(--light-text)] ml-1">{label}</label>
			)}
			<div className="relative group">
				{icon && !isPassword && (
					<div
						className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--light-text)] 
          group-focus-within:text-indigo-400 transition-colors"
					>
						{icon}
					</div>
				)}

				{/* TOGGLE PASSWORD */}
				{isPassword && (
					<button
						type="button"
						onClick={() => setShowPassword((prev) => !prev)}
						className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--light-text)]
            group-focus-within:text-indigo-400 transition-colors"
					>
						{showPassword ? (
							<Eye size={20} strokeWidth={1.5} />
						) : (
							<EyeClosed size={20} strokeWidth={1.5} />
						)}
					</button>
				)}

				<input
					type={inputType}
					className={`
            w-full bg-[var(--light-input)] rounded-lg px-3 py-2.5 
            text-[var(--light-text)] placeholder:[var(--light-placeholder)]
            focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500
            transition-all duration-200
            ${error ? "border-red-500 focus:ring-red-500/50 focus:border-red-500" : ""}
            ${className}
          `}
					{...props}
				/>
			</div>
			{error && <p className="text-xs text-red-500 mt-0.5 ml-1">{error}</p>}
		</div>
	);
};
