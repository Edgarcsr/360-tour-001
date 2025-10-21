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
			position: { yaw: "148.6deg", pitch: "-8.2deg" },
			tooltip: "Ir para o corredor",
		}),
		createAnimatedCircleMarker({
			id: "suiteBathroom",
			position: { yaw: "163.4deg", pitch: "-7.7deg" },
			tooltip: "Ir para o banheiro da suíte",
		}),
	],
	callouts: [],
	lensflares: [],
};
