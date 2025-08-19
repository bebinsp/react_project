import React from 'react';

export default function SearchBar({ searchTerm, setSearchTerm, onSearch }) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') onSearch();
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  return (
    <div className="search-bar" style={{ position: "relative", display: "flex", alignItems: "center" }}>
      <input
        type="text"
        placeholder="Search for a recipe (eg. chicken, curry, rice)..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
        style={{ paddingRight: "30px" }}
      />
      
      {/* Show cross only when there is input */}
      {searchTerm && (
        <span
          onClick={clearSearch}
          style={{
            position: "absolute",
            right: "420px",
            
            cursor: "pointer",
            fontSize: "15px",
            color: "#999"
          }}
        >
          X
        </span>
      )}

      <button onClick={onSearch} style={{ marginLeft: "10px" }}>Search</button>
    </div>
  );
}
