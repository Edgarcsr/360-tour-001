import { BedDouble } from "lucide-react";
import { createAnimatedCircleMarker } from "@/components/markers";
import type { Scene } from "./types";

export const suiteScene: Scene = {
	id: "suite",
	name: "Suíte Casal",
	panorama: `${import.meta.env.BASE_URL}IMG_20251016_121750_00_013.webp`,
	icon: BedDouble,
	markers: [
		createAnimatedCircleMarker({
			id: "hallway",
			position: { yaw: "145.9deg", pitch: "-28.2deg" },
			tooltip: "Ir para o corredor",
			tilted: true,
		}),
		createAnimatedCircleMarker({
			id: "suiteBathroom",
			position: { yaw: "162.6deg", pitch: "-24.6deg" },
			tooltip: "Ir para o banheiro da suíte",
			tilted: true,
		}),
	],
	callouts: [],
	lensflares: [],
};
