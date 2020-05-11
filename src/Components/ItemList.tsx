import React from "react";
import Item from "./Item";
import { ShapeAction, onCanvasInterface } from "../store/shape";

interface Props {
  shapeDispatcher: React.Dispatch<ShapeAction>;
  itemList: onCanvasInterface;
}

const ItemList: React.FC<Props> = function (props: Props) {
  const { itemList, shapeDispatcher } = props;

  return (
    <div
      style={{
        flex: 1,
        paddingTop: "45px",
        maxWidth: "15%",
        margin: "10px",
      }}
    >
      <h5 style={{ textAlign: "center" }}>ObjectList</h5>
      <hr />
      <ul className="list-group">
        {Object.entries(itemList).map(([id, obj]) => (
          <Item
            item={{ id, obj }}
            key={id}
            shapeDispatcher={shapeDispatcher}
          ></Item>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
