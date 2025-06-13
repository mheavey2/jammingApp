import styles from "./searchResults.module.css";
import Tracklist from "../Tracklist/Tracklist";

function SearchResults(props) {
  return (
    <div className={styles.searchResultsContainer}>
      <h2>Your Search Results </h2>
      <Tracklist
        trackBtnAction="Add"
        emptyState="Use the searchbar to find music"
        tracks={props.searchResults}
        onClick={props.onAdd}
        inPlaylist={false}
      />
    </div>
  );
}

export default SearchResults;
