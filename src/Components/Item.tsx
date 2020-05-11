import React, { useState } from "react";
import Emoji from "./Emoji";
import { ShapeAction, ShapeActionEnum, ShapeInterface } from "../store/shape";

interface Props {
  shapeDispatcher: React.Dispatch<ShapeAction>;
  item: { id: string; obj: ShapeInterface };
}

const Item: React.FC<Props> = function (props: Props) {
  const [clicked, setClicked] = useState(false);
  const { item, shapeDispatcher } = props;
  const style = "list-group-item d-flex justify-content-between";

  return (
    <li
      className={item.obj.selected ? `${style} active` : `${style}`}
      onClick={() => {
        setClicked(!clicked);
      }}
      onMouseEnter={() => {
        if (!clicked) {
          shapeDispatcher({
            type: ShapeActionEnum.SELECT_SHAPE,
            id: item.id,
          });
        }
      }}
      onMouseLeave={() => {
        if (!clicked)
          shapeDispatcher({
            type: ShapeActionEnum.UNSELECT_SHAPE,
            id: item.id,
          });
      }}
    >
      {item.obj.obj.type}
      <Emoji symbol="❌" label="Delete item"></Emoji>
    </li>
  );
};

export default Item;
