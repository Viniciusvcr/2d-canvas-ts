import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { ShapeStore, ShapeAction } from "../store/shape";
import {
  clearCanvas,
  undoCommand,
  redoCommand,
  selectAll,
  unselectAll,
} from "../controllers/shape.controller";

interface Props {
  shapeStore: ShapeStore;
  shapeDispatcher: React.Dispatch<ShapeAction>;
}

const Header: React.FC<Props> = (props: Props) => {
  const { shapeStore, shapeDispatcher } = props;

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
            <Button className="mr-1" variant="outline-light">
              Translation
            </Button>
            <Button className="mr-1" variant="outline-light">
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
