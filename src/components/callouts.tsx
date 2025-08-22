import type React from "react";
import { useEffect, useState } from "react";

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
	// Lógica para saber se está sendo visto
	// Cada marker é identificado por seu id único, então a ativação é individual
	const yaw = parseDeg(position.yaw);
	const pitch = parseDeg(position.pitch);
	const yawDiff = Math.abs(((camera.yaw - yaw + 180 + 360) % 360) - 180);
	const pitchDiff = Math.abs(camera.pitch - pitch);
	const isActive = yawDiff < 25 && pitchDiff < 25;

	// Adiciona/remove classe no DOM para cada marker individualmente
	// Assim, múltiplos markers podem ser ativados/desativados de forma independente
	useEffect(() => {
		const el = document.getElementById(`psv-marker-${id}`);
		if (el) {
			if (isActive) {
				el.classList.add("psv-callout--active");
			} else {
				el.classList.remove("psv-callout--active");
			}
		}
	}, [isActive, id]);

	// O HTML do callout ainda é gerado pelo plugin, só controlamos a classe de ativação
	// Para múltiplos markers, basta criar múltiplos Callout com ids diferentes
	return null;
};
// Tipos para os callouts
export interface CalloutConfig {
	id: string;
	position: { yaw: string; pitch: string };
	text: string;
	anchor?: string;
	direction?: "right" | "left" | "up" | "down";
}

// Função para gerar HTML do callout igual ao marker animado
const generateCalloutHTML = (
	text: string,
	_direction?: any,
	main = 18,
	borderSize = 2,
) => {
	return `
			<style>
				@keyframes grow-fade {
					0% { transform: scale(1); opacity: 0.6; }
					70% { transform: scale(2.2); opacity: 0; }
					100% { transform: scale(2.2); opacity: 0; }
				}
				@keyframes line-grow {
					0% { width: 0; }
					100% { width: 128px; }
				}
				@keyframes line-shrink {
					0% { width: 128px; }
					100% { width: 0; }
				}
				@keyframes flag-slide-in {
					0% { opacity: 0; transform: translateX(-30px); }
					100% { opacity: 1; transform: translateX(0); }
				}
				@keyframes flag-slide-out {
					0% { opacity: 1; transform: translateX(0); }
					100% { opacity: 0; transform: translateX(-30px); }
				}
				.psv-callout__hline {
					background: #fff;
					height: 2px;
					width: 0;
					transition: width 0.6s;
					margin-left: 0;
					margin-right: 0;
					display: inline-block;
          border-radius: 8px;
				}
				.psv-callout.psv-callout--active .psv-callout__hline {
					animation: line-grow 0.6s cubic-bezier(.4,1.4,.6,1) forwards;
				}
				.psv-callout:not(.psv-callout--active) .psv-callout__hline {
					animation: line-shrink 0.6s cubic-bezier(.4,1.4,.6,1) forwards;
				}
				.psv-callout__text {
					opacity: 0;
					margin-top: 8px;
					color: #fff;
					background: #000;
					border-radius: 2px;
					padding: 4px 10px;
					font-size: 15px;
					font-family: Arial, Helvetica, sans-serif;
					white-space: nowrap;
					box-shadow: 0 2px 8px rgba(0,0,0,0.18);
					transition: opacity 0.4s, transform 0.4s;
					display: block;
					animation-fill-mode: both;
				}
				.psv-callout.psv-callout--active .psv-callout__text {
					animation: flag-slide-in 0.5s 0.2s cubic-bezier(.4,1.4,.6,1) both;
				}
				.psv-callout:not(.psv-callout--active) .psv-callout__text {
					animation: flag-slide-out 0.4s cubic-bezier(.4,1.4,.6,1) both;
				}
			</style>
					<div style="position: relative; display: flex; align-items: center; min-width: 120px; min-height: 60px;">
						<div style="position: relative; width: ${main}px; height: ${main}px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; z-index:2;">
							<div style="position: absolute; width: ${main - 2 * borderSize}px; height: ${main - 2 * borderSize}px; border-radius: 50%; border: ${borderSize}px solid #fff; background: transparent; opacity: 0.5; animation: grow-fade 1.6s infinite;"></div>
							<div style="position: relative; width: ${main}px; height: ${main}px; border-radius: 50%; background: #fff; box-shadow: 0 2px 8px rgba(0,0,0,0.18);"></div>
						</div>
								<div style="position: absolute; left: ${main}px; top: 16px; width: 48px; height: 2px; pointer-events: none;">
									<div class="psv-callout__hline" style="width: 100%; height: 2px;"></div>
								</div>
								<div style="position: absolute; left: ${main + 48}px; top: 50%; width: 2px; height: 32px; pointer-events: none;">
								<span class="psv-callout__text" style="position: absolute; left: ${main + 64}px; top: -20px; transform: translateY(0);">${text}</span>
					</div>
		`;
};

// Função para criar um callout
export const createCallout = ({
	id,
	position,
	text,
	anchor = "left",
	direction = "right",
}: CalloutConfig) => ({
	id,
	position,
	html: generateCalloutHTML(text, direction),
	anchor,
	className: "psv-callout",
	text,
});
