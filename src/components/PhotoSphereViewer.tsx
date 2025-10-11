/** biome-ignore-all lint/suspicious/noExplicitAny: <Not needed> */
import { MarkersPlugin } from "@photo-sphere-viewer/markers-plugin";
import { LensflarePlugin } from "photo-sphere-viewer-lensflare-plugin";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import {
	type PluginConfig,
	ReactPhotoSphereViewer,
} from "react-photo-sphere-viewer";
import type { Scene } from "../scenes";
import { Callout } from "./callouts";
import { LoadingSpinner } from "./LoadingSpinner";

interface TransitionOptions {
	speed?: number | string;
	rotation?: boolean;
	effect?: "fade" | "black" | "white";
}

export interface PhotoSphereViewerRef {
	setPanorama: (src: string, transition?: TransitionOptions) => void;
	setScene: (scene: Scene, transition?: TransitionOptions) => void;
}

interface PhotoSphereViewerProps {
	src: string;
	markers?: any[];
	callouts?: any[];
	lensflares?: any[];
	compass?: boolean;
	onMarkerClick?: (markerId: string) => void;
	height?: string;
	width?: string;
	defaultTransition?: TransitionOptions;
	onCameraChange?: (camera: { yaw: number; pitch: number }) => void;
	// when true, the component will emit camera updates via onCameraChange
	emitCamera?: boolean;
}

export const PhotoSphereViewer = forwardRef(function PhotoSphereViewer(
	props: PhotoSphereViewerProps,
	ref: any,
) {
	const {
		src,
		markers = [],
		callouts = [],
		lensflares = [],
		onMarkerClick,
		height = "100vh",
		width = "100%",
		defaultTransition,
	} = props;

	const [camera, setCamera] = useState<{ yaw: number; pitch: number }>({
		yaw: 0,
		pitch: 0,
	});
	const { onCameraChange, emitCamera = false } =
		props as PhotoSphereViewerProps;
	const [isLoading, setIsLoading] = useState(true);

	// Estado interno para gerenciar markers, callouts e lensflares da cena atual
	const [currentMarkers, setCurrentMarkers] = useState(markers);
	const [currentCallouts, setCurrentCallouts] = useState(callouts);
	const [currentLensflares, setCurrentLensflares] = useState(lensflares);

	const viewerRef = useRef<any>(null);

	// Expor métodos através do ref
	useImperativeHandle(ref, () => ({
		setPanorama: (newSrc: string, transition?: TransitionOptions) => {
			if (viewerRef.current) {
				setIsLoading(true); // Mostra loading ao trocar panorama
				viewerRef.current.setPanorama(newSrc, transition);
			}
		},
		setScene: (scene: Scene, transition?: TransitionOptions) => {
			if (viewerRef.current) {
				setIsLoading(true); // Mostra loading ao trocar cena

				// Limpa os markers atuais do plugin
				const markersPlugin = viewerRef.current.getPlugin(MarkersPlugin);
				if (markersPlugin) {
					markersPlugin.clearMarkers();
				}

				// Atualiza o estado interno com os dados da nova cena
				setCurrentMarkers(scene.markers || []);
				setCurrentCallouts(scene.callouts || []);
				setCurrentLensflares(scene.lensflares || []);

				// Muda o panorama
				viewerRef.current.setPanorama(scene.panorama, transition);

				// Adiciona os novos markers após um pequeno delay
				setTimeout(() => {
					if (markersPlugin) {
						const allMarkers = [
							...(scene.markers || []),
							...(scene.callouts || []),
						];
						markersPlugin.setMarkers(allMarkers);
					}

					// Atualiza lensflares se o plugin estiver disponível
					try {
						const lensflarePlugin =
							viewerRef.current.getPlugin(LensflarePlugin);
						if (lensflarePlugin) {
							if (typeof lensflarePlugin.setLensflares === "function") {
								lensflarePlugin.setLensflares(scene.lensflares || []);
							} else if (typeof lensflarePlugin.set === "function") {
								try {
									lensflarePlugin.set({ lensflares: scene.lensflares || [] });
								} catch (e) {
									// ignore if incompatible
								}
							}
						}
					} catch (_) {
						// ignore plugin errors
					}
				}, 100);
			}
		},
	}));

	const handleReady = (instance: any) => {
		viewerRef.current = instance;

		// Adiciona listeners para eventos de carregamento
		instance.addEventListener("panorama-load-progress", () => {
			setIsLoading(true);
		});

		instance.addEventListener("panorama-loaded", () => {
			setIsLoading(false);
		});

		// Oculta o loading inicial
		setIsLoading(false);

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
		const newCam = { yaw: yawDeg, pitch: pitchDeg };
		setCamera(newCam);
		if (emitCamera && onCameraChange) onCameraChange(newCam);
	};

	// PhotoSphereViewer expects an array of PluginEntry (PluginConstructor or [PluginConstructor, config])
	const plugins: PluginConfig[] = [];
	if (currentLensflares.length > 0) {
		plugins.push([
			LensflarePlugin,
			{ lensflares: currentLensflares },
		] as PluginConfig);
	}
	if (currentMarkers.length > 0 || currentCallouts.length > 0) {
		plugins.push([
			MarkersPlugin,
			{ markers: [...currentMarkers, ...currentCallouts] },
		] as PluginConfig);
	}

	return (
		<div style={{ position: "relative", width, height }}>
			<ReactPhotoSphereViewer
				// hide the default bottom navbar/menu
				navbar={false}
				plugins={plugins}
				src={src}
				height={height}
				width={width}
				onReady={handleReady}
				onPositionChange={handlePositionChange}
				defaultTransition={defaultTransition}
				loadingTxt="" // Remove o texto padrão
				loadingImg="" // Remove a imagem padrão
				canvasBackground="#000000"
			/>
			{/* Loading overlay customizado */}
			{isLoading && <LoadingSpinner size="lg" text="Carregando panorama..." />}
			{/* Callouts React para controlar ativação */}
			{currentCallouts.map((c) => (
				<Callout key={c.id} {...c} camera={camera} />
			))}
			{/* expose camera state as data attribute for quick access if needed */}
			<div data-camera-yaw={camera.yaw} data-camera-pitch={camera.pitch} />
		</div>
	);
});

export default PhotoSphereViewer;
