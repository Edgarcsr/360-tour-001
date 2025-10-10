import { MapIcon, MenuIcon } from "lucide-react";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import { type Scene, scenes } from "@/scenes";
import type { PhotoSphereViewerRef } from "./PhotoSphereViewer";
import { Button } from "./ui/button";

interface MenuProps {
	viewerRef: React.RefObject<PhotoSphereViewerRef | null>;
	currentScene: Scene;
	onSceneChange: (scene: Scene) => void;
	scenes: Scene[];
}

export function Menu({
	viewerRef,
	currentScene,
	onSceneChange,
	scenes: propScenes,
}: MenuProps) {
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

	// prefer scenes passed as prop, fallback to module-level scenes
	const scenesToShow = propScenes ?? scenes;

	return (
		<div className="absolute top-4 left-4 z-10 h-full">
			<Drawer direction="left">
				<DrawerTrigger asChild>
					<Button size={"icon"}>
						<MenuIcon />
					</Button>
				</DrawerTrigger>
				<DrawerContent className="h-full w-fit p-8">
					<DrawerHeader>
						<DrawerTitle className="flex items-center gap-2">
							<MapIcon />
							<h2>Onde ir?</h2>
						</DrawerTitle>
						<DrawerDescription>
							Clique na área que deseja explorar.
						</DrawerDescription>
						{scenesToShow.map((scene) => {
							const Icon = scene.icon as React.ComponentType<unknown>;
							return (
								<Button
									key={scene.id}
									id={scene.id}
									variant={currentScene.id === scene.id ? "default" : "ghost"}
									onClick={() => handleSceneChange(scene)}
									className="justify-start"
								>
									<Icon />
									{scene.name}
								</Button>
							);
						})}
					</DrawerHeader>
					<DrawerFooter>
						<DrawerClose asChild>
							<Button>Fechar</Button>
						</DrawerClose>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</div>
	);
}
