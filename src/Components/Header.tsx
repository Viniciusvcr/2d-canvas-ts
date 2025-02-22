import React, { useState } from "react";
import { Navbar, Nav, Button, Modal } from "react-bootstrap";
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
  zoom,
} from "../controllers/shape.controller";
import { MouseAction } from "../store/mouse";
import Emoji from "./Emoji";

interface Props {
  shapeStore: ShapeStore;
  shapeDispatcher: React.Dispatch<ShapeAction>;
  mouseDispatcher: React.Dispatch<MouseAction>;
}

const Header: React.FC<Props> = (props: Props) => {
  const [showModal, setShowModal] = useState(false);
  const { shapeStore, shapeDispatcher, mouseDispatcher } = props;

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
            <Button
              className="mr-1"
              variant="outline-light"
              onClick={() => {
                mouseDispatcher({
                  type: "INIT_TRANSFORMING",
                  createFn: zoom,
                  pointsRequired: 2,
                });
              }}
            >
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
        <Button
          variant="light"
          onClick={() => {
            setShowModal(true);
          }}
        >
          Help
        </Button>

        <Modal
          size="lg"
          show={showModal}
          onHide={() => {
            setShowModal(false);
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>User guide</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5>Under construction!</h5>
            <Emoji symbol="🚧"></Emoji>
            <Emoji symbol="🚧"></Emoji>
            <Emoji symbol="🚧"></Emoji>
            <Emoji symbol="🚧"></Emoji>
            <Emoji symbol="🚧"></Emoji>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                setShowModal(false);
              }}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Navbar>
    </div>
  );
};

export default Header;
