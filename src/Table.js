import React from "react";
import Button from "./Button.js";
const Table = ({ list, onDismiss }) => (
  <div>
    {list.map(ele => (
      <div className="list" key={ele.objectID}>
        <Button onClick={() => onDismiss(ele.objectID)}>X</Button>
        <span>{ele.title}</span>
        <span>{ele.author}</span>
        <span>{ele.points}</span>
      </div>
    ))}
  </div>
);

export default Table;
