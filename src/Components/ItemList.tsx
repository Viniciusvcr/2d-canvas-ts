import React from "react";
import Item from "./Item";
import { ShapeAction, onCanvasInterface } from "../store/shape";
import { Rectangle, Circle } from "../models";

interface Props {
  storeDispatcher: React.Dispatch<ShapeAction>;
  itemList: onCanvasInterface[];
}

const ItemList: React.FC<Props> = function (props: Props) {
  let { itemList, storeDispatcher } = props;

  itemList = [
    {
      id: 1,
      selected: true,
      shape: new Rectangle({ x: 0, y: 0 }, { x: 0, y: 0 }),
    },
    {
      id: 2,
      selected: false,
      shape: new Circle({ x: 0, y: 0 }, { x: 0, y: 0 }),
    },
  ];
  return (
    <div
      style={{
        flex: 1,
        paddingTop: "70px",
        maxWidth: "15%",
        margin: "10px",
      }}
    >
      <h5 style={{ textAlign: "center" }}>ObjectList</h5>
      <hr />
      <ul className="list-group">
        {itemList.map((item) => (
          <Item
            item={item}
            key={item.id}
            storeDispatcher={storeDispatcher}
          ></Item>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
