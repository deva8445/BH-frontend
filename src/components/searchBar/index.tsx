import React, { FC, useEffect, useState } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { IoSearch } from "react-icons/io5";

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
    <div className={`${style}`}>
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
                <IoSearch />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};

export default SearchBar;
