const inputBase = "w-full bg-[var(--light-main2)] border border-transparent rounded-lg px-3 py-2 text-[14px]";

export const InputField = (
  props: React.InputHTMLAttributes<HTMLInputElement>
) => {
  return <input {...props} className={`${inputBase} ${props.className || ""}`} />;
};