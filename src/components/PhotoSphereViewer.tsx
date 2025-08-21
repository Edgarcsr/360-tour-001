import { CompassPlugin } from "@photo-sphere-viewer/compass-plugin";
import { MarkersPlugin } from "@photo-sphere-viewer/markers-plugin";
import { LensflarePlugin } from "photo-sphere-viewer-lensflare-plugin";
import { ReactPhotoSphereViewer } from "react-photo-sphere-viewer";

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

export const PhotoSphereViewer = ({
	src,
	markers = [],
	callouts = [],
	lensflares = [],
	compass = true,
	onMarkerClick,
	height = "100vh",
	width = "100%",
}: PhotoSphereViewerProps) => {
	const handleReady = (instance: any) => {
		const markersPlugin = instance.getPlugin(MarkersPlugin);
		if (markersPlugin && onMarkerClick) {
			markersPlugin.addEventListener("select-marker", (e: any) => {
				onMarkerClick(e.marker.id);
			});
		}
	};

	const plugins = [
		// Lensflare Plugin
		...(lensflares.length > 0 ? [[LensflarePlugin, { lensflares }]] : []),

		// Markers Plugin
		...(markers.length > 0 || callouts.length > 0
			? [[MarkersPlugin, { markers: [...markers, ...callouts] }]]
			: []),

		// Compass Plugin
		...(compass
			? [
					[
						CompassPlugin,
						{
							hotspots: [
								{ yaw: "0deg" },
								{ yaw: "90deg" },
								{ yaw: "180deg" },
								{ yaw: "270deg" },
							],
						},
					],
				]
			: []),
	];

	return (
		<ReactPhotoSphereViewer
			plugins={plugins}
			src={src}
			height={height}
			width={width}
			onReady={handleReady}
		/>
	);
};
