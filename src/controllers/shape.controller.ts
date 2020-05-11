import { Point, Circle, Line, Rectangle, Triangle } from "../models";
import Operation from "../commands/Operation";
import DrawObjectCommand from "../commands/DrawObjectCommand";
import { ShapeStore } from "../store/shape";

const operation = Operation.getInstance();

export function createCircle([p1, p2]: Point[], shapeStore: ShapeStore) {
  operation.executeCommand(
    new DrawObjectCommand(new Circle(p1, p2), shapeStore)
  );
}

export function createLine([p1, p2]: Point[], shapeStore: ShapeStore) {
  operation.executeCommand(new DrawObjectCommand(new Line(p1, p2), shapeStore));
}

export function createRectangle([p1, p2]: Point[], shapeStore: ShapeStore) {
  operation.executeCommand(
    new DrawObjectCommand(new Rectangle(p1, p2), shapeStore)
  );
}

export function createTriangle([p1, p2, p3]: Point[], shapeStore: ShapeStore) {
  operation.executeCommand(
    new DrawObjectCommand(new Triangle(p1, p2, p3), shapeStore)
  );
}
