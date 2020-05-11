import React from "react";
import { ShapeAction, onCanvasInterface } from "../store/shape";

interface Props {
  storeDispatcher: React.Dispatch<ShapeAction>;
  item: onCanvasInterface;
}

const Item: React.FC<Props> = function (props: Props) {
  const { item } = props;
  const style = "list-group-item d-flex'";

  return (
    <li className={item.selected ? `${style} active` : `${style}`}>
      {item.shape.type}
    </li>
  );
};

export default Item;
