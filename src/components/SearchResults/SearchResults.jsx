import styles from "./searchResults.module.css";
import Tracklist from "../Tracklist/Tracklist";

function SearchResults(props) {
  return (
    <div className={styles.searchResultsContainer}>
      <h2>Search Results</h2>
      <Tracklist tracks={props.searchResults} />
    </div>
  );
}

export default SearchResults;
