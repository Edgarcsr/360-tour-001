import { Baby } from "lucide-react";
import { createAnimatedCircleMarker } from "@/components/markers";
import type { Scene } from "./types";

export const kidsBedroomScene: Scene = {
	id: "kidsBedroom",
	name: "Quarto das Crianças",
	panorama: `${import.meta.env.BASE_URL}IMG_20251016_120936_00_005(2).webp`,
	icon: Baby,
	markers: [
		createAnimatedCircleMarker({
			id: "hallway",
			position: { yaw: "176.9deg", pitch: "-37.5deg" },
			tooltip: "Ir para o corredor",
			tilted: true,
		}),
		createAnimatedCircleMarker({
			id: "bathroom",
			position: { yaw: "164.8deg", pitch: "-25.1deg" },
			tooltip: "Ir para o banheiro",
			tilted: true,
		}),
	],
	callouts: [],
	lensflares: [],
};
