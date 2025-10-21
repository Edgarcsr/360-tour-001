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
			position: { yaw: "261.6deg", pitch: "-8.5deg" },
			tooltip: "Ir para a suíte",
		}),
		createAnimatedCircleMarker({
			id: "hallway",
			position: { yaw: "290.3deg", pitch: "-8.0deg" },
			tooltip: "Ir para o corredor",
		}),
	],
	callouts: [],
	lensflares: [],
};
