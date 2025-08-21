// Tipos para os callouts
export interface CalloutConfig {
	id: string;
	position: { yaw: string; pitch: string };
	text: string;
	anchor?: string;
	direction?: "right" | "left" | "up" | "down";
}

// Função para gerar HTML do callout baseado na direção
const generateCalloutHTML = (
	text: string,
	direction: "right" | "left" | "up" | "down" = "right",
) => {
	const ballStyle =
		"width: 18px; height: 18px; background: #fff; border-radius: 50%; box-shadow: 0 2px 6px rgba(0,0,0,0.2);";
	const textStyle =
		"background: #222 !important; color: #fff !important; border-radius: 8px !important; font-size: 1.1em !important; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3) !important; overflow: hidden; padding: 12px 16px; font-family: 'Arial', 'Helvetica', sans-serif; font-weight: 500;";

	switch (direction) {
		case "right":
			return `
        <div style="display: flex; align-items: center; pointer-events: auto;">
          <div style="${ballStyle}"></div>
          <div style="width: 32px; height: 2px; background: #fff; margin: 0;"></div>
          <div style="${textStyle} margin-left: 0;">
            ${text}
          </div>
        </div>
      `;
		case "left":
			return `
        <div style="display: flex; align-items: center; pointer-events: auto;">
          <div style="${textStyle} margin-right: 0;">
            ${text}
          </div>
          <div style="width: 32px; height: 2px; background: #fff; margin: 0;"></div>
          <div style="${ballStyle}"></div>
        </div>
      `;
		case "up":
			return `
        <div style="display: flex; flex-direction: column; align-items: center; pointer-events: auto;">
          <div style="${textStyle} margin-bottom: 0;">
            ${text}
          </div>
          <div style="width: 2px; height: 32px; background: #fff; margin: 0;"></div>
          <div style="${ballStyle}"></div>
        </div>
      `;
		case "down":
			return `
        <div style="display: flex; flex-direction: column; align-items: center; pointer-events: auto;">
          <div style="${ballStyle}"></div>
          <div style="width: 2px; height: 32px; background: #fff; margin: 0;"></div>
          <div style="${textStyle} margin-top: 0;">
            ${text}
          </div>
        </div>
      `;
	}
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
});
