import React from "react";

class Search extends React.Component {
  componentDidMount() {
    if (this.input) {
      this.input.focus();
    }
  }
  render() {
    const { onSearchChange, onSearchSubmit, children, searchTerm } = this.props;
    return (
      <div className="search">
        <form onSubmit={onSearchSubmit}>
          <input
            type="text"
            value={searchTerm}
            onChange={onSearchChange}
            ref={node => {
              this.input = node;
            }}
          />
          <button type="submit">{children}</button>
        </form>
      </div>
    );
  }
}

export default Search;
