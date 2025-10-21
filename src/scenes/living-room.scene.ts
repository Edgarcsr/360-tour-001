import { Tv } from "lucide-react";
import type { Scene } from "./types";
import { createAnimatedCircleMarker } from "@/components/markers";

export const livingRoomScene: Scene = {
	id: "livingRoom",
	name: "Sala de Estar",
	panorama: "IMG_20251016_121219_00_010.webp",
	icon: Tv,
	markers: [
		createAnimatedCircleMarker({
			id: "hallway",
			position: { yaw: "19.4deg", pitch: "-5.7deg" },
			tooltip: "Ir para o corredor",
		}),
		createAnimatedCircleMarker({
			id: "entrance",
			position: { yaw: "324.3deg", pitch: "-3.1deg" },
			tooltip: "Ir para a entrada",
		}),
		createAnimatedCircleMarker({
			id: "balcony",
			position: { yaw: "180.2deg", pitch: "-8.2deg" },
			tooltip: "Ir para a varanda",
		}),
	],
	callouts: [],
	lensflares: [],
};
