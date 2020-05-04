import React from "react";
import { Button } from "react-bootstrap";
import { ObjectList } from ".";
import { updateAxisLabels } from "../controllers/canvas.controller";
import { useSelector, useDispatch } from "react-redux";
import { MouseStore, ActionEnum, DispatchMouseAction } from "../store/types";
import { RootReducer } from "../store/index";

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
      <div className="cointainer" id="center">
        <div className="row align-items-start">
          <div className="col m-1" id="conteudo-left">
            <div style={{ textAlign: "center" }}>
              <div style={{ paddingTop: "8px", paddingBottom: "8px" }}>
                <Button
                  variant="outline-light"
                  className="btn btn-outline-dark btn-sm m-1"
                  id="lineButton"
                >
                  Linha (l)
                </Button>
                <Button
                  variant="outline-light"
                  className="btn btn-outline-dark btn-sm m-1"
                  id="rectButton"
                >
                  Retângulo (r)
                </Button>
                <Button
                  variant="outline-light"
                  className="btn btn-outline-dark btn-sm m-1"
                  id="triangleButton"
                >
                  Triângulo (t)
                </Button>
                <Button
                  variant="outline-light"
                  className="btn btn-outline-dark btn-sm m-1"
                  id="circleButton"
                >
                  Círculo (c)
                </Button>
              </div>
              <div>
                <span
                  className="badge badge-light"
                  style={{ fontSize: "14px" }}
                  id="currentTask"
                >
                  Selecione acima a ferramenta a ser usada
                </span>
              </div>
              <div style={{ paddingTop: "8px" }}>
                <canvas
                  id="canvas"
                  width={1024}
                  height={768}
                  style={{
                    border: "1px solid black",
                    boxShadow: "0px 2px 10px -5px rgba(0,0,0,0.75)",
                  }}
                  onMouseMove={(e) => {
                    dispatch(getAxis(e, store));
                  }}
                ></canvas>
                <div>
                  <Button
                    className="btn btn-outline-dark btn-sm m-1"
                    variant="outline-light"
                    id="xAxis"
                    style={{ paddingLeft: "8px" }}
                  >
                    Eixo X: {position?.x}
                  </Button>
                  <Button
                    className="btn btn-outline-dark btn-sm m-1"
                    variant="outline-light"
                    id="yAxis"
                    style={{ paddingLeft: "8px" }}
                  >
                    Eixo Y: {position?.y}
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="col m-1" id="conteudo-right">
            <ObjectList />
          </div>
        </div>
      </div>
    </div>
  );
}
