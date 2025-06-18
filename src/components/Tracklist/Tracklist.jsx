import Track from "../Track/Track";
import styles from "./tracklist.module.css";

function Tracklist(props) {
  if (props.tracks.length > 0) {
    return (
      <div className={styles.tracklistContainer}>
        <div className={styles.tracklistHeader}>
          <h5>Title</h5>
          <div id={styles.tracklistHeaderOtherInfo}>
            <h5>Album</h5>
            <h5>+/- from Playlist</h5>
          </div>
        </div>
        {/* map method to render a set of Track components */}
        {props.tracks.map((track) => {
          return (
            <Track
              key={track.id}
              track={track}
              trackBtnAction={props.trackBtnAction}
              onClick={props.onClick}
              inPlaylist={props.inPlaylist}
            />
          );
        })}
      </div>
    );
  } else {
    return (
      <div className={styles.emptyStateContainer}>
        <h3 className={styles.emptyStateResults}>{props.emptyState}</h3>
      </div>
    );
  }
}

export default Tracklist;
