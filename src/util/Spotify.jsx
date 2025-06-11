let accessToken;
let userId;
const CLIENT_ID = "b6e93f31f6e9459ba0b249e65cae275a";
const REDIRECT_URI = "http://localhost:5173/";
const searchBaseURL = "https://api.spotify.com/v1/search?q=";

const Spotify = {
  // need access token to search Spotify.
  getAuth() {
    const tokenURL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&show_dialog=true&scope=playlist-modify-public&redirect_uri=${REDIRECT_URI}`;
    window.location = tokenURL;
    console.log("authentication gotten");
  },

  checkAuthentication() {
    //check if access token already available
    if (accessToken) {
      return accessToken;
    }

    const urlAccessToken = window.location.href.match(/access_token=([^&]*)/);
    const urlExpiresIn = window.location.href.match(/expires_in=([^&]*)/);

    if (urlAccessToken && urlExpiresIn) {
      accessToken = urlAccessToken[1];
      const expiresIn = Number(urlExpiresIn[1]);
      console.log(`Expires in: ${expiresIn} ms`);

      // set access token to empty variable after duration specified in the url so app doesn't try grabbing access token after it has expired
      window.setTimeout(() => {
        accessToken = "";
        window.history.pushState("Access token", null, "/");
        console.log(`access token after timeout is: ${accessToken}`);
        window.location = REDIRECT_URI;
      }, expiresIn * 100000);

      return accessToken;
    }
  },

  resetToken() {
    accessToken = "";
    window.history.pushState("Access token", null, "/");
    console.log(`access token after timeout is: ${accessToken}`);
    window.location = REDIRECT_URI;
    return accessToken;
  },

  // get user name data from Spotify
  getUserName() {
    if (!accessToken) {
      return Promise.reject(new Error("Access token is missing"));
    }
    const userEndpoint = "https://api.spotify.com/v1/me";
    return fetch(userEndpoint, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error("Failed to fetch user data");
        }
      })
      .then((data) => {
        const userName = data.display_name;
        //console.log(`user name is: ${userName}`);
        userId = data.id;
        //console.log(`user ID is: ${userId}`);
        return userName;
      });
  },

  // fetch the song track data we're searching from the API.
  async searchTracks(searchInput) {
    const searchEndpoint = `${searchBaseURL}${searchInput}&type=track&limit=10`;
    //use this to fetch data searched for
    return fetch(searchEndpoint, {
      method: "GET",
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then((response) => response.json())
      .then((data) => {
        const trackResults = data.tracks.items.map((track) => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          image: track.album.images[0].url,
          uri: track.uri,
        }));
        console.log(
          `trackResults object from spotify fetch: ${trackResults}. total results: ${trackResults.length}`
        );
        return trackResults;
      });
  },

  //create playlist in Spotify
  createPlaylist(listName, urisArray) {
    const createPlaylistURL = `https://api.spotify.com/v1/users/${userId}/playlists`;
    const playlistData = {
      name: listName,
    };

    return fetch(createPlaylistURL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(playlistData),
    })
      .then((response) => {
        if (response.status === 201) {
          console.log("playlist created");
          return response.json();
        } else {
          throw new Error("Failed to create playlist");
        }
      })
      .then((data) => {
        const playlist_id = data.id;
        const tracksToAdd = {
          uris: urisArray,
        };

        //  console.log(`playlist ID is: ${playlist_id}`);
        const addTracksURL = `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`;

        // console.log(`access token: ${accessToken}`);
        return fetch(addTracksURL, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },

          body: JSON.stringify(tracksToAdd),
        });
      })
      .then((res) => res.json())
      .then((result) => {
        if (result) {
          return true;
        } else {
          return false;
        }
      });
  },
};

export default Spotify;
