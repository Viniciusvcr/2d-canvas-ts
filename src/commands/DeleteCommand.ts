import Command from "./Command";
import { ShapeAction, ShapeActionEnum } from "../store/shape";
import { Shape } from "../models";

export default class DeleteCommand implements Command {
  id: string;
  shapeDispatcher: React.Dispatch<ShapeAction>;
  shape: Shape;

  constructor(
    id: string,
    shape: Shape,
    shapeDispatcher: React.Dispatch<ShapeAction>
  ) {
    this.id = id;
    this.shapeDispatcher = shapeDispatcher;
    this.shape = shape;
  }

  execute(): void {
    this.shapeDispatcher({ type: ShapeActionEnum.DELETE_SHAPE, id: this.id });
  }
  undo(): void {
    this.shapeDispatcher({
      type: ShapeActionEnum.CREATE_SHAPE,
      id: this.id,
      shapeBuffer: this.shape,
    });
  }
}
