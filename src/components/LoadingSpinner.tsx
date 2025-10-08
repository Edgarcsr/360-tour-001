import type React from "react";

interface LoadingSpinnerProps {
	size?: "sm" | "md" | "lg";
	color?: string;
	text?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
	size = "md",
	color = "white", // Mudando para branco por padrão
	text = "Carregando...",
}) => {
	const sizeClasses = {
		sm: "w-8 h-8",
		md: "w-12 h-12",
		lg: "w-16 h-16",
	};

	return (
		<div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
			<div className="flex flex-col items-center gap-4">
				{/* Spinner animado */}
				<div className={`${sizeClasses[size]} relative`}>
					<div className="absolute inset-0 border-4 border-gray-300/30 rounded-full" />
					<div
						className="absolute inset-0 border-4 border-transparent rounded-full animate-spin"
						style={{
							borderTopColor: color,
							borderRightColor: color,
						}}
					/>
				</div>

				{/* Texto de loading */}
				{text && (
					<p className="text-sm font-medium drop-shadow-lg" style={{ color }}>
						{text}
					</p>
				)}
			</div>
		</div>
	);
};

// Versão inline para ser usada como loadingImg
export const createLoadingHTML = (color = "#fff", text = "Carregando...") => {
	return `
    <div style="
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
    ">
      <div style="
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 16px;
      ">
        <div style="
          width: 48px;
          height: 48px;
          position: relative;
        ">
          <div style="
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            border: 4px solid #4a5568;
            border-radius: 50%;
          "></div>
          <div style="
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            border: 4px solid transparent;
            border-top-color: ${color};
            border-right-color: ${color};
            border-radius: 50%;
            animation: spin 1s linear infinite;
          "></div>
        </div>
        <p style="
          color: ${color};
          font-size: 14px;
          font-weight: 500;
          margin: 0;
        ">${text}</p>
      </div>
    </div>
    <style>
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    </style>
  `;
};
