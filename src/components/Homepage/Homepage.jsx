import styles from "./Homepage.module.css";

export default function Homepage({ logged }, { username }) {
  return (
    <>
      <div className={styles.loggedDiv}>
        <h2>Hello</h2>
        <p>this is logged value: {logged}</p>
        <p>and username: {username}</p>
      </div>
    </>
  );
}
