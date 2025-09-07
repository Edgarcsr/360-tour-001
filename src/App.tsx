import "@photo-sphere-viewer/compass-plugin/index.css";
import "@photo-sphere-viewer/markers-plugin/index.css";
import { createCallout } from "./components/callouts";
import { createAnimatedCircleMarker } from "./components/markers";
import { PhotoSphereViewer } from "./components/PhotoSphereViewer";

function App() {
	// Definindo markers no App
	const houseMarker = createAnimatedCircleMarker({
		id: "house",
		position: { yaw: "218.5deg", pitch: "-7deg" },
		tooltip: "Entrar na casa",
		href: "/algum-lugar",
	});

	// Definindo callouts no App - demonstrando o mapeamento automático e diferentes tamanhos
	const lighthouseCallout = createCallout({
		id: "callout-1",
		position: { yaw: "-47.2deg", pitch: "40.4deg" },
		text: "Farol famoso",
		direction: "right", // Anchor será automaticamente "left"
		size: 2, // Linha de 128px (8 * 16)
	});

	const buildingCallout = createCallout({
		id: "callout-2",
		position: { yaw: "90deg", pitch: "20deg" },
		text: "Prédio alto",
		direction: "NE", // Anchor será automaticamente "right"
		size: 6, // Linha de 96px (6 * 16)
	});

	const skyCallout = createCallout({
		id: "callout-3",
		position: { yaw: "0deg", pitch: "60deg" },
		text: "Céu azul",
		direction: "down", // Anchor será automaticamente "top"
		size: 10, // Linha de 160px (10 * 16)
	});

	// Lensflares configuration
	const lensflares = [
		{
			id: "sun",
			position: { yaw: "90deg", pitch: "35deg" },
			type: 2,
		},
	];

	// Handler para cliques nos markers
	const handleMarkerClick = (markerId: string) => {
		switch (markerId) {
			case "house":
				window.open("/algum-lugar", "_self");
				break;
			default:
				console.log(`Marker clicked: ${markerId}`);
		}
	};

	return (
		<PhotoSphereViewer
			src="key-biscayne-4.jpg"
			markers={[houseMarker]}
			callouts={[lighthouseCallout, buildingCallout, skyCallout]}
			lensflares={lensflares}
			compass={true}
			onMarkerClick={handleMarkerClick}
			height="100vh"
			width="100%"
		/>
	);
}

export default App;
