import { Baby } from "lucide-react";
import type { Scene } from "./types";
import { createAnimatedCircleMarker } from "@/components/markers";

export const kidsBedroomScene: Scene = {
	id: "kidsBedroom",
	name: "Quarto das Crianças",
	panorama: "IMG_20251016_120936_00_005(2).webp",
	icon: Baby,
	markers: [
		createAnimatedCircleMarker({
			id: "hallway",
			position: { yaw: "176.6deg", pitch: "-9.4deg" },
			tooltip: "Ir para o corredor",
		}),
	],
	callouts: [],
	lensflares: [],
};
