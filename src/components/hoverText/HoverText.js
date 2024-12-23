import React from "react";
import ReactTooltip from "react-tooltip";

const HoverText = ({ id, title, bgColor, children }) => {
  return (
    <>
      <p data-tip data-for={id} className="text-xl">
        {children}
      </p>
      <ReactTooltip id={id} backgroundColor={bgColor}>
        <span className="text-sm font-medium text-gray-700">{title}</span>
      </ReactTooltip>
    </>
  );
};

export default HoverText;
