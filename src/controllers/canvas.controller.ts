import { Point } from "../models/";
import { ShapeStore } from "../store/shape";

export function getMousePosition(
  e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
): Point {
  const rect = document.getElementById("canvas")?.getBoundingClientRect();

  return {
    x: Math.round(e.clientX - (rect?.left || 0)),
    y: Math.round(e.clientY - (rect?.top || 0)),
  };
}

export function renderObjects(
  { onCanvas, selected, axis }: ShapeStore,
  canvas: HTMLCanvasElement,
  width: number = 960,
  height: number = 720
) {
  const SHAPE_COLOR = "black";
  const SELECTED_COLOR = "#D50000";
  const AXIS_COLOR = "#000000";

  const canvasCtx = canvas.getContext("2d")!;
  const onCanvasValues = Object.values(onCanvas);
  const selectedObj = Object.values(selected);

  canvasCtx.clearRect(0, 0, width, height);

  canvasCtx.strokeStyle = AXIS_COLOR;
  for (const obj of axis) {
    obj.draw(canvasCtx);
  }

  canvasCtx.strokeStyle = SHAPE_COLOR;
  for (const obj of onCanvasValues) {
    obj.shape.draw(canvasCtx);
  }

  canvasCtx.strokeStyle = SELECTED_COLOR;
  for (const obj of selectedObj) {
    obj.shape.draw(canvasCtx);
  }
}
