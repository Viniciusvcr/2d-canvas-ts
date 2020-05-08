import React from "react";
import { Button } from "react-bootstrap";

const Tools: React.FC = () => {
  const style: React.CSSProperties = {
    alignSelf: "center",
  };

  return (
    <div style={style}>
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
  );
};

export default Tools;
