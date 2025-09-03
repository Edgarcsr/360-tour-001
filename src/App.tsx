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

	// Definindo callouts no App
	const lighthouseCallout = createCallout({
		id: "callout-1",
		position: { yaw: "-47.6deg", pitch: "40.4deg" },
		text: "Farol famoso",
		anchor: "top left",
		direction: "SE",
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
			callouts={[lighthouseCallout]}
			lensflares={lensflares}
			compass={true}
			onMarkerClick={handleMarkerClick}
			height="100vh"
			width="100%"
		/>
	);
}

export default App;
