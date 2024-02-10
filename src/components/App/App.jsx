import { useState, useEffect } from "react";
// import other components
import Playlist from "../Playlist/Playlist";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import styles from "./App.module.css";
import Spotify from "../../util/Spotify";

function App() {
  // declare state constants
  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setListName] = useState("");
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [isRemoval, setIsRemoval] = useState(false);
  const [logged, setLogged] = useState(false);
  const [userName, setUserName] = useState("");

  // TODO define purpose of this useEffect
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
  if (!logged) {
    return (
      // {/* whats returned if not logged in to spotify */}
      <main>
        <section className={styles.loginHeader}>
          <h1>Jammin App</h1>
          {/* Spotify Login */}
          <button className={styles.loginButton} onClick={loginHandler}>
            Login with Spotify
          </button>
        </section>
      </main>
    );
  } else {
    return (
      <>
        <h1>Jammin App</h1>
        <div className={styles.container}>
          {/* <div className={styles.howToContainer}>
          <ol>
            <li>Login to your Spotify account</li>
            <li>Search for track name</li>
            <li>View the top 10 results for your search</li>
            <li>Add them to a custom playlist</li>
            <li>Save your new playlist to your Spotify account</li>
          </ol>
        </div> */}

          <div className={styles.mainContainer}>
            <h2>Hello {userName}</h2>
            <p>
              Welcome to the Jammin App. When you are ready, use the search bar
              to find songs to add to your new playlist
            </p>
            {/* Search Section */}
            <div className={styles.searchContainer}>
              <SearchBar onSearch={search} />
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
