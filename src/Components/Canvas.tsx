import React from "react";
import { getMousePosition } from "../controllers/canvas.controller";
import { Point } from "../models";
import { MouseAction } from "../store/mouse";
import { ShapeAction, ShapeStore } from "../store/shape";

interface CanvasProps {
  mouseDispatcher: React.Dispatch<MouseAction>;
  shapeDispatcher: React.Dispatch<ShapeAction>;
  shapeStore: ShapeStore;
  position: Point;
}

const Canvas: React.FC<CanvasProps> = function (props: CanvasProps) {
  const { position, mouseDispatcher } = props;

  return (
    <div
      style={{
        flex: 1,
        margin: "10px",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <div>
          <span
            className="badge badge-light"
            style={{ fontSize: "14px" }}
            id="currentTask"
          >
            Select a tool
          </span>
        </div>
        <div style={{ paddingTop: "8px" }}>
          <canvas
            id="canvas"
            style={{
              border: "1px solid black",
              boxShadow: "0px 2px 10px -5px rgba(0,0,0,0.75)",
            }}
            onMouseMove={(e) => {
              mouseDispatcher({
                mousePoint: getMousePosition(e),
                type: "UPDATE_AXIS",
              });
            }}
          ></canvas>
          <div>
            <span
              className="badge badge-dark m-1"
              id="xAxis"
              style={{ paddingLeft: "8px" }}
            >
              Axis X: {position.x}
            </span>
            <span
              className="badge badge-dark m-1"
              id="yAxis"
              style={{ paddingLeft: "8px" }}
            >
              Axis Y: {position.y}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Canvas;
