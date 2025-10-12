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

export interface TiledPanorama {
	// full equirectangular width in pixels
	width: number;
	// number of tile columns
	cols: number;
	// number of tile rows
	rows: number;
	// optional base URL used by some scene definitions
	baseUrl?: string;
	// optional function that returns the tile URL for a given column and row
	tileUrl?: (col: number, row: number) => string;
}

export interface Scene {
	id: string;
	name: string;
	// panorama can be a simple image path or a tiled panorama configuration
	panorama: string | TiledPanorama;
	icon: ReactNode | ComponentType;
	markers: Marker[];
	callouts: Callout[];
	lensflares: Lensflare[];
}
