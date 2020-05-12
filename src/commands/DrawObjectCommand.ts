import Command from "./Command";
import { Shape } from "../models";
import { ShapeAction, ShapeActionEnum } from "../store/shape";
import { v4 as uuidv4 } from "uuid";

export default class DrawObjectCommand implements Command {
  id: string;
  object: Shape;
  shapeDispatcher: React.Dispatch<ShapeAction>;

  constructor(object: Shape, shapeDispacther: React.Dispatch<ShapeAction>) {
    this.id = uuidv4();
    this.object = object;
    this.shapeDispatcher = shapeDispacther;
  }

  execute(): void {
    this.shapeDispatcher({
      type: ShapeActionEnum.CREATE_SHAPE,
      id: this.id,
      shapeBuffer: this.object,
    });
  }

  undo(): void {
    this.shapeDispatcher({ type: ShapeActionEnum.DELETE_SHAPE, id: this.id });
  }
}
