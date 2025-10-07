import type { Scene } from "../scenes";

/**
 * Gerenciador de cenas do panorama
 * Facilita a navegação entre diferentes cenas
 */
export class PanoramaSceneManager {
	private scenes: Map<string, Scene>;
	private currentSceneId: string | null = null;

	constructor(scenes: Scene[]) {
		this.scenes = new Map(scenes.map((scene) => [scene.id, scene]));
	}

	/**
	 * Adiciona uma nova cena
	 */
	addScene(scene: Scene): void {
		this.scenes.set(scene.id, scene);
	}

	/**
	 * Remove uma cena
	 */
	removeScene(sceneId: string): boolean {
		return this.scenes.delete(sceneId);
	}

	/**
	 * Obtém uma cena pelo ID
	 */
	getScene(sceneId: string): Scene | undefined {
		return this.scenes.get(sceneId);
	}

	/**
	 * Obtém todas as cenas
	 */
	getAllScenes(): Scene[] {
		return Array.from(this.scenes.values());
	}

	/**
	 * Define a cena atual
	 */
	setCurrentScene(sceneId: string): Scene | undefined {
		const scene = this.scenes.get(sceneId);
		if (scene) {
			this.currentSceneId = sceneId;
		}
		return scene;
	}

	/**
	 * Obtém a cena atual
	 */
	getCurrentScene(): Scene | null {
		if (!this.currentSceneId) return null;
		return this.scenes.get(this.currentSceneId) || null;
	}

	/**
	 * Verifica se uma cena existe
	 */
	hasScene(sceneId: string): boolean {
		return this.scenes.has(sceneId);
	}

	/**
	 * Conta o número de cenas
	 */
	getSceneCount(): number {
		return this.scenes.size;
	}
}

/**
 * Hook helper para usar o gerenciador de cenas
 */
export const createSceneManager = (scenes: Scene[]): PanoramaSceneManager => {
	return new PanoramaSceneManager(scenes);
};
