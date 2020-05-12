import Command from "./Command";
import {
  onCanvasInterface,
  ShapeAction,
  ShapeActionEnum,
} from "../store/shape";

export default class SelectAllCommand implements Command {
  onCanvas: onCanvasInterface;
  shapeDispatcher: React.Dispatch<ShapeAction>;

  constructor(
    onCanvas: onCanvasInterface,
    shapeDispatcher: React.Dispatch<ShapeAction>
  ) {
    this.onCanvas = onCanvas;
    this.shapeDispatcher = shapeDispatcher;
  }

  execute(): void {
    for (const id of Object.keys(this.onCanvas)) {
      this.shapeDispatcher({ type: ShapeActionEnum.SELECT_SHAPE, id });
    }
  }
  undo(): void {
    for (const id of Object.keys(this.onCanvas)) {
      this.shapeDispatcher({ type: ShapeActionEnum.UNSELECT_SHAPE, id });
    }
  }
}
