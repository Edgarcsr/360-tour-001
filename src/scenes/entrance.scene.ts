import { DoorClosed } from "lucide-react";
import { createAnimatedCircleMarker } from "@/components/markers";
import type { Scene } from "./types";

export const entranceScene: Scene = {
	id: "entrance",
	name: "Entrada",
	panorama: `${import.meta.env.BASE_URL}IMG_20251016_121045_00_006.webp`,
	icon: DoorClosed,
	markers: [
		createAnimatedCircleMarker({
			id: "hallway",
			position: { yaw: "95.2deg", pitch: "-3.3deg" },
			tooltip: "Ir para o corredor",
		}),
		createAnimatedCircleMarker({
			id: "livingRoom",
			position: { yaw: "134.3deg", pitch: "-18.2deg" },
			tooltip: "Ir para a sala de estar",
			tilted: true,
		}),
		createAnimatedCircleMarker({
			id: "kitchen",
			position: { yaw: "169.3deg", pitch: "-18.7deg" },
			tooltip: "Ir para a cozinha",
			tilted: true,
		}),
	],
	callouts: [],
	lensflares: [],
};
