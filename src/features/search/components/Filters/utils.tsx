import type { MouseEvent } from "react";

export const handlePointerMove = (event: MouseEvent<HTMLButtonElement>) => {
  const el = event.currentTarget;
  const rect = el.getBoundingClientRect();
  const px = (event.clientX - rect.left) / rect.width; // 0 -> 1
  const py = (event.clientY - rect.top) / rect.height;

  const tiltX = (py - 0.5) * -34; // degrés
  const tiltY = (px - 0.5) * 34;

  el.style.setProperty("--tiltX", `${tiltX.toFixed(2)}deg`);
  el.style.setProperty("--tiltY", `${tiltY.toFixed(2)}deg`);
  el.style.setProperty("--glowX", `${(px * 100).toFixed(1)}%`);
  el.style.setProperty("--glowY", `${(py * 100).toFixed(1)}%`);
};

export const resetTilt = (event: MouseEvent<HTMLButtonElement>) => {
  const el = event.currentTarget;
  el.style.setProperty("--tiltX", "0deg");
  el.style.setProperty("--tiltY", "0deg");
};
