import { useState } from "react";
import Spotify from "../../util/Spotify";
import styles from "./searchBar.module.css";

function SearchBar(props) {
  const [searchInput, setSearchInput] = useState("");

  const inputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const search = () => {
    const searchTerm = document.querySelector("#searchInput");

    if (!searchInput) {
      searchTerm.classList.add(`${styles.addShake}`);
      setTimeout(() => {
        searchTerm.classList.remove(`${styles.addShake}`);
      }, 500);
    }
    props.onSearch(searchInput);
    // console.log(searchTerm.classList);
  };

  return (
    <>
      <div className={styles.searchBar}>
        <input
          id="searchInput"
          type="text"
          placeholder="Enter a Song, Album or Artist"
          className={styles.inputField}
          onChange={inputChange}
        ></input>
        <button className={styles.searchBtn} onClick={search}>
          <img
            className={styles.searchIcon}
            src="/magnifyingGlass.svg"
            alt="search icon"
          />
        </button>
      </div>
    </>
  );
}
export default SearchBar;
