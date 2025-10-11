import { VolleyballIcon } from "lucide-react";
import { createCallout } from "../components/callouts";
import { createAnimatedCircleMarker } from "../components/markers";
import type { Scene } from "./types";

export const beachScene: Scene = {
	id: "beach",
	name: "Praia",
	panorama: "key-biscayne-4.jpg",
	icon: VolleyballIcon,
	markers: [
		createAnimatedCircleMarker({
			id: "house",
			position: { yaw: "218.5deg", pitch: "-7deg" },
			tooltip: "Entrar na casa",
			href: "/algum-lugar",
		}),
	],
	callouts: [
		createCallout({
			id: "callout-1",
			position: { yaw: "-47.2deg", pitch: "40.4deg" },
			text: "Farol do Cabo Flórida",
			direction: "right",
			size: 2,
		}),
		createCallout({
			id: "callout-2",
			position: { yaw: "205.1deg", pitch: "-6.9deg" },
			text: "Quintal da casa",
			direction: "NW",
			size: 6,
		}),
		createCallout({
			id: "callout-3",
			position: { yaw: "220deg", pitch: "5deg" },
			text: "Casa da Praia",
			direction: "up",
			size: 2,
		}),
	],
	lensflares: [
		{
			id: "sun",
			position: { yaw: "90deg", pitch: "35deg" },
			type: 2,
		},
	],
};
