import React, { useEffect } from "react";
import { getMousePosition } from "../controllers/canvas.controller";
import { MouseAction, Mouse } from "../store/mouse";
import { ShapeAction, ShapeStore } from "../store/shape";
import { Badge } from "react-bootstrap";

interface CanvasProps {
  mouseDispatcher: React.Dispatch<MouseAction>;
  shapeDispatcher: React.Dispatch<ShapeAction>;
  shapeStore: ShapeStore;
  mouseStore: Mouse;
}

const Canvas: React.FC<CanvasProps> = function (props: CanvasProps) {
  const { mouseStore, mouseDispatcher, shapeStore, shapeDispatcher } = props;

  useEffect(() => {
    if (mouseStore.pointsRequired === mouseStore.buffer.length) {
      if (mouseStore.createFn) {
        if (mouseStore.isDrawing) {
          mouseStore.createFn(mouseStore.buffer, shapeDispatcher);
          mouseDispatcher({
            type: "END_DRAWING",
            mousePoint: mouseStore.position,
          });
        }

        if (mouseStore.isTransforming) {
          mouseStore.createFn(
            mouseStore.buffer,
            shapeStore.onCanvas,
            shapeDispatcher
          );

          mouseDispatcher({
            type: "END_TRANSFORMING",
            mousePoint: mouseStore.position,
          });
        }
      }
    }
  }, [mouseDispatcher, mouseStore, shapeDispatcher, shapeStore]);

  return (
    <div
      style={{
        flex: 1,
        margin: "10px",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <Badge variant="dark" style={{ fontSize: "14px" }} id="currentTask">
          {mouseStore.isDrawing || mouseStore.isTransforming
            ? `${
                mouseStore.pointsRequired! - mouseStore.buffer.length
              } point(s) left to select`
            : "Select a tool above"}
        </Badge>
        <div style={{ paddingTop: "8px" }}>
          <canvas
            id="canvas"
            style={{
              border: "1px solid black",
              boxShadow: "0px 2px 10px -5px rgba(0,0,0,0.75)",
            }}
            onClick={() => {
              mouseDispatcher({
                type: "DRAWING",
                mousePoint: mouseStore.position,
              });
            }}
            onMouseMove={(e) => {
              mouseDispatcher({
                type: "UPDATE_AXIS",
                mousePoint: getMousePosition(e),
              });
            }}
          ></canvas>
          <div>
            <span
              className="badge badge-dark m-1"
              id="xAxis"
              style={{ paddingLeft: "8px" }}
            >
              Axis X: {mouseStore.position.x}
            </span>
            <span
              className="badge badge-dark m-1"
              id="yAxis"
              style={{ paddingLeft: "8px" }}
            >
              Axis Y: {mouseStore.position.y}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Canvas;
