import { UtensilsCrossed } from "lucide-react";
import { createAnimatedCircleMarker } from "@/components/markers";
import type { Scene } from "./types";

export const kitchenScene: Scene = {
	id: "kitchen",
	name: "Cozinha",
	panorama: `${import.meta.env.BASE_URL}IMG_20251016_121129_00_008.webp`,
	icon: UtensilsCrossed,
	markers: [
		createAnimatedCircleMarker({
			id: "entrance",
			position: { yaw: "271.3deg", pitch: "-2.3deg" },
			tooltip: "Ir para a entrada",
		}),
	],
	callouts: [],
	lensflares: [],
};
