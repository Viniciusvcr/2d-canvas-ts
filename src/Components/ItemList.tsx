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
        flex: 1,
        paddingTop: "45px",
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
