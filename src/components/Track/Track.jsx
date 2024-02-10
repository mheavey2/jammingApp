import styles from "./track.module.css";

function Track(props) {
  const trackAction = (event) => props.onClick(props.track);

  return (
    <div className={styles.trackContainer}>
      <div className={styles.trackInfo}>
        <h3>{props.track.name}</h3>
        <p>
          {props.track.artist} | {props.track.album}
        </p>
      </div>
      <button className={styles.trackSaveButton} onClick={trackAction}>
        {props.trackBtnAction}
      </button>
    </div>
  );
}
export default Track;
