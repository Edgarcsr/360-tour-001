import { SproutIcon } from "lucide-react";
import { createAnimatedCircleMarker } from "@/components/markers";
import type { Scene } from "./types";

export const balconyScene: Scene = {
	id: "balcony",
	name: "Varanda",
	panorama: `${import.meta.env.BASE_URL}IMG_20251016_121255_00_011.webp`,
	icon: SproutIcon,
	markers: [
		createAnimatedCircleMarker({
			id: "livingRoom",
			position: { yaw: "1.7deg", pitch: "-26.1deg" },
			tooltip: "Ir para a sala de estar",
			tilted: true,
		}),
	],
	callouts: [],
	lensflares: [],
};
