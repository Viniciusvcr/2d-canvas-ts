import Command from "./Command";
import { Shape } from "../models";
import { ShapeStore } from "../store/shape";
import { v4 as uuidv4 } from "uuid";

export default class DrawObjectCommand implements Command {
  id: string;
  object: Shape;
  shapeStore: ShapeStore;

  constructor(object: Shape, shapeStore: ShapeStore) {
    this.id = uuidv4();
    this.object = object;
    this.shapeStore = shapeStore;
  }

  execute(): void {
    this.shapeStore.onCanvas[this.id] = { obj: this.object, selected: false };
  }

  undo(): void {
    delete this.shapeStore.onCanvas[this.id];
  }
}
