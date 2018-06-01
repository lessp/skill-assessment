import React from 'react';

import './SearchBar.css';

const SearchBar = ({ isLoading, ...props }) => (
  <div className="App-searchBar">
    <input
      disabled={isLoading}
      type="text"
      placeholder="Search for a movie..."
      {...props}
    />
    {isLoading && <span className="loader" />}
  </div>
);

export default SearchBar;
