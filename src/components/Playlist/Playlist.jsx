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
        tracks={props.playlistTracks}
        emptyState="Playlist empty. Add tracks from the search results."
        onRemove={props.onRemove}
        isRemoval={true}
      />
      <button className={styles.playlistButton}>Save to Spotify</button>
    </div>
  );
}
export default Playlist;
