import { Point, Circle, Line, Rectangle, Triangle } from "../models";
import Operation from "../commands/Operation";
import DrawObjectCommand from "../commands/DrawObjectCommand";
import { ShapeAction } from "../store/shape";

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
