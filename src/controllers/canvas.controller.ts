import { Point, Shape } from "../models/";
import { onCanvasInterface } from "../store/shape";

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
  onCanvas: onCanvasInterface[],
  axis: Shape[],
  bufferPoints: Point[],
  canvas: HTMLCanvasElement,
  width: number = 960,
  height: number = 720
) {
  const SHAPE_COLOR = "black";
  const SELECTED_COLOR = "#D50000";
  const AXIS_COLOR = "#000000";
  const POINT_COLOR = "red";

  const canvasCtx = canvas.getContext("2d")!;
  const onCanvasValues = onCanvas.filter((obj) => {
    return !obj.selected;
  });
  const selectedObj = onCanvasValues.filter((obj) => {
    return obj.selected;
  });

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

  canvasCtx.fillStyle = POINT_COLOR;
  for (const point of bufferPoints) {
    canvasCtx.fillRect(point.x, point.y, 3, 3);
  }
}
