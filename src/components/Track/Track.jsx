import styles from "./track.module.css";

function Track(props) {
  const trackAction = (event) => props.onClick(props.track);

  return (
    <div className={styles.trackContainer}>
      <div className={styles.trackContent}>
        <img
          src={props.track.image}
          alt={props.track.artist}
          className={styles.trackImage}
        />
        <div className={styles.trackInfo}>
          <h3>{props.track.name}</h3>
          <p>{props.track.artist} </p>
          <p>{props.track.album}</p>
        </div>
      </div>
      <button className={styles.trackSaveButton} onClick={trackAction}>
        {props.trackBtnAction}
      </button>
    </div>
  );
}
export default Track;
