import styles from "./PlaylistHome.module.css";
import Spotify from "../../util/Spotify";
import { useEffect, useState } from "react";

export default function PlaylistHome() {
  const [usersPlaylists, setUsersPlaylists] = useState([]);

  useEffect(() => {
    Spotify.getPlaylists()
      .then((playlistsArray) => {
        setUsersPlaylists(playlistsArray);
        console.log(playlistsArray);
      })
      .catch((error) => {
        console.log(`error getting user playlists: ${error}`);
      });

    if (usersPlaylists.length < 0) {
      usersPlaylists.map((playlist) => {
        return (
          <div className={styles.userPlaylistContainer}>
            <p>placeholder</p>
            <h2>{playlist.name}</h2>
            <p>{playlist.owner}</p>
            <p>{playlist.href}</p>
          </div>
        );
      });
    }
  }, []);
}
