import React from "react";
import { useNavigate } from "react-router-dom";

type Props = {
    to: string;
    label: string;
    icon?: React.ReactNode;
    disabled?: boolean;
    className?: string;
    onClick?: () => void;
};

const base =
    "inline-flex items-center gap-2 px-4 py-2 font-poppins text-sm font-medium transition " +
    "h-[50px] px-4 font-poppins text-[16px] font-normal " +
    "rounded-full bg-[#D4D4D4] text-[#050534] " +
    "hover:bg-[#cfcfcf] " +
    "focus:outline-none focus:ring-2 focus:ring-[#050534]/30";

const NavActionButton: React.FC<Props> = ({
    to,
    label,
    icon,
    disabled,
    className = "",
    onClick,
}) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (disabled) return;
        onClick?.();
        navigate(to);
    };

    return (
        <button
            type="button"
            onClick={handleClick}
            disabled={disabled}
            className={`${base} ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
        >
            {icon}
            <span>{label}</span>
        </button>
    );
};

export default NavActionButton;
