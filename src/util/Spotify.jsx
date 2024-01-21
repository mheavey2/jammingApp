let accessToken;
let userId;
const CLIENT_ID = "b6e93f31f6e9459ba0b249e65cae275a";
const REDIRECT_URI = "http://localhost:5173";
const searchBaseURL = "https://api.spotify.com/v1/search?q=";
// const searchTrackQuery = "?type=track&q=";

const Spotify = {
  getAuth() {
    const tokenURL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=${REDIRECT_URI}`;
    window.location = tokenURL;
    console.log("authentication gotten");
  },
  // need access token to search Spotify. so need to check if this is already set, if not get it from the url, if its there, or if neither of these, redirect the user to the authentication page

  // getAccessToken() {
  //using Implicit Grant flow, check url and get access token
  //const urlAccessToken = window.location.href.match(/access_token=([^&]*)/);
  //const urlExpiresIn = window.location.href.match(/expires_in=([^&]*)/);
  // check if the access token is already set, return it's value if it is.
  // if (accessToken) {
  //   console.log(accessToken);

  //   return accessToken;
  // }

  //   if (urlAccessToken && urlExpiresIn) {
  //     accessToken = urlAccessToken[1];
  //     const expiresIn = Number(urlExpiresIn[1]);
  //     //   set access token to empty variable after duration specified in the url
  //     window.setTimeout(() => (accessToken = ""), expiresIn * 100000);
  //     //   clear parameters from URL so app doesn't try grabbing access token after it has expired
  //     window.history.pushState("Access Token", null, "/");
  //   } else {
  //     console.log("getting access token didnt work");
  //     //   if access token is empty user is redirected to this authentication page
  //     const redirect = `https://accounts.spotify.com/autorize?client_id=${CLIENT_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=${REDIRECT_URI}`;

  //     window.location = redirect;
  //   }
  // },

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

      //   set access token to empty variable after duration specified in the url
      const timeout = window.setTimeout(
        () => (accessToken = ""),
        expiresIn * 100000
      );
      console.log(`Timeout set to: ${timeout}`);
      // //   clear parameters from URL so app doesn't try grabbing access token after it has expired
      window.history.pushState("Access Token", null, "/");
      console.log("Authenticated");
      return true;
    } else {
      console.log("Authentication failed");
      return false;
    }
  },

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

  //   fetch the data we're searching from the API.
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

  /*
    const jsonResponse = await response.json();
    // if there's no tracks returned, return an empty array
    if (!jsonResponse.tracks) {
      console.log("no results");
      return [];
    }
    return jsonResponse.tracks.items.map((tracks) => ({
      id: tracks.id,
      name: tracks.name,
      artist: tracks.artists[0].name,
      album: tracks.album.name,
      image: tracks.album.image[0].url,
      uri: tracks.uri,
    }));
  },
  */

  createPlaylist() {
    //create playlist method
  },
};

export default Spotify;
