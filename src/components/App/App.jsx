import { useState } from "react";
import Playlist from "../Playlist/Playlist";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import styles from "./App.module.css";
import Spotify from "../../util/Spotify";

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setListName] = useState("");
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [isRemoval, setIsRemoval] = useState(false);

  //check if current song is in playlist and, if not, add it to playlist
  const addTrack = (track) => {
    if (playlistTracks.some((savedTrack) => savedTrack.id === track.id)) return;

    setPlaylistTracks((prev) => [...prev, track]);
    setIsRemoval(true);
  };

  //remove track from playlist
  const removeTrack = (track) => {
    setPlaylistTracks((prevTracks) =>
      prevTracks.filter((currentTrack) => currentTrack.id !== track.id)
    );
    setIsRemoval(false);
  };

  // update the playlist name

  const changePlaylistName = (name) => {
    setListName(name);
  };

  //save playlist to user's spotify account
  const savePlaylist = () => {
    if (playlistTracks.length === 0) {
      return;
    }
    const urisArray = playlistTracks.map((track) => track.uri);
    Spotify.createPlaylist;
  };

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
          <SearchResults searchResults={searchResults} onAdd={addTrack} />
        </div>
        {/* Playlist Section */}
        <div className={styles.playlistContainer}>
          <Playlist
            playlistName={playlistName}
            playlistTracks={playlistTracks}
            onRemove={removeTrack}
            isRemoval={isRemoval}
            onChangeName={changePlaylistName}
          />
        </div>
      </div>
    </>
  );
}

export default App;
