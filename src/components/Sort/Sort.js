import React from "react";
const Sort = ({ onSort, sortKey, children, activeSortKey, isReverseSort }) => {
  const sortClasses = ["button"];
  const isActive = sortKey === activeSortKey;
  if (isActive) {
    sortClasses.push("active");
  }
  return (
    <a
      onClick={() => {
        onSort(sortKey);
      }}
      className={sortClasses.join(" ")}
    >
      {isActive ? (isReverseSort ? "↑" : "↓") : null}
      {children}
    </a>
  );
};

export default Sort;
