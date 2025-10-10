import type { ComponentType, ReactNode } from "react";

export interface Position {
	yaw: string;
	pitch: string;
}

export interface Marker {
	id: string;
	position: Position;
	tooltip?: string;
	href?: string;
	[key: string]: unknown;
}

export interface Callout {
	id: string;
	position: Position;
	html: string;
	anchor: string;
	className: string;
	text: string;
}

export interface Lensflare {
	id: string;
	position: Position;
	type: number;
}

export interface Scene {
	id: string;
	name: string;
	panorama: string;
	icon: ReactNode | ComponentType;
	markers: Marker[];
	callouts: Callout[];
	lensflares: Lensflare[];
}
