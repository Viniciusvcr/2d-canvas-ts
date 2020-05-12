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
            <Button className="mr-1" variant="outline-light">
              Rotation
            </Button>
            <Button className="mr-1" variant="outline-light">
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
