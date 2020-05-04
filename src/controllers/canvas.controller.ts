import { Point } from "../models/";

export function updateAxisLabels(
  e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
): Point {
  const rect = document.getElementById("canvas")?.getBoundingClientRect();

  return {
    x: Math.round(e.clientX - (rect?.left || 0)),
    y: Math.round(e.clientY - (rect?.top || 0)),
  };
}
