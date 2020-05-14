import React from "react";
import { Button } from "react-bootstrap";
import { MouseAction } from "../store/mouse";
import * as ShapeController from "../controllers/shape.controller";

interface Props {
  mouseDispatcher: React.Dispatch<MouseAction>;
}

const Tools: React.FC<Props> = (props: Props) => {
  const { mouseDispatcher } = props;

  function handleClick(createFn: Function, pointsRequired: number) {
    mouseDispatcher({
      type: "INIT_DRAWING",
      createFn,
      pointsRequired,
    });
  }

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
          handleClick(ShapeController.createLine, 2);
        }}
      >
        Line (l)
      </Button>
      <Button
        variant="outline-light"
        className="btn btn-outline-dark btn-sm m-1"
        id="rectButton"
        onClick={() => {
          handleClick(ShapeController.createRectangle, 2);
        }}
      >
        Rectangle (r)
      </Button>
      <Button
        variant="outline-light"
        className="btn btn-outline-dark btn-sm m-1"
        id="triangleButton"
        onClick={() => {
          handleClick(ShapeController.createTriangle, 3);
        }}
      >
        Triangle (t)
      </Button>
      <Button
        variant="outline-light"
        className="btn btn-outline-dark btn-sm m-1"
        id="circleButton"
        onClick={() => {
          handleClick(ShapeController.createCircle, 2);
        }}
      >
        Circle (c)
      </Button>
    </div>
  );
};

export default Tools;
