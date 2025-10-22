import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import type { Scene } from "@/scenes/types";
import { ModeToggle } from "./mode-toggle";
import type { PhotoSphereViewerRef } from "./PhotoSphereViewer";
import { Switch } from "./ui/switch";

interface MenuProps {
	viewerRef: React.RefObject<PhotoSphereViewerRef | null>;
	currentScene: Scene;
	onSceneChange: (scene: Scene) => void;
	scenes: Scene[];
	crosshairEnabled?: boolean;
	setCrosshairEnabled?: (v: boolean) => void;
	enableCrosshairFeature?: boolean;
}

export function Menu({
	viewerRef,
	currentScene,
	onSceneChange,
	scenes: propScenes,
	crosshairEnabled = false,
	setCrosshairEnabled,
	enableCrosshairFeature = false,
}: MenuProps) {
	const [isMenuVisible, setIsMenuVisible] = useState(true);

	const handleSceneChange = (targetScene: Scene) => {
		if (viewerRef.current && currentScene.id !== targetScene.id) {
			viewerRef.current.setScene(targetScene, {
				speed: 2000,
				rotation: true,
				effect: "fade",
			});
			onSceneChange(targetScene);
		}
	};

	return (
		<>
			{/* Botão para mostrar/esconder o menu */}
			<button
				type="button"
				onClick={() => setIsMenuVisible(!isMenuVisible)}
				className="absolute top-4 left-4 z-[100] p-2 bg-background/80 backdrop-blur-sm border border-border rounded-md shadow-lg hover:bg-background transition-all"
				style={{
					left: isMenuVisible ? "280px" : "16px",
					transition: "left 0.3s ease-in-out",
				}}
			>
				{isMenuVisible ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
			</button>

			{/* Menu lateral fixo */}
			<aside
				className="fixed top-0 left-0 h-screen z-[90] bg-background/95 backdrop-blur-sm border-r border-border shadow-2xl transition-transform duration-300 ease-in-out flex flex-col"
				style={{
					width: "280px",
					transform: isMenuVisible ? "translateX(0)" : "translateX(-100%)",
				}}
			>
				{/* Logo e Header */}
				<div className="p-6 border-b border-border">
					<div className="flex items-center justify-center mb-4">
						<img
							src={`${import.meta.env.BASE_URL}mf7-logo-ode-vila-clementino.jpg`}
							alt="Logo"
							className="h-24 w-auto object-contain rounded-md"
						/>
					</div>
				</div>

				{/* Lista de cenas */}
				<nav className="flex-1 overflow-y-auto p-4">
					<div className="space-y-1">
						{propScenes.map((scene) => {
							const Icon = scene.icon as React.ComponentType<unknown>;
							const isActive = currentScene.id === scene.id;
							return (
								<button
									key={scene.id}
									type="button"
									onClick={() => handleSceneChange(scene)}
									className={`
										w-full text-sm flex items-center gap-3 px-4 py-3 rounded-md text-left
										transition-all duration-200
										${
											isActive
												? "bg-primary text-primary-foreground shadow-md"
												: "text-foreground hover:bg-accent hover:text-accent-foreground"
										}
									`}
								>
									<Icon />
									<span className="font-medium uppercase text-sm! tracking-wide">
										{scene.name}
									</span>
									{isActive && <ChevronRight className="ml-auto" size={16} />}
								</button>
							);
						})}
					</div>
				</nav>

				{/* Footer com configurações */}
				<div className="p-4 border-t border-border space-y-3">
					{enableCrosshairFeature && (
						<div className="flex items-center justify-between py-2 px-3 rounded-md bg-accent/50">
							<span className="text-sm font-medium">Crosshair</span>
							<Switch
								checked={crosshairEnabled}
								onCheckedChange={(v) => setCrosshairEnabled?.(Boolean(v))}
							/>
						</div>
					)}
					<div className="flex items-center justify-center">
						<ModeToggle />
					</div>
				</div>
			</aside>
		</>
	);
}
