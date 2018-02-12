import React from "react";
import Button from "../Button";
const Sort = ({ onSort, sortKey, children, activeSortKey, isReverseSort }) => {
  const sortClasses = ["sort-button"];
  const isActive = sortKey === activeSortKey;
  if (isActive) {
    sortClasses.push("active");
  }
  return (
    <Button
      onClick={() => {
        onSort(sortKey);
      }}
      className={sortClasses.join(" ")}
    >
      {isActive ? (isReverseSort ? "↑" : "↓") : null}
      {children}
    </Button>
  );
};

export default Sort;
