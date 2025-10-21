/** biome-ignore-all lint/suspicious/noExplicitAny: <Not needed> */

import { EquirectangularTilesAdapter } from "@photo-sphere-viewer/equirectangular-tiles-adapter";
import { MarkersPlugin } from "@photo-sphere-viewer/markers-plugin";
import { LensflarePlugin } from "photo-sphere-viewer-lensflare-plugin";
import { forwardRef, useImperativeHandle, useRef, useState, useEffect } from "react";
import {
	type PluginConfig,
	ReactPhotoSphereViewer,
} from "react-photo-sphere-viewer";
import type { Scene } from "../scenes";
import { Callout } from "./callouts";
import { LoadingBar } from "./LoadingBar";
import { LoadingSpinner } from "./LoadingSpinner";
import { setupMarkerEvents } from "./markers";

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
	// src may be a string (single image) or a tiled panorama object
	src: string | import("../scenes/types").TiledPanorama;
	markers?: any[];
	callouts?: any[];
	lensflares?: any[];
	compass?: boolean;
	onMarkerClick?: (markerId: string) => void;
	onSceneChange?: (scene: Scene) => void;
	height?: string;
	width?: string;
	defaultTransition?: TransitionOptions;
	onCameraChange?: (camera: { yaw: number; pitch: number }) => void;
	// when true, the component will emit camera updates via onCameraChange
	emitCamera?: boolean;
	// loading type: "spinner" (default with overlay) or "bar" (discrete bottom bar)
	loadingType?: "spinner" | "bar";
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
		onSceneChange,
		height = "100vh",
		width = "100%",
		defaultTransition,
		loadingType = "spinner",
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
	const loadingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
	const transitionStartTimeRef = useRef<number>(0);

	// Expor métodos através do ref
	useImperativeHandle(ref, () => ({
		setPanorama: (newSrc: string, transition?: TransitionOptions) => {
			if (viewerRef.current) {
				setIsLoading(true); // Mostra loading ao trocar panorama
				transitionStartTimeRef.current = Date.now();
				
				// Clear any pending loading timeout
				if (loadingTimeoutRef.current) {
					clearTimeout(loadingTimeoutRef.current);
				}
				
				viewerRef.current.setPanorama(newSrc, transition);
			}
		},
		setScene: (scene: Scene, transition?: TransitionOptions) => {
			if (viewerRef.current) {
				setIsLoading(true); // Mostra loading ao trocar cena
				transitionStartTimeRef.current = Date.now();

				// Clear any pending loading timeout
				if (loadingTimeoutRef.current) {
					clearTimeout(loadingTimeoutRef.current);
				}

				// Limpa os markers atuais do plugin
				const markersPlugin = viewerRef.current.getPlugin(MarkersPlugin);
				if (markersPlugin) {
					markersPlugin.clearMarkers();
				}

				// Atualiza o estado interno com os dados da nova cena
				setCurrentMarkers(scene.markers || []);
				setCurrentCallouts(scene.callouts || []);
				setCurrentLensflares(scene.lensflares || []);

				// Get transition speed to ensure minimum loading time
				const transitionSpeed = transition?.speed || defaultTransition?.speed || 1500;
				const minLoadingTime = typeof transitionSpeed === "number" ? transitionSpeed : 1500;

				// Muda o panorama
				viewerRef.current.setPanorama(scene.panorama, transition);

				// Force minimum loading time to allow transition to be visible
				// This prevents instant jumps when images are cached
				loadingTimeoutRef.current = setTimeout(() => {
					setIsLoading(false);
				}, minLoadingTime);

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

	// Cleanup timeout on unmount
	useEffect(() => {
		return () => {
			if (loadingTimeoutRef.current) {
				clearTimeout(loadingTimeoutRef.current);
			}
		};
	}, []);

	const handleReady = (instance: any) => {
		viewerRef.current = instance;

		// Adiciona listeners para eventos de carregamento
		instance.addEventListener("panorama-load-progress", () => {
			setIsLoading(true);
		});

		// No longer relying on panorama-loaded for hiding loading
		// We use timeout based on transition speed instead

		// Oculta o loading inicial
		setIsLoading(false);

		const markersPlugin = instance.getPlugin(MarkersPlugin);
		if (markersPlugin) {
			// delegate marker click handling to the shared helper
			// pass the forwarded ref so callers can call setScene on the exposed API
			setupMarkerEvents(
				markersPlugin,
				currentMarkers.concat(currentCallouts || []),
				ref,
				onSceneChange,
				onMarkerClick,
			);
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
				// If src is a tiled panorama object, use the tiles adapter and pass the panorama config directly.
				adapter={
					(typeof src === "object"
						? (EquirectangularTilesAdapter as any)
						: undefined) as any
				}
				panorama={(typeof src === "object" ? (src as any) : undefined) as any}
				navbar={false}
				defaultZoomLvl={0}
				plugins={plugins}
				// when not using tiled panorama, pass src as string
				src={(typeof src === "string" ? (src as any) : undefined) as any}
				height={height}
				width={width}
				onReady={handleReady}
				onPositionChange={handlePositionChange}
				defaultTransition={defaultTransition}
				loadingTxt="" // Remove o texto padrão
				loadingImg="" // Remove a imagem padrão
			/>
			{/* Loading overlay customizado */}
			{isLoading && loadingType === "spinner" && (
				<LoadingSpinner size="lg" text="Carregando panorama..." />
			)}
			{isLoading && loadingType === "bar" && (
				<LoadingBar color="white" height={4} />
			)}
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
