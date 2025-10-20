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

import type { PhotoSphereViewerRef } from "./PhotoSphereViewer";
import { scenes as defaultScenes } from "@/scenes";
import type { Scene } from "@/scenes";

export const setupMarkerEvents = (
	markersPlugin: any,
	markers: MarkerButton[],
	viewerRef?: React.RefObject<PhotoSphereViewerRef | null>,
	onSceneChange?: (scene: Scene) => void,
	onMarkerClick?: (markerId: string) => void,
	scenesList: Scene[] = defaultScenes,
) => {
	markersPlugin.addEventListener("select-marker", (e: any) => {
		const marker = markers.find((m) => m.id === e.marker.id);

		// If the marker has an href, preserve original behaviour
		if (marker?.href) {
			window.open(marker.href, "_self");
			return;
		}

		// Try to find a scene that matches the marker id (convention used in scenes)
		const targetScene = scenesList.find((s) => s.id === e.marker.id);
		if (targetScene) {
			// Mirror the menu behaviour when the forwarded ref exposes setScene.
			let didPerformSceneChange = false;
			if (viewerRef?.current && typeof viewerRef.current.setScene === "function") {
				try {
					viewerRef.current.setScene(targetScene, {
						speed: 2000,
						rotation: true,
						effect: "fade",
					});
					didPerformSceneChange = true;
				} catch (err) {
					// ignore failures from user-provided setScene
					didPerformSceneChange = false;
				}
			}

			// Notify caller so they can keep React state in sync
			onSceneChange?.(targetScene);

			// Only call onMarkerClick if we didn't already perform the scene change ourselves.
			// This prevents the host app (which may call viewerRef.setScene from its marker handler)
			// from issuing a duplicate transition.
			if (!didPerformSceneChange) {
				onMarkerClick?.(targetScene.id);
			}

			return;
		}

		// Fallback: notify that a marker was clicked
		if (e?.marker?.id) {
			onMarkerClick?.(e.marker.id);
		}
	});
};
