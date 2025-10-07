import "@photo-sphere-viewer/compass-plugin/index.css";
import "@photo-sphere-viewer/markers-plugin/index.css";
import { useRef, useState } from "react";
import {
	PhotoSphereViewer,
	type PhotoSphereViewerRef,
} from "./components/PhotoSphereViewer";
import { beachScene, buildingScene } from "./scenes";

function App() {
	const viewerRef = useRef<PhotoSphereViewerRef>(null);
	const [currentScene, setCurrentScene] = useState(beachScene);

	// Handler para cliques nos markers
	const handleMarkerClick = (markerId: string) => {
		if (markerId === "house") {
			// Troca para a cena do prédio com transição
			if (viewerRef.current) {
				viewerRef.current.setScene(buildingScene, {
					speed: 2000,
					rotation: true,
					effect: "fade",
				});
				setCurrentScene(buildingScene);
			}
		} else {
			console.log(`Marker clicked: ${markerId}`);
		}
	};

	return (
		<PhotoSphereViewer
			ref={viewerRef}
			src={currentScene.panorama}
			markers={currentScene.markers}
			callouts={currentScene.callouts}
			lensflares={currentScene.lensflares}
			compass={true}
			onMarkerClick={handleMarkerClick}
			height="100vh"
			width="100%"
			defaultTransition={{ speed: 1500, rotation: true, effect: "fade" }}
		/>
	);
}

export default App;
