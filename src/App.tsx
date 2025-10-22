import "@photo-sphere-viewer/compass-plugin/index.css";
import "@photo-sphere-viewer/markers-plugin/index.css";
import { useRef, useState } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import Crosshair from "./components/Crosshair";
import { Menu } from "./components/menu";
import {
	PhotoSphereViewer,
	type PhotoSphereViewerRef,
} from "./components/PhotoSphereViewer";
import { scenes } from "./scenes";

function App() {
	const viewerRef = useRef<PhotoSphereViewerRef>(null);
	const [currentScene, setCurrentScene] = useState(scenes[0]);
	// enable crosshair only when the Vite client env variable VITE_ENVIRONMENT === 'development'
	const enableCrosshairFeature =
		import.meta.env.VITE_ENVIRONMENT === "development" && import.meta.env.DEV;
	const [crosshairEnabled, setCrosshairEnabled] = useState(false);
	const [camera, setCamera] = useState<{ yaw: number; pitch: number } | null>({
		yaw: 0,
		pitch: 0,
	});

	// Handler para cliques nos markers
	const handleMarkerClick = (markerId: string) => {
		// A transição já é feita no setupMarkerEvents (markers.tsx)
		// Este handler só é chamado se não houve mudança de cena
		console.log(`Marker clicked: ${markerId}`);
	};

	return (
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<div style={{ position: "relative" }}>
				<Menu
					viewerRef={viewerRef}
					currentScene={currentScene}
					onSceneChange={setCurrentScene}
					scenes={scenes}
					crosshairEnabled={crosshairEnabled}
					setCrosshairEnabled={setCrosshairEnabled}
					enableCrosshairFeature={enableCrosshairFeature}
				/>
				<PhotoSphereViewer
					ref={viewerRef}
					src={currentScene.panorama}
					markers={currentScene.markers}
					callouts={currentScene.callouts}
					lensflares={currentScene.lensflares}
					compass={true}
					onMarkerClick={handleMarkerClick}
					onSceneChange={setCurrentScene}
					height="100vh"
					width="100%"
					defaultTransition={{
						speed: 1500,
						rotation: true,
						effect: "fade",
					}}
					onCameraChange={(cam) => setCamera(cam)}
					emitCamera={enableCrosshairFeature}
					scenesList={scenes}
				/>
				{enableCrosshairFeature && (
					<Crosshair enabled={crosshairEnabled} camera={camera} />
				)}
			</div>
		</ThemeProvider>
	);
}

export default App;
