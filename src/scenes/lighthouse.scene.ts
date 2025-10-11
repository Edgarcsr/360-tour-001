import { TowerControlIcon } from "lucide-react";
import { createCallout } from "@/components/callouts";
import type { Scene } from "./types";

export const lighthouseScene: Scene = {
	id: "lighthouse",
	name: "Farol",
	icon: TowerControlIcon,
	panorama: "key-biscayne-3.jpg",
	markers: [],
	callouts: [
		createCallout({
			id: "house-callout-1",
			position: { yaw: "338.5deg", pitch: "-5.6deg" },
			text: "Entrada",
			direction: "up",
			size: 4,
		}),
	],
	lensflares: [
		{
			id: "sun",
			position: { yaw: "201deg", pitch: "39deg" },
			type: 2,
		},
	],
};
