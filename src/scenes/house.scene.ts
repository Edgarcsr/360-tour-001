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
			position: { yaw: "45deg", pitch: "10deg" },
			text: "Vista do topo",
			direction: "left",
			size: 4,
		}),
		createCallout({
			id: "house-callout-2",
			position: { yaw: "-90deg", pitch: "5deg" },
			text: "Horizonte da cidade",
			direction: "right",
			size: 8,
		}),
		createCallout({
			id: "house-callout-3",
			position: { yaw: "180deg", pitch: "-20deg" },
			text: "Vista panorâmica",
			direction: "up",
			size: 6,
		}),
	],
	lensflares: [],
};
