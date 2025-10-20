import { DoorClosed } from "lucide-react";
import type { Scene } from "./types";
import { createAnimatedCircleMarker } from "@/components/markers";

export const entranceScene: Scene = {
	id: "entrance",
	name: "Entrada",
	panorama: "IMG_20251016_121045_00_006.JPG",
	icon: DoorClosed,
	markers: [
		createAnimatedCircleMarker({
			id: "hallway",
			position: { yaw: "95.2deg", pitch: "-3.3deg" },
			tooltip: "Ir para o corredor",
		}),
		createAnimatedCircleMarker({
			id: "livingRoom",
			position: { yaw: "134.6deg", pitch: "-4.8deg" },
			tooltip: "Ir para a sala de estar",
		}),
		createAnimatedCircleMarker({
			id: "kitchen",
			position: { yaw: "168.4deg", pitch: "-4.8deg" },
			tooltip: "Ir para a cozinha",
		}),
	],
	callouts: [],
	lensflares: [],
};
