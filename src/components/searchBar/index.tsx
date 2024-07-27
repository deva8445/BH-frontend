import React, { FC, useEffect, useState } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
// import { Search as SearchIcon } from "@mui/icons-material";

interface SearchBarProps {
  onSearch: (query: string) => void;
  style: string;
}

const SearchBar: FC<SearchBarProps> = ({ onSearch, style }) => {
  const [query, setQuery] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSearch = () => {
    onSearch(query);
    setQuery("");
  };

  useEffect(() => {
    onSearch(query);
  }, [query]);

  return (
    <div className={`p-4 ${style}`}>
      <TextField
        value={query}
        onChange={handleChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
        label="Search"
        variant="outlined"
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleSearch}>
                {/* <SearchIcon /> */}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};

export default SearchBar;
