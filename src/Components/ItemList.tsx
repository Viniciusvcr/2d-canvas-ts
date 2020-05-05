import React from "react";
import Item from "./Item";
import { ShapeAction, onCanvasInterface } from "../store/shape";

interface Props {
  storeDispatcher: React.Dispatch<ShapeAction>;
  itemList: onCanvasInterface[];
}

const ItemList: React.FC<Props> = function (props: Props) {
  const { itemList, storeDispatcher } = props;

  return (
    <div
      style={{
        display: "inline-block",
        verticalAlign: "text-top",
        margin: "0 auto",
        paddingTop: "69px",
        width: "15%",
      }}
    >
      <h5 style={{ textAlign: "center" }}>ObjectList</h5>
      <hr />
      <ul className="list-group">
        {itemList.map((item) => (
          <Item item={item} storeDispatcher={storeDispatcher}></Item>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
