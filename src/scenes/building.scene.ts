import { BuildingIcon } from "lucide-react";
import { createCallout } from "../components/callouts";
import type { Scene } from "./types";

export const buildingScene: Scene = {
	id: "building",
	name: "Top Building View",
	panorama: "top-building.jpg",
	icon: BuildingIcon,
	markers: [],
	callouts: [
		createCallout({
			id: "building-callout-1",
			position: { yaw: "45deg", pitch: "10deg" },
			text: "Vista do topo",
			direction: "left",
			size: 4,
		}),
		createCallout({
			id: "building-callout-2",
			position: { yaw: "-90deg", pitch: "5deg" },
			text: "Horizonte da cidade",
			direction: "right",
			size: 8,
		}),
		createCallout({
			id: "building-callout-3",
			position: { yaw: "180deg", pitch: "-20deg" },
			text: "Vista panorâmica",
			direction: "up",
			size: 6,
		}),
	],
	lensflares: [],
};
