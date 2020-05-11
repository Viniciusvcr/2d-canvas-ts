import Command from "./Command";
import { Shape } from "../models";
import { ShapeStore, onCanvasInterface } from "../store/shape";
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
    const newOnCanvas: onCanvasInterface = {
      id: this.id,
      selected: false,
      shape: this.object,
    };

    this.shapeStore.onCanvas = [...this.shapeStore.onCanvas, newOnCanvas];
  }

  undo(): void {
    this.shapeStore.onCanvas.filter((obj) => obj.id !== this.id);
  }
}
