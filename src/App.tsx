import "@photo-sphere-viewer/compass-plugin/index.css";
import "@photo-sphere-viewer/markers-plugin/index.css";
import { useRef, useState } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { Menu } from "./components/menu";
import {
	PhotoSphereViewer,
	type PhotoSphereViewerRef,
} from "./components/PhotoSphereViewer";
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger,
} from "./components/ui/context-menu";
import { scenes } from "./scenes";

function App() {
	const viewerRef = useRef<PhotoSphereViewerRef>(null);
	const [currentScene, setCurrentScene] = useState(scenes[0]);

	// Handler para cliques nos markers
	const handleMarkerClick = (markerId: string) => {
		// Buscar a cena alvo por id (por convenção, o marker pode ter o mesmo id da cena alvo)
		const targetScene = scenes.find((s) => s.id === markerId);
		if (targetScene) {
			if (viewerRef.current && currentScene.id !== targetScene.id) {
				viewerRef.current.setScene(targetScene, {
					speed: 2000,
					rotation: true,
					effect: "fade",
				});
				setCurrentScene(targetScene);
			}
		} else {
			console.log(`Marker clicked: ${markerId}`);
		}
	};

	return (
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<div style={{ position: "relative" }}>
				<ContextMenu>
					<ContextMenuTrigger>
						<div>
							<Menu
								viewerRef={viewerRef}
								currentScene={currentScene}
								onSceneChange={setCurrentScene}
								scenes={scenes}
							/>
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
								defaultTransition={{
									speed: 1500,
									rotation: true,
									effect: "fade",
								}}
							/>
						</div>
					</ContextMenuTrigger>
					<ContextMenuContent>
						<ContextMenuItem>
							Feito por Edgar C. S. Ribeiro &copy; 2025
						</ContextMenuItem>
					</ContextMenuContent>
				</ContextMenu>
			</div>
		</ThemeProvider>
	);
}

export default App;
