import React from "react";
import { Button } from "react-bootstrap";
import { ObjectList } from ".";
import { updateAxisLabels } from "../controllers/canvas.controller";
import { useSelector, useDispatch } from "react-redux";
import { MouseStore, DispatchMouseAction } from "../store/mouse";
import { RootReducer, ActionEnum } from "../store/index";

function getAxis(
  e: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
  state: MouseStore
): DispatchMouseAction {
  return {
    type: ActionEnum.UPDATE_AXIS,
    payload: { mousePoint: updateAxisLabels(e) },
  };
}

export default function Canvas() {
  const store = useSelector((state: RootReducer) => state.mouse);
  const dispatch = useDispatch();
  const { position } = store;

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
                    width={1000}
                    height={744}
                    style={{
                      border: "1px solid black",
                      boxShadow: "0px 2px 10px -5px rgba(0,0,0,0.75)",
                    }}
                    onMouseMove={(e) => {
                      dispatch(getAxis(e, store));
                    }}
                  ></canvas>
                  <div>
                    <span
                      className="badge badge-dark m-1"
                      id="xAxis"
                      style={{ paddingLeft: "8px" }}
                    >
                      Axis X: {position?.x}
                    </span>
                    <span
                      className="badge badge-dark m-1"
                      id="yAxis"
                      style={{ paddingLeft: "8px" }}
                    >
                      Axis Y: {position?.y}
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
