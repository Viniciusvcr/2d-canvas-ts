import React, { Component } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";

export default class Header extends Component {
  render() {
    return (
      <div>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Navbar.Brand href="#home">2D-Canvas-TS</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Button className="mr-1" variant="outline-light">
                Clear
              </Button>
              <Button className="mr-1" variant="outline-light">
                Undo
              </Button>
              <Button className="mr-1" variant="outline-light">
                Redo
              </Button>
              <Button className="mr-1" variant="outline-light">
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
            <Button className="mr-1" variant="outline-light">
              Select All
            </Button>
            <Button className="mr-1" variant="outline-light">
              Unselect All
            </Button>
          </Navbar.Collapse>
          <Button variant="light">Help</Button>
        </Navbar>
      </div>
    );
  }
}
