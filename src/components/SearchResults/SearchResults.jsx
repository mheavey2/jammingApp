import styles from "./searchResults.module.css";
import Tracklist from "../Tracklist/Tracklist";

function SearchResults(props) {
  return (
    <div className={styles.searchResultsContainer}>
      <h2>Top Ten Search Results </h2>
      <Tracklist
        trackBtnAction="Add"
        emptyState="Nothing to show. Try searching a song"
        tracks={props.searchResults}
        onClick={props.onAdd}
        inPlaylist={false}
      />
    </div>
  );
}

export default SearchResults;
