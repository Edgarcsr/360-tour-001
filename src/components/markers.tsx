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
	tilted,
}: Omit<MarkerButton, "image" | "html"> & {
	borderSize?: number;
	tilted?: true;
}) => {
	const main = Math.min(size.width, size.height);
	const tiltTransform = tilted ? "perspective(100px) rotateX(60deg)" : "";
	const containerStyle = tilted
		? `width: ${main}px; height: ${main}px; transform: ${tiltTransform}; transform-style: preserve-3d;`
		: `width: ${main}px; height: ${main}px;`;

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
					${
						tilted
							? `
					@keyframes grow-fade-tilted {
						0% { transform: scale(1); opacity: 0.6; }
						70% { transform: scale(2.2); opacity: 0; }
						100% { transform: scale(2.2); opacity: 0; }
					}
					`
							: ""
					}
				</style>
				<div class="relative flex items-center justify-center" style="${containerStyle}">
					   <div
						   class="absolute rounded-full border opacity-50"
						   style="width: ${main - 2 * borderSize}px; height: ${main - 2 * borderSize}px; border-width: ${borderSize}px; border-color: #fff; animation: ${tilted ? "grow-fade-tilted" : "grow-fade"} 1.6s infinite; background: transparent; box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);"
					   ></div>
					   <div
						   class="relative rounded-full"
						   style="width: ${main}px; height: ${main}px; background-color: #fff; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4), 0 2px 6px rgba(0, 0, 0, 0.3);"
					   ></div>
				</div>
			`,
	};
};

import type { Scene } from "@/scenes";
import { scenes as defaultScenes } from "@/scenes";
import type { PhotoSphereViewerRef } from "./PhotoSphereViewer";

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
			if (
				viewerRef?.current &&
				typeof viewerRef.current.setScene === "function"
			) {
				try {
					viewerRef.current.setScene(targetScene, {
						speed: 1000,
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
