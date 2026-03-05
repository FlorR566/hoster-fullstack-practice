import { ArrowLeft, ArrowRight } from "lucide-react";

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

export const Pagination = ({
	currentPage,
	totalPages,
	onPageChange,
}: PaginationProps) => {
	// Lógica para generar los números (1, 2, ..., 10)
	const getPageNumbers = () => {
		const pages = [];
		for (let i = 1; i <= totalPages; i++) {
			if (
				i === 1 ||
				i === totalPages ||
				(i >= currentPage - 1 && i <= currentPage + 1)
			) {
				pages.push(i);
			} else if (pages[pages.length - 1] !== "...") {
				pages.push("...");
			}
		}
		return pages;
	};

	return (
		<div className="flex items-center justify-center gap-2 mt-6 text-[15px] font-['Poppins']">
			<button
				onClick={() => onPageChange(Math.max(1, currentPage - 1))}
				disabled={currentPage === 1}
				className="flex items-center gap-1 text-[var(--light-text)] hover:opacity-70 disabled:opacity-30 transition cursor-pointer disabled:cursor-not-allowed"
			>
				<ArrowLeft size={15} /> Previous
			</button>

			{getPageNumbers().map((page, i) =>
				page === "..." ? (
					<span key={`dots-${i}`} className="text-[var(--light-text)] px-1">
						. . .
					</span>
				) : (
					<button
						key={page}
						onClick={() => onPageChange(Number(page))}
						className={`w-7 h-7 rounded-md  transition cursor-pointer ${
							currentPage === page
								? "bg-[var(--light-accent)] text-[var(--icono-navbar-selected)]"
								: "text-[var(--light-text)] hover:bg-[var(--light-main2)]"
						}`}
					>
						{page}
					</button>
				),
			)}

			<button
				onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
				disabled={currentPage === totalPages}
				className="flex items-center gap-1 text-[var(--light-text)] hover:opacity-70 disabled:opacity-30 transition cursor-pointer disabled:cursor-not-allowed"
			>
				Next <ArrowRight size={15} />
			</button>
		</div>
	);
};
