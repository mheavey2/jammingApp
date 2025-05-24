import { useState, useEffect } from "react";
// import other components
import Playlist from "../Playlist/Playlist";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import styles from "./App.module.css";
import Spotify from "../../util/Spotify";
import jamminLogo from "./images/headphonesLogo.png";
import recordsLogo from "./images/records.png";

function App() {
  // declare state constants
  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlayistName] = useState("");
  const [playlistTracks, setPlaylistTracks] = useState([]);

  const [logged, setLogged] = useState(false);
  const [userName, setUserName] = useState("");

  // define what the app needs to do after Render
  useEffect(() => {
    //check authentication
    const authenticated = Spotify.checkAuthentication();
    if (authenticated) {
      Spotify.getUserName()
        .then((fetchName) => {
          setUserName(fetchName);
          setLogged(authenticated);
          console.log(`logged in username is: ${userName}`);
        })
        .catch((error) => {
          console.log("Error fetching username: ", error);
        });
    } else {
      console.log("Login Failed");
    }
  }, []);

  const loginHandler = () => {
    Spotify.getAuth();
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
    console.log(searchInput);
  };

  //check if current song is in playlist and, if not, add it to playlist
  const addTrack = (track) => {
    if (playlistTracks.some((savedTrack) => savedTrack.id === track.id)) return;

    setPlaylistTracks((prev) => [...prev, track]);
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

  // if user is not logged in to Spotify this is the view they will see
  if (!logged) {
    return (
      // {/* whats returned if not logged in to spotify */}
      <main className={styles.notLoggedContainer}>
        <section className={styles.loginHeader}>
          <img
            src={jamminLogo}
            alt="Jammin Logo"
            className={styles.jamminLoginLogo}
          />
          <h1>
            <span className={styles.firstWave}>J</span>
            <span className={styles.secondWave}>A</span>
            <span className={styles.firstWave}>M</span>
            <span className={styles.secondWave}>M</span>
            <span className={styles.firstWave}>I</span>
            <span className={styles.secondWave}>N</span>
            <span className={styles.waveFirstLetter}> </span>
            <span className={styles.firstWave}>A</span>
            <span className={styles.secondWave}>P</span>
            <span className={styles.firstWave}>P</span>
            {/* Jammin App */}
          </h1>
          {/* Spotify Login */}
          <button className={styles.loginButton} onClick={loginHandler}>
            Login with Spotify
          </button>
        </section>
      </main>
    );
  } else {
    // if user is logged in to Spotify this is the view they will see
    return (
      <>
        <div className={styles.container}>
          <div className={styles.welcomeContainer}>
            <img
              src={jamminLogo}
              className={styles.jamminLoginLogo}
              alt="Image of two records"
            />
            <h2>
              Hello <span>{userName}</span>
            </h2>

            <p>Welcome to the Jammin App.</p>
            <p>
              When you are ready, use the search bar to find songs to add to
              your new playlist
            </p>
            <img
              src={recordsLogo}
              alt="Two Records side by side"
              className={styles.recordsLogo}
            />
            {/* Search Section */}
            <div className={styles.searchContainer}>
              <SearchBar onSearch={search} />
            </div>
          </div>

          <div className={styles.mainContainer}>
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
                onChangeName={changePlaylistName}
                onSave={savePlaylist}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default App;
