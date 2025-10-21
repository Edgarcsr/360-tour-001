import { ToiletIcon } from "lucide-react";
import type { Scene } from "./types";
import { createAnimatedCircleMarker } from "@/components/markers";

export const bathroomScene: Scene = {
	id: "bathroom",
	name: "Banheiro",
	panorama: "IMG_20251016_120645_00_003.webp",
	icon: ToiletIcon,
	markers: [
		createAnimatedCircleMarker({
			id: "hallway",
			position: { yaw: "98.5deg", pitch: "-14.4deg" },
			tooltip: "Ir para o corredor",
		}),
	],
	callouts: [],
	lensflares: [],
};
