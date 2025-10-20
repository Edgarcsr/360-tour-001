import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ClipboardCopyIcon } from "lucide-react";

interface CrosshairProps {
	enabled: boolean;
	camera: { yaw: number; pitch: number } | null;
}

export function Crosshair({ enabled, camera }: CrosshairProps) {
	const [visible, setVisible] = useState(false);
	const [copied, setCopied] = useState(false);

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

			<div className="absolute -translate-y-12 text-sm text-white/90 bg-black/40 px-2 py-1 rounded backdrop-blur-sm flex items-center gap-2 pointer-events-auto">
				<div className="select-none">yaw: {yaw}° • pitch: {pitch}°</div>
				<Button
					variant="ghost"
					size="icon"
					className="p-0.5"
					onClick={async () => {
						// Format yaw/pitch as strings like "300.5deg"
						const y = (camera ? camera.yaw : 0).toFixed(1) + "deg";
						const p = (camera ? camera.pitch : 0).toFixed(1) + "deg";
						const text = `position: { yaw: \"${y}\", pitch: \"${p}\" },`;
						try {
							await navigator.clipboard.writeText(text);
							setCopied(true);
							setTimeout(() => setCopied(false), 1500);
						} catch (err) {
							// Fallback for older browsers
							const ta = document.createElement("textarea");
							ta.value = text;
							document.body.appendChild(ta);
							ta.select();
							try {
								document.execCommand("copy");
								setCopied(true);
								setTimeout(() => setCopied(false), 1500);
							} catch (_e) {
								// ignore
							}
							document.body.removeChild(ta);
						}
					}}
				>
					{copied ? (
						<span className="text-xs">copied</span>
					) : (
						<ClipboardCopyIcon size={16} />
					)}
				</Button>
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
