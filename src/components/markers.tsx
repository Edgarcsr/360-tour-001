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
				<div class="relative flex items-center justify-center" style="width: ${main}px; height: ${main}px;">
					   <div
						   class="absolute rounded-full border opacity-50"
						   style="width: ${main - 2 * borderSize}px; height: ${main - 2 * borderSize}px; border-width: ${borderSize}px; border-color: #fff; animation: grow-fade 1.6s infinite; background: transparent;"
					   ></div>
					   <div
						   class="relative rounded-full shadow-lg"
						   style="width: ${main}px; height: ${main}px; background-color: #fff;"
					   ></div>
				</div>
			`,
	};
};

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
