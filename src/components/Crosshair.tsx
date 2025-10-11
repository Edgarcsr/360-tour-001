import { useEffect, useState } from "react";

interface CrosshairProps {
	enabled: boolean;
	camera: { yaw: number; pitch: number } | null;
}

export function Crosshair({ enabled, camera }: CrosshairProps) {
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		setVisible(enabled);
	}, [enabled]);

	if (!visible) return null;

	const yaw = camera ? camera.yaw.toFixed(1) : "0.0";
	const pitch = camera ? camera.pitch.toFixed(1) : "0.0";

	return (
		<div
			className="pointer-events-none fixed inset-0 flex items-center justify-center z-20"
			aria-hidden
		>
			<div className="absolute -translate-y-12 text-sm text-white/90 bg-black/40 px-2 py-1 rounded backdrop-blur-sm">
				yaw: {yaw}° • pitch: {pitch}°
			</div>
			<div className="w-8 h-8 flex items-center justify-center">
				<div className="absolute w-0.5 h-6 bg-white/90" />
				<div className="absolute w-6 h-0.5 bg-white/90" />
				<div className="w-2 h-2 rounded-full bg-white/90" />
			</div>
		</div>
	);
}

export default Crosshair;
