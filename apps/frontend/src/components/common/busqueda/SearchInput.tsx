import React from "react";
import { Search } from "lucide-react";

type Props = {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
};

const SearchInput: React.FC<Props> = ({
  value,
  onChange,
  placeholder = "Buscar...",
  className = "",
}) => {
  return (
    <div className={`relative w-[442px] ${className}`}>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="
          w-full h-[44px]
          rounded-lg
          bg-[var(--light-main2)]
          pl-4 pr-12
          font-poppins text-[16px]
          text-[var(--light-text)]
          placeholder:text-[var(--light-placeholder)]
          outline-none
          border border-transparent
          focus:border-[var(--light-accent)]
          focus:ring-2 focus:ring-[color-mix(in_srgb,var(--light-accent)_25%,transparent)]
          transition
        "
      />

      <Search
        size={18}
        className="
          absolute right-4 top-1/2 -translate-y-1/2
          text-[var(--light-text)] opacity-70
          pointer-events-none
        "
      />
    </div>
  );
};

export default SearchInput;