import React, { useReducer, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { ObjectList } from ".";
import { getMousePosition } from "../controllers/canvas.controller";
import { Mouse, MouseAction, INITIAL_MOUSE_STATE } from "../store/mouse";

export default function Canvas() {
  const [canvasCtx, setcanvasCtx] = useState<CanvasRenderingContext2D | null>(
    null
  );
  const [{ position }, mouseDispatcher] = useReducer(
    (state: Mouse, action: MouseAction) => {
      switch (action.type) {
        case "UPDATE_AXIS":
          return {
            ...state,
            position: action.mousePoint,
          };

        default:
          return state;
      }
    },
    INITIAL_MOUSE_STATE
  );

  useEffect(() => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    canvas.width = 960;
    canvas.height = 720;

    setcanvasCtx(canvas.getContext("2d"));
  }, []);

  return (
    <div className="container">
      <div className="row align-items-start">
        <div
          className="cointainer"
          id="center"
          style={{ margin: "0 auto", textAlign: "center" }}
        >
          <div className="row align-items-start">
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
            <div
              className="col m-1 box"
              id="conteudo-right"
              style={{ paddingTop: "79px" }}
            >
              <ObjectList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
