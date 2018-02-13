import React from "react";
const Search = ({ onSearchChange, onSearchSubmit, children, searchTerm }) => (
  <div className="search">
    <form onSubmit={onSearchSubmit}>
      <input type="text" value={searchTerm} onChange={onSearchChange} />
      <button type="submit">{children}</button>
    </form>
  </div>
);

export default Search;
