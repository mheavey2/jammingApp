import styles from "./Homepage.module.css";
import recordsLogo from "/records.png";
import SearchBar from "../SearchBar/SearchBar";
import Spotify from "../../util/Spotify";
import { useState } from "react";
import SearchResults from "../SearchResults/SearchResults";

export default function Homepage({ userName }) {
  // declare state constants
  const [searchResults, setSearchResults] = useState([]);

  // search for track
  const search = (searchInput) => {
    Spotify.searchTracks(searchInput)
      .then((tracksArray) => {
        setSearchResults(tracksArray);
      })
      .catch((error) => {
        console.log("Error searching tracks: ", error);
      });
    console.log(searchInput);
  };

  return (
    <>
      <main className={styles.loggedInContainer}>
        <section className={styles.welcomeContainer}>
          <img
            src={recordsLogo}
            alt="Two Records side by side"
            className={styles.recordsLogo}
          />
          <h1>
            Hello <span>{userName}</span>
          </h1>

          <p>
            When you are ready, use the search bar to find songs to add to your
            new playlist
          </p>

          <div className={styles.searchContainer}>
            <SearchBar onSearch={search} />
          </div>
        </section>
      </main>
    </>
  );
}
