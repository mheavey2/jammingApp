import { useState } from "react";
import Spotify from "../../util/Spotify";
import styles from "./searchBar.module.css";

function SearchBar(props) {
  const [searchInput, setSearchInput] = useState("");

  const inputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const search = () => {
    const searchInput = document.querySelector("#searchInput");
    if (!searchInput.innerHTML) {
      searchInput.classList.add(`${styles.addShake}`);
      setTimeout(removeShakeClass, 500);
    } else {
      props.onSearch(searchInput);
    }
    console.log(searchInput.classList);
  };

  const removeShakeClass = () => {
    const searchInput = document.querySelector("#searchInput");
    searchInput.classList.remove(`${styles.addShake}`);
    console.log(searchInput.classList);
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
          Search
        </button>
      </div>
    </>
  );
}
export default SearchBar;
