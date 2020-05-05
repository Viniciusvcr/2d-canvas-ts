import React from "react";
import { Button } from "react-bootstrap";
import { getMousePosition } from "../controllers/canvas.controller";
import { Point } from "../models";
import { MouseAction } from "../store/mouse";

interface CanvasProps {
  mouseDispatcher: React.Dispatch<MouseAction>;
  position: Point;
}

const Canvas: React.FC<CanvasProps> = function (props: CanvasProps) {
  const { position, mouseDispatcher } = props;

  return (
    <div
      className="container"
      style={{
        display: "inline-block",
        verticalAlign: "text-top",
        margin: "0 auto",
      }}
    >
      <div className="col m-1 box" id="conteudo-left">
        <div style={{ textAlign: "center" }}>
          <div style={{ paddingTop: "8px", paddingBottom: "8px" }}>
            <Button
              variant="outline-light"
              className="btn btn-outline-dark btn-sm m-1"
              id="lineButton"
            >
              Line (l)
            </Button>
            <Button
              variant="outline-light"
              className="btn btn-outline-dark btn-sm m-1"
              id="rectButton"
            >
              Rectangle (r)
            </Button>
            <Button
              variant="outline-light"
              className="btn btn-outline-dark btn-sm m-1"
              id="triangleButton"
            >
              Triangle (t)
            </Button>
            <Button
              variant="outline-light"
              className="btn btn-outline-dark btn-sm m-1"
              id="circleButton"
            >
              Circle (c)
            </Button>
          </div>
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
    </div>
  );
};

export default Canvas;
