import React from "react";
import { ChevronDown } from "lucide-react";

type Option =
	| string
	| {
			label: string;
			value: string | number;
	  };

type Props = {
	options: Option[];
	className?: string;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

const inputBase =
	"w-full bg-[var(--light-main2)] border border-transparent rounded-lg px-3 py-2 text-[14px] text-[var(--light-text)] focus:border-[var(--light-accent)] focus:ring-2 focus:ring-[color-mix(in_srgb,var(--light-accent)_25%,transparent)] outline-none transition-all placeholder:text-[var(--light-placeholder)]";

export const SelectField: React.FC<Props> = ({
	options,
	className = "",
	...props
}) => {
	return (
		<div className="relative w-full">
			<select
				{...props}
				className={`${inputBase} appearance-none cursor-pointer pr-9 w-full ${className}`}
			>
				{options.map((opt, i) => {
					const value =
						typeof opt === "object" ? opt.value : opt;

					const label =
						typeof opt === "object" ? opt.label : opt;

					return (
						<option
							key={i}
							value={label === "Seleccionar" ? "" : value}
						>
							{label}
						</option>
					);
				})}
			</select>

			<ChevronDown
				size={16}
				className="absolute right-3 top-1/2 -translate-y-1/2 text-(--light-text) opacity-60 pointer-events-none"
			/>
		</div>
	);
};