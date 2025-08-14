import Phaser from "phaser";

export const rgbToHex = (rgb: [number, number, number]) => {
  const [r, g, b] = rgb;
  return Phaser.Display.Color.GetColor(r, g, b);
}

export const formatTime = (seconds: number): string => {
  const totalSeconds = Math.floor(seconds); // убиваем дробную часть
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}
