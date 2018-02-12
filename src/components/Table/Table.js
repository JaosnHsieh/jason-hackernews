import React from "react";
import Button from "../Button";
import PropTypes from "prop-types";
import { orderBy } from "lodash";
import Sort from "../Sort";

const SORTS = {
  NONE: list => list,
  AUTHOR: list => orderBy(list, "author", ["asc"]),
  TITLE: list => orderBy(list, "title", ["asc"]),
  COMMENTS: list => orderBy(list, "num_comments", ["asc"]),
  POINTS: list => orderBy(list, "points", ["asc"])
};

const Table = ({
  list,
  onDismiss,
  sortKey = "NONE",
  onSort,
  isReverseSort
}) => {
  const sortedList = SORTS[sortKey](list);
  const reverseSortedList = isReverseSort ? sortedList : sortedList.reverse();
  return (
    <div>
      <div className="list">
        <span className="column1">Delete</span>
        <span className="column2">
          <Sort
            sortKey={"TITLE"}
            onSort={onSort}
            activeSortKey={sortKey}
            isReverseSort={isReverseSort}
          >
            TITLE
          </Sort>
        </span>
        <span className="column3">
          <Sort
            sortKey={"AUTHOR"}
            onSort={onSort}
            activeSortKey={sortKey}
            isReverseSort={isReverseSort}
          >
            AUTHOR
          </Sort>
        </span>
        <span className="column4">
          <Sort
            sortKey={"COMMENTS"}
            onSort={onSort}
            activeSortKey={sortKey}
            isReverseSort={isReverseSort}
          >
            COMMENTS
          </Sort>
        </span>
        <span className="column5">
          <Sort
            sortKey={"POINTS"}
            onSort={onSort}
            activeSortKey={sortKey}
            isReverseSort={isReverseSort}
          >
            POINTS
          </Sort>
        </span>
      </div>
      {reverseSortedList.map(ele => (
        <div className="list" key={ele.objectID}>
          <span className="column1">
            <Button onClick={() => onDismiss(ele.objectID)}>X</Button>
          </span>
          <span className="column2">{ele.title}</span>
          <span className="column3">{ele.author}</span>
          <span className="column4">{ele.num_comments}</span>
          <span className="column5">{ele.points}</span>
        </div>
      ))}
    </div>
  );
};

Table.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      objectID: PropTypes.string.isRequired,
      author: PropTypes.string,
      url: PropTypes.string,
      points: PropTypes.number
    })
  ).isRequired,
  onDismiss: PropTypes.func.isRequired
};
export default Table;
