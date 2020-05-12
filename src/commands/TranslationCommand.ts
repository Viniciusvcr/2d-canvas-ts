import Command from "./Command";
import { Point, Shape } from "../models";
import {
  onCanvasInterface,
  ShapeAction,
  ShapeActionEnum,
} from "../store/shape";

interface oldCanvasI {
  [id: string]: { oldPoints: Point[]; obj: Shape };
}

export default class TranslationCommand implements Command {
  p1: Point;
  p2: Point;
  objects: onCanvasInterface;
  oldCanvas: oldCanvasI;
  dx: number;
  dy: number;
  shapeDispatcher: React.Dispatch<ShapeAction>;

  constructor(
    [p1, p2]: Point[],
    onCanvas: onCanvasInterface,
    shapeDispatcher: React.Dispatch<ShapeAction>,
    needsCalc = true
  ) {
    this.p1 = p1;
    this.p2 = p2;
    this.objects = onCanvas;
    this.dx = needsCalc ? p2.x - p1.x : p1.x;
    this.dy = needsCalc ? p2.y - p1.y : p1.y;
    this.shapeDispatcher = shapeDispatcher;
    this.oldCanvas = {};
  }

  execute(): void {
    let newCoordinates: Point[] = [];

    const selectedObjects = Object.entries(this.objects).filter(
      ([, obj]) => obj.selected
    );

    for (const [id, { obj }] of selectedObjects) {
      const listOfPoints = obj.points.map((point) => point);

      this.oldCanvas[id] = { oldPoints: listOfPoints, obj };

      for (const point of listOfPoints) {
        const p: Point = { x: point.x + this.dx, y: point.y + this.dy };

        newCoordinates.push(p);
      }

      obj.update(newCoordinates);
      newCoordinates = [];
    }
    this.shapeDispatcher({ type: ShapeActionEnum.UPDATE_SHAPES });
  }
  undo(): void {
    for (const item of Object.values(this.oldCanvas)) {
      item.obj.update(item.oldPoints);
    }

    this.shapeDispatcher({ type: ShapeActionEnum.UPDATE_SHAPES });
  }
}
