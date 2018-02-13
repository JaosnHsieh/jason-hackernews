import React, { Component } from "react";
import PropTypes from "prop-types";
import { orderBy } from "lodash";
import Sort from "../Sort";

const SORTS = {
  NONE: list => [...list],
  AUTHOR: list => orderBy(list, "author", ["asc"]),
  TITLE: list => orderBy(list, "title", ["asc"]),
  COMMENTS: list => orderBy(list, "num_comments", ["asc"]),
  POINTS: list => orderBy(list, "points", ["asc"])
};

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortKey: "NONE",
      isReverseSort: false
    };
  }
  onSort = sortKey => {
    const isReverseSort =
      this.state.sortKey === sortKey && !this.state.isReverseSort;
    this.setState({
      sortKey,
      isReverseSort
    });
  };
  render() {
    const { list, onDismiss } = this.props;

    const sortedList = SORTS[this.state.sortKey](list);
    const reverseSortedList = this.state.isReverseSort
      ? sortedList
      : sortedList.reverse();
    return (
      <div>
        <div className="list">
          <span className="column1" />
          <span className="column2">
            <Sort
              sortKey={"TITLE"}
              onSort={this.onSort}
              activeSortKey={this.state.sortKey}
              isReverseSort={this.state.isReverseSort}
            >
              TITLE
            </Sort>
          </span>
          <span className="column3">
            <Sort
              sortKey={"AUTHOR"}
              onSort={this.onSort}
              activeSortKey={this.state.sortKey}
              isReverseSort={this.state.isReverseSort}
            >
              AUTHOR
            </Sort>
          </span>
          <span className="column4">
            <Sort
              sortKey={"COMMENTS"}
              onSort={this.onSort}
              activeSortKey={this.state.sortKey}
              isReverseSort={this.state.isReverseSort}
            >
              COMMENTS
            </Sort>
          </span>
          <span className="column5">
            <Sort
              sortKey={"POINTS"}
              onSort={this.onSort}
              activeSortKey={this.state.sortKey}
              isReverseSort={this.state.isReverseSort}
            >
              POINTS
            </Sort>
          </span>
        </div>
        {reverseSortedList.map(ele => (
          <div className="list" key={ele.objectID}>
            <span className="column1">
              <a
                className="button-delete"
                onClick={() => onDismiss(ele.objectID)}
              >
                X
              </a>
            </span>
            <span className="column2">
              <a href={ele.url}>{ele.title}</a>
            </span>
            <span className="column3">{ele.author}</span>
            <span className="column4">{ele.num_comments}</span>
            <span className="column5">{ele.points}</span>
          </div>
        ))}
      </div>
    );
  }
}

Table.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      objectID: PropTypes.string.isRequired,
      author: PropTypes.string,
      url: PropTypes.string,
      points: PropTypes.number
    })
  ).isRequired
};
export default Table;
