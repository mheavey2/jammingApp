import styles from "./playlist.module.css";

function Playlist() {
  return (
    <>
      <h2>Your Playlist</h2>
      <input type="text" defaultValue={"New Playlist"} />
      <button className={styles.playlistButton}>Save to Spotify</button>
    </>
  );
}
export default Playlist;
