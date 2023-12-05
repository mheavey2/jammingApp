//import { useState } from "react";
import Playlist from "../Playlist/Playlist";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import styles from "./App.module.css";

function App() {
  return (
    <>
      <h1>Jamming App</h1>
      <div className={styles.container}>
        {/* Search Section */}
        <div className={styles.searchContainer}>
          <SearchBar />
        </div>
        {/* Results Section */}
        <div className={styles.resultsContainer}>
          <SearchResults />
        </div>
        {/* Playlist Section */}
        <div className={styles.playlistContainer}>
          <Playlist />
        </div>
      </div>
    </>
  );
}

export default App;
