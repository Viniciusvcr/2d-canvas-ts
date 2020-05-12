import Command, { oldObjectInterface } from "./Command";
import {
  ShapeAction,
  onCanvasInterface,
  ShapeActionEnum,
} from "../store/shape";
import {
  generateMatrix,
  matrixMultiply,
  getCoordinates,
} from "../controllers/matrix.controller";

export default class ScaleCommand implements Command {
  sx: number;
  sy: number;
  objects: onCanvasInterface;
  oldCanvas: oldObjectInterface[];
  shapeDispatcher: React.Dispatch<ShapeAction>;

  constructor(
    sx: number,
    sy: number,
    onCanvas: onCanvasInterface,
    shapeDispatcher: React.Dispatch<ShapeAction>
  ) {
    this.sx = sx;
    this.sy = sy;
    this.objects = onCanvas;
    this.shapeDispatcher = shapeDispatcher;
    this.oldCanvas = [];
  }

  execute(): void {
    const selectedObjects = Object.entries(this.objects).filter(
      ([, obj]) => obj.selected
    );

    for (const [, { obj }] of selectedObjects) {
      const listOfPoints = obj.points.map((point) => point);
      const mObj = generateMatrix([obj]);
      const x = obj.points[0].x;
      const y = obj.points[0].y;
      const mTransformation: number[][] = [
        [this.sx, 0, x - x * this.sx],
        [0, this.sy, y - y * this.sy],
        [0, 0, 1],
      ];

      const result = matrixMultiply(mTransformation, mObj);
      const newCoordinates = getCoordinates(result);

      this.oldCanvas.push({ obj, oldPoints: listOfPoints });

      obj.update(newCoordinates);
    }

    this.shapeDispatcher({ type: ShapeActionEnum.UPDATE_SHAPES });
  }
  undo(): void {
    for (const item of this.oldCanvas) {
      item.obj.update(item.oldPoints);
    }

    this.shapeDispatcher({ type: ShapeActionEnum.UPDATE_SHAPES });
  }
}
