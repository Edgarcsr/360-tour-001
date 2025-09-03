export interface CalloutConfig {
	id: string;
	position: { yaw: string; pitch: string };
	text: string;
	anchor?: string;
	direction?: "right" | "left" | "up" | "down" | "NE" | "NW" | "SE" | "SW";
	size?: number; // Multiplicador para tamanho da linha (size * 16 = pixels)
}

export function generateCalloutHTML(
	text: string,
	direction: string,
	main: number,
	borderSize: number,
	size: number,
): string {
	const lineWidth = size * 16;

	switch (direction) {
		case "right":
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
				width: 0;
				opacity: 0;
				margin-left: 0;
				margin-right: 0;
				margin-bottom: 20px;
				display: inline-block;
				border-radius: 8px;
				animation: none;
			}
			
			.psv-callout.psv-callout--active .psv-callout__hline {
				opacity: 1;
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
				margin-top: -12px;
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
			<div style="position: absolute; left: ${-main / 2}px; top: 50%; transform: translateY(-50%); width: ${main}px; height: ${main}px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; z-index:2;">
				<!-- Círculo pulsante (animação grow-fade) -->
				<div style="position: absolute; width: ${main - 2 * borderSize}px; height: ${main - 2 * borderSize}px; border-radius: 50%; border: ${borderSize}px solid #fff; background: transparent; opacity: 0.5; animation: grow-fade 1.6s infinite;"></div>
				<!-- Círculo principal -->
				<div style="position: relative; width: ${main}px; height: ${main}px; border-radius: 50%; background: #fff; box-shadow: 0 2px 8px rgba(0,0,0,0.18);"></div>
			</div>
			
			<!-- Linha horizontal -->
			<div style="position: absolute; left: ${0}px; top: 50%; transform: translateY(-1px); width: ${lineWidth}px; height: 2px; pointer-events: none;">
				<div class="psv-callout__hline" style="width: 100%; height: 2px;"></div>
			</div>
			
			<!-- Linha vertical (no final da linha horizontal) -->
			<div style="position: absolute; left: ${lineWidth}px; top: 50%; transform: translateY(-16px); width: 2px; height: 32px; pointer-events: none;">
				<div class="psv-callout__vline" style="width: 2px; height: 0; opacity: 0;"></div>
			</div>
			
			<!-- Texto do callout -->
			<span class="psv-callout__text" style="position: absolute; left: ${lineWidth + 16}px; top: 50%; transform: translateY(-50%);">${text}</span>
			
		</div>
	`;

		case "left":
			return `
		<style>
			/* ========== ANIMAÇÕES KEYFRAMES ========== */
			@keyframes grow-fade {
				0% { transform: scale(1); opacity: 0.6; }
				70% { transform: scale(2.2); opacity: 0; }
				100% { transform: scale(2.2); opacity: 0; }
			}
			
			@keyframes line-grow-left {
				0% { transform: scaleX(0); opacity: 0; }
				100% { transform: scaleX(1); opacity: 1; }
			}
			
			@keyframes line-shrink-left {
				0% { transform: scaleX(1); opacity: 1; }
				100% { transform: scaleX(0); opacity: 0; }
			}
			
			@keyframes vline-grow {
				0% { height: 0; opacity: 0; }
				100% { height: 32px; opacity: 1; }
			}
			
			@keyframes vline-shrink {
				0% { height: 32px; opacity: 1; }
				100% { height: 0; opacity: 0; }
			}
			
			@keyframes flag-slide-in-left {
				0% { opacity: 0; transform: translateX(30px); }
				100% { opacity: 1; transform: translateX(0); }
			}
			
			@keyframes flag-slide-out-left {
				0% { opacity: 1; transform: translateX(0); }
				100% { opacity: 0; transform: translateX(30px); }
			}

			/* ========== ESTILOS DA LINHA HORIZONTAL ========== */
			.psv-callout__hline-left {
				background: #fff;
				height: 2px;
				width: ${lineWidth}px;
				opacity: 0;
				margin-left: 0;
				margin-right: 0;
				margin-bottom: 20px;
				display: inline-block;
				border-radius: 8px;
				transform-origin: right;
				transform: scaleX(0);
				animation: none;
			}
			
			.psv-callout.psv-callout--active .psv-callout__hline-left {
				opacity: 1;
				animation: line-grow-left 0.6s ease-out forwards;
			}
			
			.psv-callout.psv-callout--exiting .psv-callout__hline-left {
				animation: line-shrink-left 0.3s ease-in forwards;
			}

			/* ========== ESTILOS DA LINHA VERTICAL ========== */
			.psv-callout__vline-left {
				background: #fff;
				width: 2px;
				height: 0; /* Estado inicial sempre oculto */
				opacity: 0; /* Adiciona opacity 0 para garantir que esteja oculto */
				border-radius: 1px;
				animation: none; /* Sem animação por padrão */
				display: block;
			}
			
			.psv-callout.psv-callout--active .psv-callout__vline-left {
				opacity: 1; /* Torna visível quando ativo */
				animation: vline-grow 0.4s 0.6s cubic-bezier(.4,1.4,.6,1) forwards; /* Delay para aparecer após a linha horizontal terminar */
			}
			
			.psv-callout.psv-callout--exiting .psv-callout__vline-left {
				animation: vline-shrink 0.2s cubic-bezier(.4,1.4,.6,1) forwards;
			}

			/* ========== ESTILOS DO TEXTO ========== */
			.psv-callout__text-left {
				opacity: 0;
				margin-top: -12px;
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
				animation: none;
			}
			
			.psv-callout.psv-callout--active .psv-callout__text-left {
				animation: flag-slide-in-left 0.5s 0.6s cubic-bezier(.4,1.4,.6,1) both;
			}
			
			.psv-callout.psv-callout--exiting .psv-callout__text-left {
				animation: flag-slide-out-left 0.2s cubic-bezier(.4,1.4,.6,1) both;
			}
		</style>

		<!-- ========== ESTRUTURA HTML DO CALLOUT (LEFT) ========== -->
		<div style="position: relative; display: flex; align-items: center; min-width: 120px; min-height: 60px;">
			
			<!-- Círculo principal com animação pulsante -->
			<div style="position: absolute; right: ${-main / 2}px; top: 50%; transform: translateY(-50%); width: ${main}px; height: ${main}px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; z-index:2;">
				<!-- Círculo pulsante (animação grow-fade) -->
				<div style="position: absolute; width: ${main - 2 * borderSize}px; height: ${main - 2 * borderSize}px; border-radius: 50%; border: ${borderSize}px solid #fff; background: transparent; opacity: 0.5; animation: grow-fade 1.6s infinite;"></div>
				<!-- Círculo principal -->
				<div style="position: relative; width: ${main}px; height: ${main}px; border-radius: 50%; background: #fff; box-shadow: 0 2px 8px rgba(0,0,0,0.18);"></div>
			</div>
			
			<!-- Linha horizontal (indo para a esquerda) -->
			<div style="position: absolute; right: ${0}px; top: 50%; transform: translateY(-1px); width: ${lineWidth}px; height: 2px; pointer-events: none;">
				<div class="psv-callout__hline-left" style="width: 100%; height: 2px;"></div>
			</div>
			
			<!-- Linha vertical (no início da linha horizontal) -->
			<div style="position: absolute; right: ${lineWidth}px; top: 50%; transform: translateY(-16px); width: 2px; height: 32px; pointer-events: none;">
				<div class="psv-callout__vline-left" style="width: 2px; height: 0; opacity: 0;"></div>
			</div>
			
			<!-- Texto do callout (à esquerda) -->
			<span class="psv-callout__text-left" style="position: absolute; right: ${lineWidth + 16}px; top: 50%; transform: translateY(-50%);">${text}</span>
			
		</div>
	`;

		case "up":
			return `
		<style>
			/* ========== ANIMAÇÕES KEYFRAMES ========== */
			@keyframes grow-fade {
				0% { transform: scale(1); opacity: 0.6; }
				70% { transform: scale(2.2); opacity: 0; }
				100% { transform: scale(2.2); opacity: 0; }
			}
			
			@keyframes vline-grow-up {
				0% { transform: scaleY(0); opacity: 0; }
				100% { transform: scaleY(1); opacity: 1; }
			}
			
			@keyframes vline-shrink-up {
				0% { transform: scaleY(1); opacity: 1; }
				100% { transform: scaleY(0); opacity: 0; }
			}
			
			@keyframes flag-slide-in-up {
				0% { opacity: 0; transform: translateY(30px); }
				100% { opacity: 1; transform: translateY(0); }
			}
			
			@keyframes flag-slide-out-up {
				0% { opacity: 1; transform: translateY(0); }
				100% { opacity: 0; transform: translateY(30px); }
			}

			/* ========== ESTILOS DA LINHA VERTICAL ========== */
			.psv-callout__vline-up {
				background: #fff;
				width: 2px;
				height: ${lineWidth}px; /* Altura fixa */
				opacity: 0; /* Estado inicial sempre oculto */
				border-radius: 1px;
				transform-origin: bottom; /* Cresce de baixo para cima */
				transform: scaleY(0); /* Estado inicial sem altura */
				animation: none; /* Sem animação por padrão */
				display: block;
			}
			
			.psv-callout.psv-callout--active .psv-callout__vline-up {
				opacity: 1; /* Torna visível quando ativo */
				animation: vline-grow-up 0.6s ease-out forwards;
			}
			
			.psv-callout.psv-callout--exiting .psv-callout__vline-up {
				animation: vline-shrink-up 0.3s ease-in forwards;
			}

			/* ========== ESTILOS DO TEXTO ========== */
			.psv-callout__text-up {
				opacity: 0; /* Estado inicial sempre oculto */
				color: #fff;
				background: #000;
				border-radius: 2px;
				padding: 4px 10px;
				font-size: 15px;
				font-family: Arial, Helvetica, sans-serif;
				white-space: nowrap;
				box-shadow: 0 2px 8px rgba(0,0,0,0.18);
				display: inline-block;
				animation-fill-mode: both;
				transform: translateY(30px); /* Estado inicial fora da tela */
				animation: none; /* Sem animação por padrão */
			}
			
			.psv-callout.psv-callout--active .psv-callout__text-up {
				animation: flag-slide-in-up 0.5s 0.6s cubic-bezier(.4,1.4,.6,1) both;
			}
			
			.psv-callout.psv-callout--exiting .psv-callout__text-up {
				animation: flag-slide-out-up 0.2s cubic-bezier(.4,1.4,.6,1) both;
			}
		</style>

		<!-- ========== ESTRUTURA HTML DO CALLOUT (UP) ========== -->
		<div style="position: relative; display: flex; flex-direction: column; align-items: center; min-width: 120px; min-height: ${lineWidth + 60}px;">
			
			<!-- Texto do callout (no topo) -->
			<div style="position: absolute; bottom: ${lineWidth + 8}px; left: 50%; transform: translateX(-50%); display: flex; justify-content: center;">
				<span class="psv-callout__text-up">${text}</span>
			</div>
			
			<!-- Linha vertical (do círculo ao texto) -->
			<div style="position: absolute; bottom: ${0}px; left: 50%; transform: translateX(-50%); width: 2px; height: ${lineWidth}px; pointer-events: none;">
				<div class="psv-callout__vline-up" style="width: 2px; height: ${lineWidth}px;"></div>
			</div>
			
			<!-- Círculo principal com animação pulsante (na base) -->
			<div style="position: absolute; bottom: ${-main / 2}px; left: 50%; transform: translateX(-50%); width: ${main}px; height: ${main}px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; z-index:2;">
				<!-- Círculo pulsante (animação grow-fade) -->
				<div style="position: absolute; width: ${main - 2 * borderSize}px; height: ${main - 2 * borderSize}px; border-radius: 50%; border: ${borderSize}px solid #fff; background: transparent; opacity: 0.5; animation: grow-fade 1.6s infinite;"></div>
				<!-- Círculo principal -->
				<div style="position: relative; width: ${main}px; height: ${main}px; border-radius: 50%; background: #fff; box-shadow: 0 2px 8px rgba(0,0,0,0.18);"></div>
			</div>
			
		</div>
	`;

		case "down":
			return `
		<style>
			/* ========== ANIMAÇÕES KEYFRAMES ========== */
			@keyframes grow-fade {
				0% { transform: scale(1); opacity: 0.6; }
				70% { transform: scale(2.2); opacity: 0; }
				100% { transform: scale(2.2); opacity: 0; }
			}
			
			@keyframes vline-grow-down {
				0% { transform: scaleY(0); opacity: 0; }
				100% { transform: scaleY(1); opacity: 1; }
			}
			
			@keyframes vline-shrink-down {
				0% { transform: scaleY(1); opacity: 1; }
				100% { transform: scaleY(0); opacity: 0; }
			}
			
			@keyframes flag-slide-in-down {
				0% { opacity: 0; transform: translateY(-30px); }
				100% { opacity: 1; transform: translateY(0); }
			}
			
			@keyframes flag-slide-out-down {
				0% { opacity: 1; transform: translateY(0); }
				100% { opacity: 0; transform: translateY(-30px); }
			}

			/* ========== ESTILOS DA LINHA VERTICAL ========== */
			.psv-callout__vline-down {
				background: #fff;
				width: 2px;
				height: ${lineWidth}px; /* Altura fixa */
				opacity: 0; /* Estado inicial sempre oculto */
				border-radius: 1px;
				transform-origin: top; /* Cresce de cima para baixo */
				transform: scaleY(0); /* Estado inicial sem altura */
				animation: none; /* Sem animação por padrão */
				display: block;
			}
			
			.psv-callout.psv-callout--active .psv-callout__vline-down {
				opacity: 1; /* Torna visível quando ativo */
				animation: vline-grow-down 0.6s ease-out forwards;
			}
			
			.psv-callout.psv-callout--exiting .psv-callout__vline-down {
				animation: vline-shrink-down 0.3s ease-in forwards;
			}

			/* ========== ESTILOS DO TEXTO ========== */
			.psv-callout__text-down {
				opacity: 0; /* Estado inicial sempre oculto */
				color: #fff;
				background: #000;
				border-radius: 2px;
				padding: 4px 10px;
				font-size: 15px;
				font-family: Arial, Helvetica, sans-serif;
				white-space: nowrap;
				box-shadow: 0 2px 8px rgba(0,0,0,0.18);
				display: inline-block;
				animation-fill-mode: both;
				transform: translateY(-30px); /* Estado inicial fora da tela */
				animation: none; /* Sem animação por padrão */
			}
			
			.psv-callout.psv-callout--active .psv-callout__text-down {
				animation: flag-slide-in-down 0.5s 0.6s cubic-bezier(.4,1.4,.6,1) both;
			}
			
			.psv-callout.psv-callout--exiting .psv-callout__text-down {
				animation: flag-slide-out-down 0.2s cubic-bezier(.4,1.4,.6,1) both;
			}
		</style>

		<!-- ========== ESTRUTURA HTML DO CALLOUT (DOWN) ========== -->
		<div style="position: relative; display: flex; flex-direction: column; align-items: center; min-width: 120px; min-height: ${lineWidth + 60}px;">
			
			<!-- Círculo principal com animação pulsante (no topo) -->
			<div style="position: absolute; top: ${-main / 2}px; left: 50%; transform: translateX(-50%); width: ${main}px; height: ${main}px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; z-index:2;">
				<!-- Círculo pulsante (animação grow-fade) -->
				<div style="position: absolute; width: ${main - 2 * borderSize}px; height: ${main - 2 * borderSize}px; border-radius: 50%; border: ${borderSize}px solid #fff; background: transparent; opacity: 0.5; animation: grow-fade 1.6s infinite;"></div>
				<!-- Círculo principal -->
				<div style="position: relative; width: ${main}px; height: ${main}px; border-radius: 50%; background: #fff; box-shadow: 0 2px 8px rgba(0,0,0,0.18);"></div>
			</div>
			
			<!-- Linha vertical (do círculo ao texto) -->
			<div style="position: absolute; top: ${0}px; left: 50%; transform: translateX(-50%); width: 2px; height: ${lineWidth}px; pointer-events: none;">
				<div class="psv-callout__vline-down" style="width: 2px; height: ${lineWidth}px;"></div>
			</div>
			
			<!-- Texto do callout (embaixo) -->
			<div style="position: absolute; top: ${lineWidth + 8}px; left: 50%; transform: translateX(-50%); display: flex; justify-content: center;">
				<span class="psv-callout__text-down">${text}</span>
			</div>
			
		</div>
	`;

		case "SE":
			return `
		<style>
			/* ========== ANIMAÇÕES KEYFRAMES ========== */
			@keyframes grow-fade {
				0% { transform: scale(1); opacity: 0.6; }
				70% { transform: scale(2.2); opacity: 0; }
				100% { transform: scale(2.2); opacity: 0; }
			}
			
			@keyframes diagonal-line-grow-se {
				0% { transform: scaleX(0); opacity: 0; }
				100% { transform: scaleX(1); opacity: 1; }
			}
			
			@keyframes diagonal-line-shrink-se {
				0% { transform: scaleX(1); opacity: 1; }
				100% { transform: scaleX(0); opacity: 0; }
			}
			
			@keyframes vline-grow {
				0% { height: 0; opacity: 0; }
				100% { height: 32px; opacity: 1; }
			}
			
			@keyframes vline-shrink {
				0% { height: 32px; opacity: 1; }
				100% { height: 0; opacity: 0; }
			}
			
			@keyframes flag-slide-in-se {
				0% { opacity: 0; transform: translate(-20px, -20px); }
				100% { opacity: 1; transform: translate(0, 0); }
			}
			
			@keyframes flag-slide-out-se {
				0% { opacity: 1; transform: translate(0, 0); }
				100% { opacity: 0; transform: translate(-20px, -20px); }
			}

			/* ========== ESTILOS DA LINHA DIAGONAL ========== */
			.psv-callout__diagonal-line-se {
				background: #fff;
				width: 100%;
				height: 100%;
				opacity: 0; /* Estado inicial sempre oculto */
				border-radius: 1px;
				transform-origin: left center; /* Cresce da esquerda */
				transform: scaleX(0); /* Estado inicial sem largura */
				animation: none; /* Sem animação por padrão */
				display: block;
			}
			
			.psv-callout.psv-callout--active .psv-callout__diagonal-line-se {
				opacity: 1; /* Torna visível quando ativo */
				animation: diagonal-line-grow-se 0.6s ease-out forwards;
			}
			
			.psv-callout.psv-callout--exiting .psv-callout__diagonal-line-se {
				animation: diagonal-line-shrink-se 0.3s ease-in forwards;
			}

			/* ========== ESTILOS DA LINHA VERTICAL ========== */
			.psv-callout__vline-se {
				background: #fff;
				width: 2px;
				height: 0; /* Estado inicial sempre oculto */
				opacity: 0; /* Adiciona opacity 0 para garantir que esteja oculto */
				border-radius: 1px;
				animation: none; /* Sem animação por padrão */
				display: block;
			}
			
			.psv-callout.psv-callout--active .psv-callout__vline-se {
				opacity: 1; /* Torna visível quando ativo */
				animation: vline-grow 0.4s 0.6s cubic-bezier(.4,1.4,.6,1) forwards; /* Delay para aparecer após a linha diagonal terminar */
			}
			
			.psv-callout.psv-callout--exiting .psv-callout__vline-se {
				animation: vline-shrink 0.2s cubic-bezier(.4,1.4,.6,1) forwards;
			}

			/* ========== ESTILOS DO TEXTO ========== */
			.psv-callout__text-se {
				opacity: 0; /* Estado inicial sempre oculto */
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
				transform: translate(-20px, -20px); /* Estado inicial fora da tela */
				animation: none; /* Sem animação por padrão */
			}
			
			.psv-callout.psv-callout--active .psv-callout__text-se {
				animation: flag-slide-in-se 0.5s 0.6s cubic-bezier(.4,1.4,.6,1) both;
			}
			
			.psv-callout.psv-callout--exiting .psv-callout__text-se {
				animation: flag-slide-out-se 0.2s cubic-bezier(.4,1.4,.6,1) both;
			}
		</style>

		<!-- ========== ESTRUTURA HTML DO CALLOUT (SE - SOUTHEAST) ========== -->
		<div style="position: relative; display: flex; align-items: flex-start; min-width: 120px; min-height: 60px;">
			
			<!-- Círculo principal com animação pulsante -->
			<div style="position: absolute; top: ${-main / 2}px; left: ${-main / 2}px; width: ${main}px; height: ${main}px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; z-index:2;">
				<!-- Círculo pulsante (animação grow-fade) -->
				<div style="position: absolute; width: ${main - 2 * borderSize}px; height: ${main - 2 * borderSize}px; border-radius: 50%; border: ${borderSize}px solid #fff; background: transparent; opacity: 0.5; animation: grow-fade 1.6s infinite;"></div>
				<!-- Círculo principal -->
				<div style="position: relative; width: ${main}px; height: ${main}px; border-radius: 50%; background: #fff; box-shadow: 0 2px 8px rgba(0,0,0,0.18);"></div>
			</div>
			
			<!-- Linha diagonal (indo para sudeste) -->
			<div style="position: absolute; left: ${0}px; top: ${0}px; width: ${lineWidth}px; height: 2px; pointer-events: none; transform-origin: left center; transform: rotate(45deg);">
				<div class="psv-callout__diagonal-line-se" style="width: 100%; height: 100%;"></div>
			</div>
			
			<!-- Linha vertical (no final da linha diagonal) -->
			<div style="position: absolute; left: ${lineWidth * Math.cos(Math.PI / 4) - 1}px; top: ${lineWidth * Math.sin(Math.PI / 4) - 16}px; width: 2px; height: 32px; pointer-events: none;">
				<div class="psv-callout__vline-se" style="width: 2px; height: 0; opacity: 0;"></div>
			</div>
			
			<!-- Texto do callout -->
			<span class="psv-callout__text-se" style="position: absolute; left: ${lineWidth * Math.cos(Math.PI / 4) + 8}px; top: ${lineWidth * Math.sin(Math.PI / 4) - 12}px; transform: translateX(-50%);">${text}</span>
			
		</div>
	`;

		case "NE":
			return `
		<style>
			/* ========== ANIMAÇÕES KEYFRAMES ========== */
			@keyframes grow-fade {
				0% { transform: scale(1); opacity: 0.6; }
				70% { transform: scale(2.2); opacity: 0; }
				100% { transform: scale(2.2); opacity: 0; }
			}
			
			@keyframes diagonal-line-grow-ne {
				0% { transform: scaleX(0); opacity: 0; }
				100% { transform: scaleX(1); opacity: 1; }
			}
			
			@keyframes diagonal-line-shrink-ne {
				0% { transform: scaleX(1); opacity: 1; }
				100% { transform: scaleX(0); opacity: 0; }
			}
			
			@keyframes vline-grow {
				0% { height: 0; opacity: 0; }
				100% { height: 32px; opacity: 1; }
			}
			
			@keyframes vline-shrink {
				0% { height: 32px; opacity: 1; }
				100% { height: 0; opacity: 0; }
			}
			
			@keyframes flag-slide-in-ne {
				0% { opacity: 0; transform: translate(-20px, 20px); }
				100% { opacity: 1; transform: translate(0, 0); }
			}
			
			@keyframes flag-slide-out-ne {
				0% { opacity: 1; transform: translate(0, 0); }
				100% { opacity: 0; transform: translate(-20px, 20px); }
			}

			/* ========== ESTILOS DA LINHA DIAGONAL ========== */
			.psv-callout__diagonal-line-ne {
				background: #fff;
				width: 100%;
				height: 100%;
				opacity: 0; /* Estado inicial sempre oculto */
				border-radius: 1px;
				transform-origin: left center; /* Cresce da esquerda */
				transform: scaleX(0); /* Estado inicial sem largura */
				animation: none; /* Sem animação por padrão */
				display: block;
			}
			
			.psv-callout.psv-callout--active .psv-callout__diagonal-line-ne {
				opacity: 1; /* Torna visível quando ativo */
				animation: diagonal-line-grow-ne 0.6s ease-out forwards;
			}
			
			.psv-callout.psv-callout--exiting .psv-callout__diagonal-line-ne {
				animation: diagonal-line-shrink-ne 0.3s ease-in forwards;
			}

			/* ========== ESTILOS DA LINHA VERTICAL ========== */
			.psv-callout__vline-ne {
				background: #fff;
				width: 2px;
				height: 0; /* Estado inicial sempre oculto */
				opacity: 0; /* Adiciona opacity 0 para garantir que esteja oculto */
				border-radius: 1px;
				animation: none; /* Sem animação por padrão */
				display: block;
			}
			
			.psv-callout.psv-callout--active .psv-callout__vline-ne {
				opacity: 1; /* Torna visível quando ativo */
				animation: vline-grow 0.4s 0.6s cubic-bezier(.4,1.4,.6,1) forwards; /* Delay para aparecer após a linha diagonal terminar */
			}
			
			.psv-callout.psv-callout--exiting .psv-callout__vline-ne {
				animation: vline-shrink 0.2s cubic-bezier(.4,1.4,.6,1) forwards;
			}

			/* ========== ESTILOS DO TEXTO ========== */
			.psv-callout__text-ne {
				opacity: 0; /* Estado inicial sempre oculto */
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
				transform: translate(-20px, 20px); /* Estado inicial fora da tela */
				animation: none; /* Sem animação por padrão */
			}
			
			.psv-callout.psv-callout--active .psv-callout__text-ne {
				animation: flag-slide-in-ne 0.5s 0.6s cubic-bezier(.4,1.4,.6,1) both;
			}
			
			.psv-callout.psv-callout--exiting .psv-callout__text-ne {
				animation: flag-slide-out-ne 0.2s cubic-bezier(.4,1.4,.6,1) both;
			}
		</style>

		<!-- ========== ESTRUTURA HTML DO CALLOUT (NE - NORTHEAST) ========== -->
		<div style="position: relative; display: flex; align-items: flex-end; min-width: 120px; min-height: 60px;">
			
			<!-- Círculo principal com animação pulsante -->
			<div style="position: absolute; bottom: ${-main / 2}px; left: ${-main / 2}px; width: ${main}px; height: ${main}px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; z-index:2;">
				<!-- Círculo pulsante (animação grow-fade) -->
				<div style="position: absolute; width: ${main - 2 * borderSize}px; height: ${main - 2 * borderSize}px; border-radius: 50%; border: ${borderSize}px solid #fff; background: transparent; opacity: 0.5; animation: grow-fade 1.6s infinite;"></div>
				<!-- Círculo principal -->
				<div style="position: relative; width: ${main}px; height: ${main}px; border-radius: 50%; background: #fff; box-shadow: 0 2px 8px rgba(0,0,0,0.18);"></div>
			</div>
			
			<!-- Linha diagonal (indo para nordeste) -->
			<div style="position: absolute; left: ${0}px; bottom: ${0}px; width: ${lineWidth}px; height: 2px; pointer-events: none; transform-origin: left center; transform: rotate(-45deg);">
				<div class="psv-callout__diagonal-line-ne" style="width: 100%; height: 100%;"></div>
			</div>
			
			<!-- Linha vertical (no final da linha diagonal) -->
			<div style="position: absolute; left: ${lineWidth * Math.cos(-Math.PI / 4) - 1}px; bottom: ${-lineWidth * Math.sin(-Math.PI / 4) - 16}px; width: 2px; height: 32px; pointer-events: none;">
				<div class="psv-callout__vline-ne" style="width: 2px; height: 0; opacity: 0;"></div>
			</div>
			
			<!-- Texto do callout -->
			<span class="psv-callout__text-ne" style="position: absolute; left: ${lineWidth * Math.cos(-Math.PI / 4) + 8}px; bottom: ${-lineWidth * Math.sin(-Math.PI / 4) - 12}px; transform: translateX(-50%);">${text}</span>
			
		</div>
	`;

		case "NW":
			return `
		<style>
			/* ========== ANIMAÇÕES KEYFRAMES ========== */
			@keyframes grow-fade {
				0% { transform: scale(1); opacity: 0.6; }
				70% { transform: scale(2.2); opacity: 0; }
				100% { transform: scale(2.2); opacity: 0; }
			}
			
			@keyframes diagonal-line-grow-nw {
				0% { transform: scaleX(0); opacity: 0; }
				100% { transform: scaleX(1); opacity: 1; }
			}
			
			@keyframes diagonal-line-shrink-nw {
				0% { transform: scaleX(1); opacity: 1; }
				100% { transform: scaleX(0); opacity: 0; }
			}
			
			@keyframes vline-grow {
				0% { height: 0; opacity: 0; }
				100% { height: 32px; opacity: 1; }
			}
			
			@keyframes vline-shrink {
				0% { height: 32px; opacity: 1; }
				100% { height: 0; opacity: 0; }
			}
			
			@keyframes flag-slide-in-nw {
				0% { opacity: 0; transform: translate(20px, 20px); }
				100% { opacity: 1; transform: translate(0, 0); }
			}
			
			@keyframes flag-slide-out-nw {
				0% { opacity: 1; transform: translate(0, 0); }
				100% { opacity: 0; transform: translate(20px, 20px); }
			}

			/* ========== ESTILOS DA LINHA DIAGONAL ========== */
			.psv-callout__diagonal-line-nw {
				background: #fff;
				width: 100%;
				height: 100%;
				opacity: 0; /* Estado inicial sempre oculto */
				border-radius: 1px;
				transform-origin: right center; /* Cresce da direita para esquerda */
				transform: scaleX(0); /* Estado inicial sem largura */
				animation: none; /* Sem animação por padrão */
				display: block;
			}
			
			.psv-callout.psv-callout--active .psv-callout__diagonal-line-nw {
				opacity: 1; /* Torna visível quando ativo */
				animation: diagonal-line-grow-nw 0.6s ease-out forwards;
			}
			
			.psv-callout.psv-callout--exiting .psv-callout__diagonal-line-nw {
				animation: diagonal-line-shrink-nw 0.3s ease-in forwards;
			}

			/* ========== ESTILOS DA LINHA VERTICAL ========== */
			.psv-callout__vline-nw {
				background: #fff;
				width: 2px;
				height: 0; /* Estado inicial sempre oculto */
				opacity: 0; /* Adiciona opacity 0 para garantir que esteja oculto */
				border-radius: 1px;
				animation: none; /* Sem animação por padrão */
				display: block;
			}
			
			.psv-callout.psv-callout--active .psv-callout__vline-nw {
				opacity: 1; /* Torna visível quando ativo */
				animation: vline-grow 0.4s 0.6s cubic-bezier(.4,1.4,.6,1) forwards; /* Delay para aparecer após a linha diagonal terminar */
			}
			
			.psv-callout.psv-callout--exiting .psv-callout__vline-nw {
				animation: vline-shrink 0.2s cubic-bezier(.4,1.4,.6,1) forwards;
			}

			/* ========== ESTILOS DO TEXTO ========== */
			.psv-callout__text-nw {
				opacity: 0; /* Estado inicial sempre oculto */
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
				transform: translate(20px, 20px); /* Estado inicial fora da tela */
				animation: none; /* Sem animação por padrão */
			}
			
			.psv-callout.psv-callout--active .psv-callout__text-nw {
				animation: flag-slide-in-nw 0.5s 0.6s cubic-bezier(.4,1.4,.6,1) both;
			}
			
			.psv-callout.psv-callout--exiting .psv-callout__text-nw {
				animation: flag-slide-out-nw 0.2s cubic-bezier(.4,1.4,.6,1) both;
			}
		</style>

		<!-- ========== ESTRUTURA HTML DO CALLOUT (NW - NORTHWEST) ========== -->
		<div style="position: relative; display: flex; align-items: flex-start; min-width: 120px; min-height: 60px;">
			
			<!-- Círculo principal com animação pulsante -->
			<div style="position: absolute; top: ${-main / 2}px; right: ${-main / 2}px; width: ${main}px; height: ${main}px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; z-index:2;">
				<!-- Círculo pulsante (animação grow-fade) -->
				<div style="position: absolute; width: ${main - 2 * borderSize}px; height: ${main - 2 * borderSize}px; border-radius: 50%; border: ${borderSize}px solid #fff; background: transparent; opacity: 0.5; animation: grow-fade 1.6s infinite;"></div>
				<!-- Círculo principal -->
				<div style="position: relative; width: ${main}px; height: ${main}px; border-radius: 50%; background: #fff; box-shadow: 0 2px 8px rgba(0,0,0,0.18);"></div>
			</div>
			
			<!-- Linha diagonal (indo para noroeste) -->
			<div style="position: absolute; right: ${0}px; top: ${0}px; width: ${lineWidth}px; height: 2px; pointer-events: none; transform-origin: right center; transform: rotate(45deg);">
				<div class="psv-callout__diagonal-line-nw" style="width: 100%; height: 100%;"></div>
			</div>
			
			<!-- Linha vertical (no final da linha diagonal) -->
			<div style="position: absolute; right: ${lineWidth * Math.cos(Math.PI / 4) - 1}px; top: ${-lineWidth * Math.sin(Math.PI / 4) - 16}px; width: 2px; height: 32px; pointer-events: none;">
				<div class="psv-callout__vline-nw" style="width: 2px; height: 0; opacity: 0;"></div>
			</div>
			
			<!-- Texto do callout -->
			<span class="psv-callout__text-nw" style="position: absolute; right: ${lineWidth * Math.cos(Math.PI / 4) + 8}px; top: ${-lineWidth * Math.sin(Math.PI / 4) - 12}px; transform: translateX(50%);">${text}</span>
			
		</div>
	`;

		case "SW":
			return `
		<style>
			/* ========== ANIMAÇÕES KEYFRAMES ========== */
			@keyframes grow-fade {
				0% { transform: scale(1); opacity: 0.6; }
				70% { transform: scale(2.2); opacity: 0; }
				100% { transform: scale(2.2); opacity: 0; }
			}
			
			@keyframes diagonal-line-grow-sw {
				0% { transform: scaleX(0); opacity: 0; }
				100% { transform: scaleX(1); opacity: 1; }
			}
			
			@keyframes diagonal-line-shrink-sw {
				0% { transform: scaleX(1); opacity: 1; }
				100% { transform: scaleX(0); opacity: 0; }
			}
			
			@keyframes vline-grow {
				0% { height: 0; opacity: 0; }
				100% { height: 32px; opacity: 1; }
			}
			
			@keyframes vline-shrink {
				0% { height: 32px; opacity: 1; }
				100% { height: 0; opacity: 0; }
			}
			
			@keyframes flag-slide-in-sw {
				0% { opacity: 0; transform: translate(20px, -20px); }
				100% { opacity: 1; transform: translate(0, 0); }
			}
			
			@keyframes flag-slide-out-sw {
				0% { opacity: 1; transform: translate(0, 0); }
				100% { opacity: 0; transform: translate(20px, -20px); }
			}

			/* ========== ESTILOS DA LINHA DIAGONAL ========== */
			.psv-callout__diagonal-line-sw {
				background: #fff;
				width: 100%;
				height: 100%;
				opacity: 0; /* Estado inicial sempre oculto */
				border-radius: 1px;
				transform-origin: right center; /* Cresce da direita para esquerda */
				transform: scaleX(0); /* Estado inicial sem largura */
				animation: none; /* Sem animação por padrão */
				display: block;
			}
			
			.psv-callout.psv-callout--active .psv-callout__diagonal-line-sw {
				opacity: 1; /* Torna visível quando ativo */
				animation: diagonal-line-grow-sw 0.6s ease-out forwards;
			}
			
			.psv-callout.psv-callout--exiting .psv-callout__diagonal-line-sw {
				animation: diagonal-line-shrink-sw 0.3s ease-in forwards;
			}

			/* ========== ESTILOS DA LINHA VERTICAL ========== */
			.psv-callout__vline-sw {
				background: #fff;
				width: 2px;
				height: 0; /* Estado inicial sempre oculto */
				opacity: 0; /* Adiciona opacity 0 para garantir que esteja oculto */
				border-radius: 1px;
				animation: none; /* Sem animação por padrão */
				display: block;
			}
			
			.psv-callout.psv-callout--active .psv-callout__vline-sw {
				opacity: 1; /* Torna visível quando ativo */
				animation: vline-grow 0.4s 0.6s cubic-bezier(.4,1.4,.6,1) forwards; /* Delay para aparecer após a linha diagonal terminar */
			}
			
			.psv-callout.psv-callout--exiting .psv-callout__vline-sw {
				animation: vline-shrink 0.2s cubic-bezier(.4,1.4,.6,1) forwards;
			}

			/* ========== ESTILOS DO TEXTO ========== */
			.psv-callout__text-sw {
				opacity: 0; /* Estado inicial sempre oculto */
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
				transform: translate(20px, -20px); /* Estado inicial fora da tela */
				animation: none; /* Sem animação por padrão */
			}
			
			.psv-callout.psv-callout--active .psv-callout__text-sw {
				animation: flag-slide-in-sw 0.5s 0.6s cubic-bezier(.4,1.4,.6,1) both;
			}
			
			.psv-callout.psv-callout--exiting .psv-callout__text-sw {
				animation: flag-slide-out-sw 0.2s cubic-bezier(.4,1.4,.6,1) both;
			}
		</style>

		<!-- ========== ESTRUTURA HTML DO CALLOUT (SW - SOUTHWEST) ========== -->
		<div style="position: relative; display: flex; align-items: flex-start; min-width: 120px; min-height: 60px;">
			
			<!-- Círculo principal com animação pulsante -->
			<div style="position: absolute; top: ${-main / 2}px; right: ${-main / 2}px; width: ${main}px; height: ${main}px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; z-index:2;">
				<!-- Círculo pulsante (animação grow-fade) -->
				<div style="position: absolute; width: ${main - 2 * borderSize}px; height: ${main - 2 * borderSize}px; border-radius: 50%; border: ${borderSize}px solid #fff; background: transparent; opacity: 0.5; animation: grow-fade 1.6s infinite;"></div>
				<!-- Círculo principal -->
				<div style="position: relative; width: ${main}px; height: ${main}px; border-radius: 50%; background: #fff; box-shadow: 0 2px 8px rgba(0,0,0,0.18);"></div>
			</div>
			
			<!-- Linha diagonal (indo para sudoeste) -->
			<div style="position: absolute; right: ${0}px; top: ${0}px; width: ${lineWidth}px; height: 2px; pointer-events: none; transform-origin: right center; transform: rotate(-45deg);">
				<div class="psv-callout__diagonal-line-sw" style="width: 100%; height: 100%;"></div>
			</div>
			
			<!-- Linha vertical (no final da linha diagonal) -->
			<div style="position: absolute; right: ${lineWidth * Math.cos(-Math.PI / 4) - 1}px; top: ${-lineWidth * Math.sin(-Math.PI / 4) - 16}px; width: 2px; height: 32px; pointer-events: none;">
				<div class="psv-callout__vline-sw" style="width: 2px; height: 0; opacity: 0;"></div>
			</div>
			
			<!-- Texto do callout -->
			<span class="psv-callout__text-sw" style="position: absolute; right: ${lineWidth * Math.cos(-Math.PI / 4) + 8}px; top: ${-lineWidth * Math.sin(-Math.PI / 4) - 8}px; transform: translateX(50%);">${text}</span>
			
		</div>
	`;

		default:
			return `<div>Invalid direction: "${direction}"</div>`;
	}
}

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
