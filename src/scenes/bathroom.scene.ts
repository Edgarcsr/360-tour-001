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
			position: { yaw: "95.4deg", pitch: "-51.1deg" },
			tooltip: "Ir para o corredor",
			tilted: true,
		}),
		createAnimatedCircleMarker({
			id: "kidsBedroom",
			position: { yaw: "74.4deg", pitch: "-28.4deg" },
			tooltip: "Ir para o quarto das crianças",
			tilted: true,
		}),
	],
	callouts: [],
	lensflares: [],
};
