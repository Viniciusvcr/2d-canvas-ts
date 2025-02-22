import React from "react";

interface Props {
  symbol: string;
  label?: string;
  clickFn?: Function;
}

const Emoji: React.FC<Props> = function (props: Props) {
  return (
    <span
      className="emoji"
      role="img"
      aria-label={props.label ? props.label : ""}
      aria-hidden={props.label ? "false" : "true"}
      onClick={() => {
        props.clickFn!();
      }}
      style={{ cursor: "pointer" }}
    >
      {props.symbol}
    </span>
  );
};

export default Emoji;
