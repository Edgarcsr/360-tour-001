// Tipos para os markers
export interface MarkerButton {
	id: string;
	position: { yaw: string; pitch: string };
	image?: string;
	tooltip?: string;
	href?: string;
	size?: { width: number; height: number };
	anchor?: string;
	html?: string;
}

// Função para criar um marker de botão (imagem)
export const createButtonMarker = ({
	id,
	position,
	image,
	tooltip,
	href,
	size = { width: 64, height: 64 },
	anchor = "center",
}: MarkerButton) => ({
	id,
	position,
	image,
	anchor,
	size,
	tooltip,
	data: { link: href },
});

// Função para criar um marker animado (círculo com animação)
export const createAnimatedCircleMarker = ({
	id,
	position,
	tooltip,
	href,
	size = { width: 32, height: 32 },
	anchor = "center",
	borderSize = 3,
}: Omit<MarkerButton, "image" | "html"> & { borderSize?: number }) => {
	const main = Math.min(size.width, size.height);
	return {
		id,
		position,
		anchor,
		size,
		tooltip,
		data: { link: href },
		html: `
			<style>
				@keyframes grow-fade {
					0% { transform: scale(1); opacity: 0.6; }
					70% { transform: scale(2.2); opacity: 0; }
					100% { transform: scale(2.2); opacity: 0; }
				}
			</style>
			<div style="position: relative; width: ${main}px; height: ${main}px; display: flex; align-items: center; justify-content: center;">
				<div style="position: absolute; width: ${main - 2 * borderSize}px; height: ${main - 2 * borderSize}px; border-radius: 50%; border: ${borderSize}px solid #fff; background: transparent; opacity: 0.5; animation: grow-fade 1.6s infinite;"></div>
				<div style="position: relative; width: ${main}px; height: ${main}px; border-radius: 50%; background: #fff; box-shadow: 0 2px 8px rgba(0,0,0,0.18);"></div>
			</div>
		`,
	};
};

// Função para adicionar eventos de clique aos markers
export const setupMarkerEvents = (
	markersPlugin: any,
	markers: MarkerButton[],
) => {
	markersPlugin.addEventListener("select-marker", (e: any) => {
		const marker = markers.find((m) => m.id === e.marker.id);
		if (marker?.href) {
			window.open(marker.href, "_self");
		}
	});
};
