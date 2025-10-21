import type React from "react";

interface LoadingBarProps {
	color?: string;
	height?: number;
}

export const LoadingBar: React.FC<LoadingBarProps> = ({
	color = "white",
	height = 4,
}) => {
	return (
		<div
			className="fixed bottom-0 left-0 right-0 z-50 overflow-hidden"
			style={{ height: `${height}px` }}
		>
			<div
				className="h-full animate-loading-bar"
				style={{
					background: `linear-gradient(90deg, transparent 0%, ${color} 50%, transparent 100%)`,
					width: "50%",
				}}
			/>
		</div>
	);
};

// Versão inline para ser usada como loadingImg
export const createLoadingBarHTML = (color = "#fff", height = 4) => {
	return `
    <div style="
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      height: ${height}px;
      z-index: 9999;
      overflow: hidden;
    ">
      <div style="
        height: 100%;
        background: linear-gradient(90deg, transparent 0%, ${color} 50%, transparent 100%);
        width: 50%;
        animation: loading-bar 1.5s ease-in-out infinite;
      "></div>
    </div>
    <style>
      @keyframes loading-bar {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(300%); }
      }
    </style>
  `;
};
