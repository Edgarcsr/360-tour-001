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
// Tipos para os callouts
export interface CalloutConfig {
	id: string;
	position: { yaw: string; pitch: string };
	text: string;
	anchor?: string;
	direction?: "right" | "left" | "up" | "down";
	size?: number; // Multiplicador para tamanho da linha (size * 16 = pixels)
}

// Função para gerar HTML do callout igual ao marker animado
const generateCalloutHTML = (
	text: string,
	_direction?: any,
	main = 18,
	borderSize = 2,
	size = 8, // Multiplicador para tamanho da linha (size * 16 = pixels)
) => {
	const lineWidth = size * 16; // Calcula o tamanho real da linha
	
	return `
		<style>
			/* ========== ANIMAÇÕES KEYFRAMES ========== */
			@keyframes grow-fade {
				0% { transform: scale(1); opacity: 0.6; }
				70% { transform: scale(2.2); opacity: 0; }
				100% { transform: scale(2.2); opacity: 0; }
			}
			
			@keyframes line-grow {
				0% { width: 0; opacity: 0; }
				100% { width: ${lineWidth}px; opacity: 1; }
			}
			
			@keyframes line-shrink {
				0% { width: ${lineWidth}px; opacity: 1; }
				100% { width: 0; opacity: 0; }
			}
			
			@keyframes vline-grow {
				0% { height: 0; opacity: 0; }
				100% { height: 32px; opacity: 1; }
			}
			
			@keyframes vline-shrink {
				0% { height: 32px; opacity: 1; }
				100% { height: 0; opacity: 0; }
			}
			
			@keyframes flag-slide-in {
				0% { opacity: 0; transform: translateX(-30px); }
				100% { opacity: 1; transform: translateX(0); }
			}
			
			@keyframes flag-slide-out {
				0% { opacity: 1; transform: translateX(0); }
				100% { opacity: 0; transform: translateX(-30px); }
			}

			/* ========== ESTILOS DA LINHA HORIZONTAL ========== */
			.psv-callout__hline {
				background: #fff;
				height: 2px;
				width: 0; /* Estado inicial sempre oculto */
				opacity: 0; /* Adiciona opacity 0 para garantir que esteja oculto */
				margin-left: 0;
				margin-right: 0;
				display: inline-block;
				border-radius: 8px;
				animation: none; /* Sem animação por padrão */
			}
			
			.psv-callout.psv-callout--active .psv-callout__hline {
				opacity: 1; /* Torna visível quando ativo */
				animation: line-grow 0.6s ease-out forwards;
			}
			
			.psv-callout.psv-callout--exiting .psv-callout__hline {
				animation: line-shrink 0.3s ease-in forwards;
			}

			/* ========== ESTILOS DA LINHA VERTICAL ========== */
			.psv-callout__vline {
				background: #fff;
				width: 2px;
				height: 0; /* Estado inicial sempre oculto */
				opacity: 0; /* Adiciona opacity 0 para garantir que esteja oculto */
				border-radius: 1px;
				animation: none; /* Sem animação por padrão */
				display: block;
			}
			
			.psv-callout.psv-callout--active .psv-callout__vline {
				opacity: 1; /* Torna visível quando ativo */
				animation: vline-grow 0.4s 0.6s cubic-bezier(.4,1.4,.6,1) forwards; /* Delay para aparecer após a linha horizontal terminar */
			}
			
			.psv-callout.psv-callout--exiting .psv-callout__vline {
				animation: vline-shrink 0.2s cubic-bezier(.4,1.4,.6,1) forwards;
			}

			/* ========== ESTILOS DO TEXTO ========== */
			.psv-callout__text {
				opacity: 0; /* Estado inicial sempre oculto */
				margin-top: 8px;
				color: #fff;
				background: #000;
				border-radius: 2px;
				padding: 4px 10px;
				font-size: 15px;
				font-family: Arial, Helvetica, sans-serif;
				white-space: nowrap;
				box-shadow: 0 2px 8px rgba(0,0,0,0.18);
				display: block;
				animation-fill-mode: both;
				transform: translateX(-30px); /* Estado inicial fora da tela */
				animation: none; /* Sem animação por padrão */
			}
			
			.psv-callout.psv-callout--active .psv-callout__text {
				animation: flag-slide-in 0.5s 0.6s cubic-bezier(.4,1.4,.6,1) both;
			}
			
			.psv-callout.psv-callout--exiting .psv-callout__text {
				animation: flag-slide-out 0.2s cubic-bezier(.4,1.4,.6,1) both;
			}
		</style>

		<!-- ========== ESTRUTURA HTML DO CALLOUT ========== -->
		<div style="position: relative; display: flex; align-items: center; min-width: 120px; min-height: 60px;">
			
			<!-- Círculo principal com animação pulsante -->
			<div style="position: relative; width: ${main}px; height: ${main}px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; z-index:2;">
				<!-- Círculo pulsante (animação grow-fade) -->
				<div style="position: absolute; width: ${main - 2 * borderSize}px; height: ${main - 2 * borderSize}px; border-radius: 50%; border: ${borderSize}px solid #fff; background: transparent; opacity: 0.5; animation: grow-fade 1.6s infinite;"></div>
				<!-- Círculo principal -->
				<div style="position: relative; width: ${main}px; height: ${main}px; border-radius: 50%; background: #fff; box-shadow: 0 2px 8px rgba(0,0,0,0.18);"></div>
			</div>
			
			<!-- Linha horizontal -->
			<div style="position: absolute; left: ${main}px; top: 16px; width: ${lineWidth}px; height: 2px; pointer-events: none;">
				<div class="psv-callout__hline" style="width: 100%; height: 2px;"></div>
			</div>
			
			<!-- Linha vertical (no final da linha horizontal) -->
			<div style="position: absolute; left: ${main + lineWidth}px; top: 16px; width: 2px; height: 32px; pointer-events: none;">
				<div class="psv-callout__vline" style="width: 2px; height: 0; opacity: 0;"></div>
			</div>
			
			<!-- Texto do callout -->
			<span class="psv-callout__text" style="position: absolute; left: ${main + lineWidth + 16}px; top: 12px; transform: translateY(-50%);">${text}</span>
			
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
	size = 8, // Valor padrão para ter 128px (8 * 16)
}: CalloutConfig) => ({
	id,
	position,
	html: generateCalloutHTML(text, direction, 18, 2, size),
	anchor,
	className: "psv-callout",
	text,
});
