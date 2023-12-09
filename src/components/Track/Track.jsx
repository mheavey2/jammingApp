import styles from "./track.module.css";

function Track(props) {
  // display + button if track to be added or - button if track to be removed

  // const renderAction = (props) => {
  //   props.isRemoval ? (
  //     <button className={styles.trackAction}>-</button>
  //   ) : (
  //     <button className={styles.trackAction}>+</button>
  //   );
  // };

  // function renderAction() {
  //   if (this.props.isRemoval) {
  //     return <button className={styles.trackAction}>-</button>;
  //   } else {
  //     return <button className={styles.trackAction}>+</button>;
  //   }
  // }
  const isRemoval = props.isRemoval;

  const addTrack = () => {
    props.onAdd(props.track);
  };

  const removeTrack = () => {
    props.onRemove(props.track);
  };

  return (
    <div className={styles.trackContainer}>
      <div className={styles.trackInfo}>
        <h3>{props.track.name}</h3>
        <p>
          {props.track.artist} | {props.track.album}
        </p>
      </div>
      {isRemoval ? (
        <button className={styles.trackAction} onClick={removeTrack}>
          -
        </button>
      ) : (
        <button className={styles.trackAction} onClick={addTrack}>
          +
        </button>
      )}
    </div>
  );
}
export default Track;
