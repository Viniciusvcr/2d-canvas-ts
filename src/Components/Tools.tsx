import React from "react";
import { Button } from "react-bootstrap";
import { MouseAction, Mouse } from "../store/mouse";
import * as ShapeController from "../controllers/shape.controller";

interface Props {
  mouseDispatcher: React.Dispatch<MouseAction>;
  mouseStore: Mouse;
}

const Tools: React.FC<Props> = (props: Props) => {
  const { mouseDispatcher, mouseStore } = props;

  const style: React.CSSProperties = {
    alignSelf: "center",
  };

  return (
    <div style={style}>
      <Button
        variant="outline-light"
        className="btn btn-outline-dark btn-sm m-1"
        id="lineButton"
        onClick={() => {
          mouseDispatcher({
            type: "INIT_DRAWING",
            mousePoint: mouseStore.position,
            createFn: ShapeController.createLine,
            pointsRequired: 2,
          });
        }}
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
  );
};

export default Tools;
