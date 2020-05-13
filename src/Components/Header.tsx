import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { ShapeStore, ShapeAction } from "../store/shape";
import {
  clearCanvas,
  undoCommand,
  redoCommand,
  selectAll,
  unselectAll,
  translate,
  scale,
  rotation,
  zoomExtend,
} from "../controllers/shape.controller";
import { Mouse, MouseAction } from "../store/mouse";

interface Props {
  shapeStore: ShapeStore;
  shapeDispatcher: React.Dispatch<ShapeAction>;
  mouseStore: Mouse;
  mouseDispatcher: React.Dispatch<MouseAction>;
}

const Header: React.FC<Props> = (props: Props) => {
  const { shapeStore, shapeDispatcher, mouseStore, mouseDispatcher } = props;

  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="#home">2D-Canvas-TS</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Button
              className="mr-1"
              variant="outline-light"
              onClick={() => clearCanvas(shapeStore.onCanvas, shapeDispatcher)}
            >
              Clear
            </Button>
            <Button
              className="mr-1"
              variant="outline-light"
              onClick={() => undoCommand()}
            >
              Undo
            </Button>
            <Button
              className="mr-1"
              variant="outline-light"
              onClick={() => redoCommand()}
            >
              Redo
            </Button>
            <Button
              className="mr-1"
              variant="outline-light"
              onClick={() => {
                mouseDispatcher({
                  type: "INIT_TRANSFORMING",
                  mousePoint: mouseStore.position,
                  createFn: translate,
                  pointsRequired: 2,
                });
              }}
            >
              Translation
            </Button>
            <Button
              className="mr-1"
              variant="outline-light"
              onClick={() => {
                const sx = Number.parseFloat(
                  prompt("Enter the x-axis scale", "1")!
                );
                const sy = Number.parseFloat(
                  prompt("Enter the y-axis scale", "1")!
                );

                scale(sx, sy, shapeStore.onCanvas, shapeDispatcher);
              }}
            >
              Scale
            </Button>
            <Button
              className="mr-1"
              variant="outline-light"
              onClick={() => {
                const obj = Object.values(shapeStore.onCanvas).filter(
                  (obj) => obj.selected
                )[0];
                const theta = Number.parseFloat(
                  prompt("Insira o ângulo de rotação (em graus)", "0")!
                );

                const x = Number.parseFloat(
                  prompt(
                    "Insira o ponto de rotação X (padrão: X do primeiro ponto do primeiro objeto selecionado)",
                    obj.obj.points[0].x.toString()
                  )!
                );

                const y = Number.parseFloat(
                  prompt(
                    "Insira o ponto de rotação Y (padrão: Y do primeiro ponto do primeiro objeto selecionado)",
                    obj.obj.points[0].y.toString()
                  )!
                );

                rotation(theta, x, y, shapeStore.onCanvas, shapeDispatcher);
              }}
            >
              Rotation
            </Button>
            <Button
              className="mr-1"
              variant="outline-light"
              onClick={() => {
                const canvas = document.getElementById(
                  "canvas"
                )! as HTMLCanvasElement;

                let xMin = canvas.width,
                  yMin = canvas.height,
                  xMax = 0,
                  yMax = 0;

                for (const { obj } of Object.values(shapeStore.onCanvas)) {
                  for (const point of obj.points) {
                    if (point.x > xMax) {
                      xMax = point.x;
                    }

                    if (point.y > yMax) {
                      yMax = point.y;
                    }

                    if (point.x < xMin) {
                      xMin = point.x;
                    }

                    if (point.y < yMin) {
                      yMin = point.y;
                    }
                  }
                }

                zoomExtend(
                  { x: xMin, y: yMin },
                  { x: xMax, y: yMax },
                  { x: 0, y: 0 },
                  { x: canvas.width, y: canvas.height },
                  shapeDispatcher,
                  shapeStore.onCanvas
                );
              }}
            >
              Zoom Extend
            </Button>
            <Button className="mr-1" variant="outline-light">
              Zoom
            </Button>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse>
          <Button
            className="mr-1"
            variant="outline-light"
            onClick={() => {
              selectAll(shapeStore.onCanvas, shapeDispatcher);
            }}
          >
            Select All
          </Button>
          <Button
            className="mr-1"
            variant="outline-light"
            onClick={() => {
              unselectAll(shapeStore.onCanvas, shapeDispatcher);
            }}
          >
            Unselect All
          </Button>
        </Navbar.Collapse>
        <Button variant="light">Help</Button>
      </Navbar>
    </div>
  );
};

export default Header;
