import styles from "./track.module.css";

function Track(props) {
  const trackAction = (event) => props.onClick(props.track);

  const toggleTrackActionButton = () => {
    if (props.trackBtnAction === "Add") {
      return <img className={styles.buttonImage} src="/plus.svg" alt="" />;
    } else {
      return <img className={styles.buttonImage} src="/minus.png" alt="" />;
    }
  };

  const toggleTrackContainerStyles = () => {};

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

        <button className={styles.trackSaveButton} onClick={trackAction}>
          {toggleTrackActionButton()}
        </button>
      </div>
    </div>
  );
}
export default Track;
