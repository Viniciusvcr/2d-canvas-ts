import { Point, Circle, Line, Rectangle, Triangle, Shape } from "../models";
import Operation from "../commands/Operation";
import DrawObjectCommand from "../commands/DrawObjectCommand";
import { ShapeAction, onCanvasInterface } from "../store/shape";
import DeleteCommand from "../commands/DeleteCommand";
import ClearCommand from "../commands/ClearCommand";
import SelectAllCommand from "../commands/SelectAllCommand";

const operation = Operation.getInstance();

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
