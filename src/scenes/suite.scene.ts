import { BedDouble } from "lucide-react";
import type { Scene } from "./types";
import { createAnimatedCircleMarker } from "@/components/markers";

export const suiteScene: Scene = {
	id: "suite",
	name: "Suíte Casal",
	panorama: "IMG_20251016_121750_00_013.JPG",
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
