import { MarkersPlugin } from "@photo-sphere-viewer/markers-plugin";
import { LensflarePlugin } from "photo-sphere-viewer-lensflare-plugin";
import { useState } from "react";
import { ReactPhotoSphereViewer } from "react-photo-sphere-viewer";
import { Callout } from "./callouts";

interface PhotoSphereViewerProps {
	src: string;
	markers?: any[];
	callouts?: any[];
	lensflares?: any[];
	compass?: boolean;
	onMarkerClick?: (markerId: string) => void;
	height?: string;
	width?: string;
}

export function PhotoSphereViewer(props: PhotoSphereViewerProps) {
	const {
		src,
		markers = [],
		callouts = [],
		lensflares = [],
		compass = true,
		onMarkerClick,
		height = "100vh",
		width = "100%",
	} = props;

	const [camera, setCamera] = useState<{ yaw: number; pitch: number }>({
		yaw: 0,
		pitch: 0,
	});

	const handleReady = (instance: any) => {
		const markersPlugin = instance.getPlugin(MarkersPlugin);
		if (markersPlugin && onMarkerClick) {
			markersPlugin.addEventListener("select-marker", (e: any) => {
				onMarkerClick(e.marker.id);
			});
		}
	};

	const handlePositionChange = (lat: number, lng: number) => {
		// converte radianos para graus
		const yawDeg = (lng * 180) / Math.PI;
		const pitchDeg = (lat * 180) / Math.PI;
		setCamera({ yaw: yawDeg, pitch: pitchDeg });
	};

	const plugins = [];
	if (lensflares.length > 0) plugins.push([LensflarePlugin, { lensflares }]);
	if (markers.length > 0 || callouts.length > 0)
		plugins.push([MarkersPlugin, { markers: [...markers, ...callouts] }]);

	return (
		<div style={{ position: "relative", width, height }}>
			<ReactPhotoSphereViewer
				plugins={plugins}
				src={src}
				height={height}
				width={width}
				onReady={handleReady}
				onPositionChange={handlePositionChange}
			/>
			{/* Callouts React para controlar ativação */}
			{callouts.map((c) => (
				<Callout key={c.id} {...c} camera={camera} />
			))}
		</div>
	);
}
