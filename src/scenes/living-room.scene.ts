import { Tv } from "lucide-react";
import { createAnimatedCircleMarker } from "@/components/markers";
import type { Scene } from "./types";

export const livingRoomScene: Scene = {
	id: "livingRoom",
	name: "Sala de Estar",
	panorama: `${import.meta.env.BASE_URL}IMG_20251016_121219_00_010.webp`,
	icon: Tv,
	markers: [
		createAnimatedCircleMarker({
			id: "hallway",
			position: { yaw: "14.4deg", pitch: "-26.2deg" },
			tooltip: "Ir para o corredor",
			tilted: true,
		}),
		createAnimatedCircleMarker({
			id: "entrance",
			position: { yaw: "321.7deg", pitch: "-16.8deg" },
			tooltip: "Ir para a entrada",
			tilted: true,
		}),
		createAnimatedCircleMarker({
			id: "balcony",
			position: { yaw: "179.6deg", pitch: "-32.0deg" },
			tooltip: "Ir para a varanda",
			tilted: true,
		}),
	],
	callouts: [],
	lensflares: [],
};
