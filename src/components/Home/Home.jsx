import styles from "./Home.module.css";
import jamminLogo from "/headphonesLogo.png";
import person from "/person.png";
import externalLinkIcon from "/externalLink.png";
import SearchBar from "../SearchBar/SearchBar";
import Spotify from "../../util/Spotify";
import { useState } from "react";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";

function Home({ userName }) {
  // declare state constants
  const [searchResults, setSearchResults] = useState([]);
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [playlistName, setPlayistName] = useState("");
  const [isHidden, setIsHidden] = useState(true);

  const logout = () => {
    Spotify.resetToken();
  };

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

  const toggleMenuVisibility = () => {
    setIsHidden(!isHidden);
  };

  return (
    <>
      <header className={styles.headerContainer}>
        <img
          src={jamminLogo}
          alt="Two Records side by side"
          className={styles.logo}
        />
        {/* Search Section */}
        <div className={styles.searchContainer}>
          <SearchBar onSearch={search} />
        </div>
        <div className={styles.userAccountContainerOuter}>
          <p id={styles.greeting}>
            Hello <span>{userName}</span>
          </p>
          <div className={styles.userAccountContainer}>
            <button
              onClick={toggleMenuVisibility}
              className={styles.toggleUserMenuBtn}
            >
              <img src={person} alt="icon of a person" />
            </button>
          </div>
        </div>
      </header>
      {/* userMenu */}
      <div className={styles.userMenuOuter}>
        <div
          className={isHidden ? styles.userMenuHidden : styles.userMenuVisible}
        >
          <ul role="menu" id={styles.userMenuList}>
            <li role="presentation" className={styles.userMenuItem}>
              <button className={styles.userMenuButton}>
                <a href="https://open.spotify.com/">
                  Go to Spotify
                  <img src={externalLinkIcon} alt="external link" role="img" />
                </a>
              </button>
            </li>
            <li className={styles.userMenuItem}>
              <button className={styles.userMenuButton} onClick={logout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>

      <main className={styles.loggedInContainer}>
        {/* Results Section */}
        <section className={styles.resultsContainerOuter}>
          <div className={styles.playlistContainer}>
            <Playlist
              playlistName={playlistName}
              playlistTracks={playlistTracks}
              onRemove={removeTrack}
              onChangeName={changePlaylistName}
              onSave={savePlaylist}
            />
          </div>
          <div className={styles.resultsContainer}>
            <SearchResults searchResults={searchResults} onAdd={addTrack} />
          </div>
        </section>
        <div></div>
      </main>
    </>
  );
}

export default Home;
