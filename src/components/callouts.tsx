import type React from "react";
import { useEffect, useState } from "react";
import {
	type CalloutConfig,
	generateCalloutHTML,
} from "./callouts/generate-callout-html.ts";

// Função utilitária para converter string 'deg' para número
function parseDeg(str: string) {
	return parseFloat(str.replace("deg", ""));
}

// Componente React para Callout
export const Callout: React.FC<{
	id: string;
	position: { yaw: string; pitch: string };
	text: string;
	anchor?: string;
	direction?: "right" | "left" | "up" | "down";
	camera: { yaw: number; pitch: number };
}> = ({ id, position, text, anchor = "left", direction = "right", camera }) => {
	const [wasActive, setWasActive] = useState(false);
	const [elementReady, setElementReady] = useState(false);

	// Lógica para saber se está sendo visto
	const yaw = parseDeg(position.yaw);
	const pitch = parseDeg(position.pitch);
	const yawDiff = Math.abs(((camera.yaw - yaw + 180 + 360) % 360) - 180);
	const pitchDiff = Math.abs(camera.pitch - pitch);
	const isActive = yawDiff < 50 && pitchDiff < 30;

	// Aguarda o elemento estar disponível no DOM
	useEffect(() => {
		const checkElement = () => {
			const el = document.getElementById(`psv-marker-${id}`);
			if (el) {
				setElementReady(true);
			} else {
				// Tenta novamente após um pequeno delay
				setTimeout(checkElement, 10);
			}
		};
		checkElement();
	}, [id]);

	// Adiciona/remove classe no DOM para cada marker individualmente
	useEffect(() => {
		if (!elementReady) return;

		const el = document.getElementById(`psv-marker-${id}`);
		if (el) {
			if (isActive && !wasActive) {
				// Ativando: remove exiting, adiciona active
				el.classList.remove("psv-callout--exiting");
				el.classList.add("psv-callout--active");
				setWasActive(true);
			} else if (!isActive && wasActive) {
				// Desativando: remove active, adiciona exiting
				el.classList.remove("psv-callout--active");
				el.classList.add("psv-callout--exiting");
				setWasActive(false);

				// Remove a classe exiting após a animação terminar
				setTimeout(() => {
					const element = document.getElementById(`psv-marker-${id}`);
					if (element) {
						element.classList.remove("psv-callout--exiting");
					}
				}, 300); // Duração reduzida da animação de saída
			}
		}
	}, [isActive, id, wasActive, elementReady]);

	return null;
};

// Função para criar um callout
export const createCallout = ({
	id,
	position,
	text,
	anchor = "left",
	direction = "right",
	size = 5,
}: CalloutConfig) => ({
	id,
	position,
	html: generateCalloutHTML(text, direction, 18, 2, size),
	anchor,
	className: "psv-callout",
	text,
});
