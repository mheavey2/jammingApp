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
      <div className={styles.playlistInfoContainer}>
        <div className={styles.playlistNameContainer}>
          <input
            type="text"
            value={props.playlistName}
            placeholder="Add/Change Playlist Name"
            onChange={changePlaylistName}
            className={styles.playlistNameInput}
          />
        </div>
        <button onClick={props.onSave} className={styles.saveToSpotifyButton}>
          Save <span> {props.playlistName} </span> to Spotify
        </button>
      </div>
      <div className={styles.trackListContainerOuter}>
        <Tracklist
          trackBtnAction="Remove"
          tracks={props.playlistTracks}
          emptyState="Playlist empty. Add tracks from the search results below."
          onClick={props.onRemove}
          inPlaylist={true}
        />
      </div>
    </div>
  );
  // }
}
export default Playlist;
