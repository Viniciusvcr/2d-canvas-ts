import { Point } from "../models/types";

export function updateAxisLabels(
  e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
): Point {
  const rect = document.getElementById("canvas")?.getBoundingClientRect();

  return {
    x: e.clientX - (rect?.left || 0),
    y: e.clientY - (rect?.top || 0),
  };
}
