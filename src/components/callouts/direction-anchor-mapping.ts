/**
 * Mapeamento automático de direção para anchor
 * Este arquivo define qual anchor usar baseado na direção especificada
 */

export type Direction =
	| "right"
	| "left"
	| "up"
	| "down"
	| "NE"
	| "NW"
	| "SE"
	| "SW";
export type Anchor =
	| "left"
	| "right"
	| "top"
	| "bottom"
	| "top left"
	| "top right"
	| "bottom left"
	| "bottom right"
	| "center";

/**
 * Objeto que mapeia direções para anchors apropriados
 * A lógica é: se o callout aponta para uma direção, o anchor deve estar no lado oposto
 */
const directionToAnchorMap: Record<Direction, Anchor> = {
	// Direções básicas
	right: "left", // Callout aponta para direita, anchor fica à esquerda
	left: "right", // Callout aponta para esquerda, anchor fica à direita
	up: "bottom", // Callout aponta para cima, anchor fica embaixo
	down: "top", // Callout aponta para baixo, anchor fica em cima

	// Direções diagonais
	NE: "bottom left", // Nordeste -> anchor no sudoeste
	NW: "bottom right", // Noroeste -> anchor no sudeste
	SE: "top left", // Sudeste -> anchor no noroeste
	SW: "top right", // Sudoeste -> anchor no nordeste
};

/**
 * Função que retorna o anchor apropriado para uma direção
 * @param direction - A direção do callout
 * @returns O anchor apropriado para essa direção
 */
export function getAnchorForDirection(direction: Direction): Anchor {
	return directionToAnchorMap[direction];
}

/**
 * Função que verifica se uma direção é válida
 * @param direction - A direção a ser verificada
 * @returns true se a direção é válida, false caso contrário
 */
export function isValidDirection(direction: string): direction is Direction {
	return direction in directionToAnchorMap;
}

/**
 * Função que retorna todas as direções disponíveis
 * @returns Array com todas as direções disponíveis
 */
export function getAvailableDirections(): Direction[] {
	return Object.keys(directionToAnchorMap) as Direction[];
}
