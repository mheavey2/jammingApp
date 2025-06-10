import Tracklist from "../Tracklist/Tracklist";
import styles from "./playlist.module.css";

function Playlist(props) {
  //event handler for changing playlist name using the input box
  const changePlaylistName = (event) => {
    props.onChangeName(event.target.value);
  };

  // if (props.playlistTracks.length > 0) {
  return (
    <div className={styles.playlistResultsContainer}>
      <h2>Your Playlist</h2>
      <h3>
        Playlist name: <span>{props.playlistName}</span>
      </h3>

      <div className={styles.playlistNameContainer}>
        <input
          type="text"
          value={props.playlistName}
          placeholder="Add a Playlist Name"
          onChange={changePlaylistName}
        />
      </div>
      <Tracklist
        trackBtnAction="Remove"
        tracks={props.playlistTracks}
        emptyState="Playlist empty. Add tracks from the search results."
        onClick={props.onRemove}
        inPlaylist={true}
      />

      <button onClick={props.onSave} className={styles.saveToSpotifyButton}>
        Save <span> {props.playlistName} </span> to Spotify
      </button>
    </div>
  );
  // }
}
export default Playlist;
