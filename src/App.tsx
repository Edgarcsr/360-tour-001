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
		<div style={{ position: "relative" }}>
			{/* Botões de teste para demonstrar o loading */}
			<div style={{ position: "absolute", top: 20, left: 20, zIndex: 100 }}>
				<button
					type="button"
					onClick={() => {
						if (viewerRef.current) {
							viewerRef.current.setScene(beachScene, {
								speed: 2000,
								rotation: true,
								effect: "fade",
							});
							setCurrentScene(beachScene);
						}
					}}
					style={{
						padding: "10px 20px",
						margin: "5px",
						backgroundColor: "#60a5fa",
						color: "white",
						border: "none",
						borderRadius: "5px",
						cursor: "pointer",
					}}
				>
					Praia
				</button>
				<button
					type="button"
					onClick={() => {
						if (viewerRef.current) {
							viewerRef.current.setScene(buildingScene, {
								speed: 2000,
								rotation: true,
								effect: "fade",
							});
							setCurrentScene(buildingScene);
						}
					}}
					style={{
						padding: "10px 20px",
						margin: "5px",
						backgroundColor: "#34d399",
						color: "white",
						border: "none",
						borderRadius: "5px",
						cursor: "pointer",
					}}
				>
					Prédio
				</button>
			</div>

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
		</div>
	);
}

export default App;
