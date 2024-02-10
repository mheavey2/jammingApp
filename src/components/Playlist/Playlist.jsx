import Tracklist from "../Tracklist/Tracklist";
import styles from "./playlist.module.css";

function Playlist(props) {
  //event handler for changing playlist name using the input box
  const changePlaylistName = (event) => {
    props.onChangeName(event.target.value);
  };

  return (
    <div className={styles.playlistContainer}>
      <h2>Your Playlist</h2>
      <div className={styles.playlistNameContainer}>
        <input
          type="text"
          value={props.playlistName}
          placeholder="Add a Playlist Name"
          onChange={changePlaylistName}
        />
      </div>
      <Tracklist
        trackBtnAction="Remove from Playlist"
        tracks={props.playlistTracks}
        emptyState="Playlist empty. Add tracks from the search results."
        onClick={props.onRemove}
        inPlaylist={true}
      />
      <div className={styles.saveToSpotifyContainer}>
        <button onClick={props.onSave} className={styles.saveToSpotifyButton}>
          Save to Spotify
        </button>
      </div>
    </div>
  );
}
export default Playlist;
