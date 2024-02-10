let accessToken;
let userId;
const CLIENT_ID = "b6e93f31f6e9459ba0b249e65cae275a";
const REDIRECT_URI = "http://localhost:5173";
const searchBaseURL = "https://api.spotify.com/v1/search?q=";
// const searchTrackQuery = "?type=track&q=";

const Spotify = {
  // need access token to search Spotify.
  getAuth() {
    const tokenURL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=${REDIRECT_URI}`;
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
      window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
      window.history.pushState("Access token", null, "/");
      return accessToken;
    }
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
        if (response.status == 200) {
          return response.json();
        } else {
          throw new Error("Failed to fetch user data");
        }
      })
      .then((data) => {
        const userName = data.display_name;
        userId = data.id;
        return userName;
      });
  },

  // fetch the song track data we're searching from the API.
  async searchTracks(searchInput) {
    // first get access token
    //const accessToken = Spotify.getAuth();
    // Spotify.checkAuthentication();
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
          url: track.url,
        }));
        console.log(trackResults);
        return trackResults;
      });
  },

  //create playlist in Spotify
  createPlaylist(playlistName, urisArray) {
    const createPlaylistURL = `https://api.spotify.com/v1/users/${userId}/playlists`;
    const playlistData = {
      name: playlistName,
    };
    return fetch(createPlaylistURL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(playlistData),
    })
      .then((data) => {
        const playlistId = data.id;
        const tracksToAdd = {
          uris: urisArray,
        };

        const addTracksURL = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
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
