const Search = ({ searchVal, handleSearchChange }) => {
  return (
    <div>
      filter shown with: <input value={searchVal} onChange={handleSearchChange} />
    </div>
  );
};

export default Search;
