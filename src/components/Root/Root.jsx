import styles from "./root.module.css";
import jamminLogo from "/headphonesLogo.png";
// import { Outlet } from "react-router-dom";
import Login from "../Login/Login";

export default function Root() {
  return (
    <>
      <div className={styles.outerContainer}>
        <header className={styles.loginHeader}>
          <img
            src={jamminLogo}
            alt="Jammin Logo"
            className={styles.jamminLoginLogo}
          />
          <h1>
            <span className={styles.firstWave}>J</span>
            <span className={styles.secondWave}>A</span>
            <span className={styles.firstWave}>M</span>
            <span className={styles.secondWave}>M</span>
            <span className={styles.firstWave}>I</span>
            <span className={styles.secondWave}>N</span>
            <span className={styles.waveFirstLetter}> </span>
            <span className={styles.firstWave}>A</span>
            <span className={styles.secondWave}>P</span>
            <span className={styles.firstWave}>P</span>
          </h1>
        </header>
      </div>
      <Login />
    </>
  );
}
