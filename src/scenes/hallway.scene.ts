import { MapPin } from "lucide-react";
import type { Scene } from "./types";
import { createAnimatedCircleMarker } from "@/components/markers";

export const hallwayScene: Scene = {
	id: "hallway",
	name: "Corredor",
	panorama: "IMG_20251016_120911_00_004.webp",
	icon: MapPin,
	markers: [
		createAnimatedCircleMarker({
			id: "bathroom",
			position: { yaw: "269.4deg", pitch: "-11.8deg" },
			tooltip: "Ir para o banheiro",
		}),
		createAnimatedCircleMarker({
			id: "kidsBedroom",
			position: { yaw: "45.2deg", pitch: "-10.5deg" },
			tooltip: "Ir para o quarto das crianças",
		}),
		createAnimatedCircleMarker({
			id: "suite",
			position: { yaw: "0.0deg", pitch: "-5.8deg" },
			tooltip: "Ir para a suíte",
		}),
		createAnimatedCircleMarker({
			id: "livingRoom",
			position: { yaw: "153.8deg", pitch: "-5.8deg" },
			tooltip: "Ir para a sala de estar",
		}),
	],
	callouts: [],
	lensflares: [],
};
