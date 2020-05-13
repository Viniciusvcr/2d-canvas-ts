import Command, { oldObjectInterface } from "./Command";
import { Point } from "../models";
import {
  ShapeAction,
  onCanvasInterface,
  ShapeActionEnum,
} from "../store/shape";
import {
  generateMatrix,
  matrixMultiply,
  getCoordinates,
  getCoordinatesForObject,
} from "../controllers/matrix.controller";
import TranslationCommand from "./TranslationCommand";

export default class ZoomExtendCommand implements Command {
  xyMin: Point;
  xyMax: Point;
  uvMin: Point;
  uvMax: Point;
  rw: number;
  rv: number;
  sx: number;
  sy: number;
  centerH: number;
  centerV: number;
  shapeDispatcher: React.Dispatch<ShapeAction>;
  oldCanvas: oldObjectInterface[];
  objects: onCanvasInterface;

  constructor(
    xyMin: Point,
    xyMax: Point,
    uvMin: Point,
    uvMax: Point,
    shapeDispatcher: React.Dispatch<ShapeAction>,
    onCanvas: onCanvasInterface
  ) {
    this.shapeDispatcher = shapeDispatcher;
    this.objects = onCanvas;
    this.oldCanvas = [];

    this.xyMin = xyMin;
    this.xyMax = xyMax;
    this.uvMin = uvMin;
    this.uvMax = uvMax;

    this.rw = (xyMax.x - xyMin.x) / ((xyMax.y - xyMin.y) * 1.0);
    this.rv = (uvMax.x - uvMin.x) / ((uvMax.y - uvMin.y) * 1.0);
    this.centerH = this.centerV = 0;

    if (this.rw !== this.rv) {
      if (this.rw > this.rv) {
        const oldVmax = this.uvMax.y;

        this.uvMax = { x: uvMax.x, y: (uvMax.x - uvMin.x) / this.rw + uvMin.y };
        this.centerV = (this.uvMax.y - oldVmax) / 2.0;
      } else {
        const oldVmax = this.uvMax.x;

        this.uvMax = {
          x: this.rw * (this.uvMax.y - this.uvMin.y) + this.uvMin.x,
          y: this.uvMax.y,
        };

        this.centerH = (this.uvMax.x - oldVmax) / 2.0;
      }
    }

    this.sx =
      (this.uvMax.x - this.uvMin.x) / ((this.xyMax.x - this.xyMin.x) * 1.0);
    this.sy =
      (this.uvMax.y - this.uvMin.y) / ((this.xyMax.y - this.xyMin.y) * 1.0);
  }

  execute(): void {
    const allObjects = Object.values(this.objects).map((obj) => obj.obj);

    const mObjs = generateMatrix(allObjects);
    const mTransformation = [
      [this.sx, 0, -this.sx * this.xyMin.x],
      [0, this.sy, -this.sy * this.xyMin.y],
      [0, 0, 1],
    ];

    const result = matrixMultiply(mTransformation, mObjs);
    const newCoordinates = getCoordinates(result);

    let start = 0;
    const selectedObjs: onCanvasInterface = {};
    for (const [, { obj }] of Object.entries(this.objects)) {
      const [pos, coordinates] = getCoordinatesForObject(
        newCoordinates,
        start,
        obj.type
      );

      const oldPoints = obj.points.map((point) => point);
      this.oldCanvas.push({ obj, oldPoints });

      start = pos;
      obj.update(coordinates);
    }

    for (const [id, obj] of Object.entries(this.objects)) {
      selectedObjs[id] = { ...obj, selected: true };
    }

    new TranslationCommand(
      [
        { x: -this.centerH, y: -this.centerV },
        { x: 0, y: 0 },
      ],
      selectedObjs,
      this.shapeDispatcher,
      false
    ).execute();
  }

  undo(): void {
    for (const { obj, oldPoints } of this.oldCanvas) {
      obj.update(oldPoints);
    }

    this.shapeDispatcher({ type: ShapeActionEnum.UPDATE_SHAPES });
  }
}
