import Command from "./Command";
import ZoomExtendCommand from "./ZoomExtendCommand";
import { Point } from "../models";
import { ShapeAction, onCanvasInterface } from "../store/shape";

export default class ZoomCommand implements Command {
  zoomExtCommand: ZoomExtendCommand;

  constructor(
    xyMin: Point,
    xyMax: Point,
    uvMax: Point,
    shapeDispatcher: React.Dispatch<ShapeAction>,
    onCanvas: onCanvasInterface
  ) {
    this.zoomExtCommand = new ZoomExtendCommand(
      xyMin,
      xyMax,
      { x: 0, y: 0 },
      uvMax,
      shapeDispatcher,
      onCanvas
    );
  }

  execute(): void {
    this.zoomExtCommand.execute();
  }
  undo(): void {
    this.zoomExtCommand.undo();
  }
}
