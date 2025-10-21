import { ShowerHead } from "lucide-react";
import { createAnimatedCircleMarker } from "@/components/markers";
import type { Scene } from "./types";

export const suiteBathroomScene: Scene = {
	id: "suiteBathroom",
	name: "Banheiro da Suíte",
	panorama: `${import.meta.env.BASE_URL}IMG_20251016_122030_00_014.webp`,
	icon: ShowerHead,
	markers: [
		createAnimatedCircleMarker({
			id: "suite",
			position: { yaw: "254.1deg", pitch: "-12.8deg" },
			tooltip: "Ir para a suíte",
			tilted: true,
		}),
		createAnimatedCircleMarker({
			id: "hallway",
			position: { yaw: "288.8deg", pitch: "-43.9deg" },
			tooltip: "Ir para o corredor",
			tilted: true,
		}),
	],
	callouts: [],
	lensflares: [],
};
