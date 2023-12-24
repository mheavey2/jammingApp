import { useState } from "react";
import styles from "./searchBar.module.css";

function SearchBar(props) {
  const [searchInput, setSearchInput] = useState("");

  const inputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const search = () => {
    props.onSearch(searchInput);
  };

  return (
    <>
      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Enter a Song, Album or Artist"
          className={styles.inputField}
          onChange={inputChange}
        ></input>
        <button className={styles.searchBtn} onClick={search}>
          Search
        </button>
      </div>
    </>
  );
}
export default SearchBar;
