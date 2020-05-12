import Command from "./Command";
import {
  onCanvasInterface,
  ShapeAction,
  ShapeActionEnum,
} from "../store/shape";

export default class ClearCommand implements Command {
  onCanvas: onCanvasInterface;
  shapeDispatcher: React.Dispatch<ShapeAction>;

  constructor(
    actualCanvas: onCanvasInterface,
    shapeDispatcher: React.Dispatch<ShapeAction>
  ) {
    this.onCanvas = actualCanvas;
    this.shapeDispatcher = shapeDispatcher;
  }

  execute(): void {
    this.shapeDispatcher({ type: ShapeActionEnum.CLEAR_CANVAS });
  }

  undo(): void {
    this.shapeDispatcher({
      type: ShapeActionEnum.UPDATE_CANVAS,
      previousCanvas: this.onCanvas,
    });
  }
}
