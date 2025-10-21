import { ToiletIcon } from "lucide-react";
import { createAnimatedCircleMarker } from "@/components/markers";
import type { Scene } from "./types";

export const bathroomScene: Scene = {
	id: "bathroom",
	name: "Banheiro",
	panorama: `${import.meta.env.BASE_URL}IMG_20251016_120645_00_003.webp`,
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
