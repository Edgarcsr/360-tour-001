import { HouseIcon } from "lucide-react";
import { createCallout } from "../components/callouts";
import type { Scene } from "./types";

export const houseScene: Scene = {
	id: "house",
	name: "Casa da praia",
	panorama: "key-biscayne-5.jpg",
	icon: HouseIcon,
	markers: [],
	callouts: [
		createCallout({
			id: "house-callout-1",
			position: { yaw: "234.1deg", pitch: "34deg" },
			text: "Farol do Cabo Flórida",
			direction: "left",
			size: 4,
		}),
		createCallout({
			id: "house-callout-2",
			position: { yaw: "16.4deg", pitch: "12.6deg" },
			text: "Coqueiro",
			direction: "SW",
			size: 8,
		}),
		createCallout({
			id: "house-callout-3",
			position: { yaw: "158.7deg", pitch: "19.1deg" },
			text: "Chaminé",
			direction: "up",
			size: 6,
		}),
	],
	lensflares: [
		{
			id: "sun",
			position: { yaw: "333.4deg", pitch: "36deg" },
			type: 2,
		},
	],
};
