import { Point, Circle, Line, Rectangle, Triangle, Shape } from "../models";
import Operation from "../commands/Operation";
import DrawObjectCommand from "../commands/DrawObjectCommand";
import { ShapeAction, onCanvasInterface } from "../store/shape";
import DeleteCommand from "../commands/DeleteCommand";
import ClearCommand from "../commands/ClearCommand";
import SelectAllCommand from "../commands/SelectAllCommand";
import UnselectAllCommand from "../commands/UnselectAllCommand";
import TranslationCommand from "../commands/TranslationCommand";
import ScaleCommand from "../commands/ScaleCommand";
import RotationCommand from "../commands/RotationCommand";
import ZoomExtendCommand from "../commands/ZoomExtendCommand";
import ZoomCommand from "../commands/ZoomCommand";
import { MouseAction } from "../store/mouse";

const operation = Operation.getInstance();

export function addKeyboardShortcuts(
  mouseDispatcher: React.Dispatch<MouseAction>
) {
  function dispatch(createFn: Function, pointsRequired: number) {
    mouseDispatcher({
      type: "INIT_DRAWING",
      createFn,
      pointsRequired,
    });
  }

  document.addEventListener("keydown", (event) => {
    switch (event.key) {
      case "Escape":
        mouseDispatcher({
          type: "CANCEL_DRAWING",
        });
        break;

      case "l":
        dispatch(createLine, 2);
        break;

      case "r":
        dispatch(createRectangle, 2);
        break;

      case "t":
        dispatch(createTriangle, 3);
        break;

      case "c":
        dispatch(createCircle, 2);
        break;
    }
  });
}

export function createCircle(
  [p1, p2]: Point[],
  shapeDispatcher: React.Dispatch<ShapeAction>
) {
  operation.executeCommand(
    new DrawObjectCommand(new Circle(p1, p2), shapeDispatcher)
  );
}

export function createLine(
  [p1, p2]: Point[],
  shapeDispatcher: React.Dispatch<ShapeAction>
) {
  operation.executeCommand(
    new DrawObjectCommand(new Line(p1, p2), shapeDispatcher)
  );
}

export function createRectangle(
  [p1, p2]: Point[],
  shapeDispatcher: React.Dispatch<ShapeAction>
) {
  operation.executeCommand(
    new DrawObjectCommand(new Rectangle(p1, p2), shapeDispatcher)
  );
}

export function createTriangle(
  [p1, p2, p3]: Point[],
  shapeDispatcher: React.Dispatch<ShapeAction>
) {
  operation.executeCommand(
    new DrawObjectCommand(new Triangle(p1, p2, p3), shapeDispatcher)
  );
}

export function deleteShape(
  id: string,
  obj: Shape,
  dispatcher: React.Dispatch<ShapeAction>
) {
  operation.executeCommand(new DeleteCommand(id, obj, dispatcher));
}

export function clearCanvas(
  actualCanvas: onCanvasInterface,
  shapeDispatcher: React.Dispatch<ShapeAction>
) {
  operation.executeCommand(new ClearCommand(actualCanvas, shapeDispatcher));
}

export function undoCommand() {
  operation.undoCommand();
}

export function redoCommand() {
  operation.redoCommand();
}

export function selectAll(
  onCanvas: onCanvasInterface,
  shapeDispatcher: React.Dispatch<ShapeAction>
) {
  operation.executeCommand(new SelectAllCommand(onCanvas, shapeDispatcher));
}

export function unselectAll(
  onCanvas: onCanvasInterface,
  shapeDispatcher: React.Dispatch<ShapeAction>
) {
  operation.executeCommand(new UnselectAllCommand(onCanvas, shapeDispatcher));
}

export function translate(
  points: Point[],
  onCanvas: onCanvasInterface,
  shapeDispatcher: React.Dispatch<ShapeAction>
) {
  operation.executeCommand(
    new TranslationCommand(points, onCanvas, shapeDispatcher)
  );
}

export function scale(
  sx: number,
  sy: number,
  onCanvas: onCanvasInterface,
  shapeDispatcher: React.Dispatch<ShapeAction>
) {
  operation.executeCommand(new ScaleCommand(sx, sy, onCanvas, shapeDispatcher));
}

export function rotation(
  theta: number,
  x: number,
  y: number,
  onCanvas: onCanvasInterface,
  shapeDispatcher: React.Dispatch<ShapeAction>
) {
  operation.executeCommand(
    new RotationCommand(theta, x, y, onCanvas, shapeDispatcher)
  );
}

export function zoomExtend(
  xyMin: Point,
  xyMax: Point,
  uvMin: Point,
  uvMax: Point,
  shapeDispatcher: React.Dispatch<ShapeAction>,
  onCanvas: onCanvasInterface
) {
  operation.executeCommand(
    new ZoomExtendCommand(xyMin, xyMax, uvMin, uvMax, shapeDispatcher, onCanvas)
  );
}

export function zoom(
  [xyMin, xyMax]: Point[],
  onCanvas: onCanvasInterface,
  shapeDispatcher: React.Dispatch<ShapeAction>
) {
  const { width, height } = document.getElementById(
    "canvas"
  )! as HTMLCanvasElement;

  operation.executeCommand(
    new ZoomCommand(
      xyMin,
      xyMax,
      { x: width, y: height },
      shapeDispatcher,
      onCanvas
    )
  );
}
