import { MapPin } from "lucide-react";
import { createAnimatedCircleMarker } from "@/components/markers";
import type { Scene } from "./types";

export const hallwayScene: Scene = {
	id: "hallway",
	name: "Corredor",
	panorama: `${import.meta.env.BASE_URL}IMG_20251016_120911_00_004.webp`,
	icon: MapPin,
	markers: [
		createAnimatedCircleMarker({
			id: "bathroom",
			position: { yaw: "271.7deg", pitch: "-49.4deg" },
			tooltip: "Ir para o banheiro",
			tilted: true,
		}),
		createAnimatedCircleMarker({
			id: "kidsBedroom",
			position: { yaw: "53.2deg", pitch: "-37.7deg" },
			tooltip: "Ir para o quarto das crianças",
			tilted: true,
		}),
		createAnimatedCircleMarker({
			id: "suite",
			position: { yaw: "359.7deg", pitch: "-29.0deg" },
			tooltip: "Ir para a suíte",
			tilted: true,
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
