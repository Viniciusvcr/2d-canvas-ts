import Command, { oldObjectInterface } from "./Command";
import {
  onCanvasInterface,
  ShapeAction,
  ShapeActionEnum,
} from "../store/shape";
import {
  generateMatrix,
  matrixMultiply,
  getCoordinates,
} from "../controllers/matrix.controller";

export default class RotationCommand implements Command {
  theta: number;
  objects: onCanvasInterface;
  oldCanvas: oldObjectInterface[];
  shapeDispatcher: React.Dispatch<ShapeAction>;
  x: number;
  y: number;

  constructor(
    theta: number,
    x: number,
    y: number,
    onCanvas: onCanvasInterface,
    shapeDispatcher: React.Dispatch<ShapeAction>
  ) {
    this.theta = -(theta * (Math.PI / 180));
    this.x = x;
    this.y = y;
    this.objects = onCanvas;
    this.shapeDispatcher = shapeDispatcher;
    this.oldCanvas = [];
  }

  execute(): void {
    const [sin, cos, x, y] = [Math.sin, Math.cos, this.x, this.y];
    const selectedObjects = Object.entries(this.objects).filter(
      ([, obj]) => obj.selected
    );

    for (const [, { obj }] of selectedObjects) {
      const mObj = generateMatrix([obj]);
      const mTransformation = [
        [
          cos(this.theta),
          -sin(this.theta),
          y * sin(this.theta) - x * cos(this.theta) + x,
        ],
        [
          sin(this.theta),
          cos(this.theta),
          -x * sin(this.theta) - y * cos(this.theta) + y,
        ],
        [0, 0, 1],
      ];

      const result = matrixMultiply(mTransformation, mObj);
      const newCoordinates = getCoordinates(result);

      const oldPoints = obj.points.map((point) => point);
      this.oldCanvas.push({ obj, oldPoints });

      obj.update(newCoordinates);

      this.shapeDispatcher({ type: ShapeActionEnum.UPDATE_SHAPES });
    }
  }
  undo(): void {
    for (const { obj, oldPoints } of this.oldCanvas) {
      obj.update(oldPoints);
    }

    this.shapeDispatcher({ type: ShapeActionEnum.UPDATE_SHAPES });
  }
}
