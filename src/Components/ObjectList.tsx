import React, { Component, Fragment } from "react";

export default class ObjectList extends Component {
  render() {
    return (
      <Fragment>
        <table className="table table-sm table-hover" id="object-table">
          <tr>
            <th>Objetos na tela</th>
          </tr>
        </table>
      </Fragment>
    );
  }
}
