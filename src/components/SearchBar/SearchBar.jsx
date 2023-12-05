import styles from "./searchBar.module.css";

function SearchBar() {
  return (
    <>
      <div className="searchBar">
        <input
          type="text"
          placeholder="Enter a Song, Album or Artist"
          className={styles.inputField}
        ></input>
        <button className="searchBtn">Search</button>
      </div>
    </>
  );
}
export default SearchBar;
