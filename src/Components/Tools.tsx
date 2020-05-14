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

  function handleClick(createFn: Function, pointsRequired: number) {
    mouseDispatcher({
      type: "INIT_DRAWING",
      createFn,
      pointsRequired,
    });
  }

  const chooseVariant = (functionName: Function) =>
    functionName === mouseStore.createFn ? "light" : "outline-dark";

  const chooseBtnStyle = (functionName: Function) =>
    functionName === mouseStore.createFn ? "btn-dark" : "btn-outline-light";

  const style: React.CSSProperties = {
    alignSelf: "center",
  };

  return (
    <div style={style}>
      <Button
        variant={chooseVariant(ShapeController.createLine)}
        className={`btn ${chooseBtnStyle(
          ShapeController.createLine
        )} btn-sm m-1`}
        id="lineButton"
        onClick={() => {
          handleClick(ShapeController.createLine, 2);
        }}
      >
        Line (l)
      </Button>
      <Button
        variant={chooseVariant(ShapeController.createRectangle)}
        className={`btn ${chooseBtnStyle(
          ShapeController.createRectangle
        )} btn-sm m-1`}
        id="rectButton"
        onClick={() => {
          handleClick(ShapeController.createRectangle, 2);
        }}
      >
        Rectangle (r)
      </Button>
      <Button
        variant={chooseVariant(ShapeController.createTriangle)}
        className={`btn ${chooseBtnStyle(
          ShapeController.createTriangle
        )} btn-sm m-1`}
        id="triangleButton"
        onClick={() => {
          handleClick(ShapeController.createTriangle, 3);
        }}
      >
        Triangle (t)
      </Button>
      <Button
        variant={chooseVariant(ShapeController.createCircle)}
        className={`btn ${chooseBtnStyle(
          ShapeController.createCircle
        )} btn-sm m-1`}
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
