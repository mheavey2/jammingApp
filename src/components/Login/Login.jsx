import styles from "./Login.module.css";
import Spotify from "../../util/Spotify";
import { useEffect, useState } from "react";
import Homepage from "../HomePage/Homepage";

export default function Login() {
  const [logged, setLogged] = useState("");
  const [userName, setUserName] = useState("");

  // define what the app needs to do after Render
  useEffect(() => {
    //check authentication
    const authenticated = Spotify.checkAuthentication();
    if (authenticated) {
      Spotify.getUserName()
        .then((fetchName) => {
          setUserName(fetchName);
          setLogged(authenticated);
          console.log(`logged in username is: ${userName}`);
        })
        .catch((error) => {
          console.log("Error fetching username: ", error);
        });
    } else {
      console.log("Login Failed");
    }
  }, []);

  const loginHandler = () => {
    Spotify.getAuth();
  };

  if (!logged)
    return (
      <>
        <div>
          <h2>Not logged in :(</h2>
        </div>
        {/* Spotify Login */}
        <button className={styles.loginButton} onClick={loginHandler}>
          Login with Spotify
        </button>
      </>
    );
  return <Homepage logged={logged} username={userName} />;
}
