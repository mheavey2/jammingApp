import styles from "./Homepage.module.css";
import recordsLogo from "/records.png";
import SearchBar from "../SearchBar/SearchBar";
import Spotify from "../../util/Spotify";
import { useState } from "react";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";

export default function Homepage({ userName }) {
  // declare state constants
  const [searchResults, setSearchResults] = useState([]);
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [playlistName, setPlayistName] = useState("");

  // search for track
  const search = (searchInput) => {
    Spotify.searchTracks(searchInput)
      .then((tracksArray) => {
        setSearchResults(tracksArray);
      })
      .catch((error) => {
        console.log("Error searching tracks: ", error);
      });
    console.log(`search method searchInput: ${searchInput}`);
  };

  //remove track from playlist
  const removeTrack = (track) => {
    setPlaylistTracks((prevTracks) =>
      prevTracks.filter((currentTrack) => currentTrack.id !== track.id)
    );
  };

  // update the playlist name

  const changePlaylistName = (name) => {
    setPlayistName(name);
  };

  //save playlist to user's spotify account
  const savePlaylist = () => {
    if (playlistTracks.length === 0) {
      return;
    }
    const urisArray = playlistTracks.map((track) => track.uri);
    console.log(`uriARRAY: {urisArray}`);

    Spotify.createPlaylist(playlistName, urisArray)
      .then((res) => {
        if (res) {
          alert("Playlist saved successfully");
          setPlaylistTracks([]);
          setPlayistName("");
        }
      })
      .catch((error) => {
        console.log("Error saving PLaylist: ", error);
      });
  };

  //check if current song is in playlist and, if not, add it to playlist
  const addTrack = (track) => {
    if (playlistTracks.some((savedTrack) => savedTrack.id === track.id)) return;

    setPlaylistTracks((prev) => [...prev, track]);
    console.log(`track "${track.name}" added`);
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
        </section>
        {/* Search Section */}
        <section className={styles.searchContainer}>
          <SearchBar onSearch={search} />
        </section>
        {/* Results Section */}
        <section className={styles.resultsContainerOuter}>
          <div className={styles.resultsContainer}>
            <SearchResults searchResults={searchResults} onAdd={addTrack} />
          </div>
          <div className={styles.playlistContainer}>
            <Playlist
              playlistName={playlistName}
              playlistTracks={playlistTracks}
              onRemove={removeTrack}
              onChangeName={changePlaylistName}
              onSave={savePlaylist}
            />
          </div>
        </section>
      </main>
    </>
  );
}
