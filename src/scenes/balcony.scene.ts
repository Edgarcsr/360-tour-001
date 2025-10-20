import { SproutIcon } from "lucide-react";
import type { Scene } from "./types";
import { createAnimatedCircleMarker } from "@/components/markers";

export const balconyScene: Scene = {
	id: "balcony",
	name: "Varanda",
	panorama: "IMG_20251016_121255_00_011.JPG",
	icon: SproutIcon,
	markers: [
		createAnimatedCircleMarker({
			id: "livingRoom",
			position: { yaw: "0deg", pitch: "0deg" },
			tooltip: "Ir para a sala de estar",
		}),
	],
	callouts: [],
	lensflares: [],
};
