let accessToken = "";
const clientID = "b6e93f31f6e9459ba0b249e65cae275a";
const redirectURI = "http://localhost:5173";
const searchBaseURL = "https://api.spotify.com/v1/search";
const searchTrackQuery = "?type=track&q=";

const Spotify = {
  // need access token to search Spotify. so need to check if this is already set, if not get it from the url, if its there, or if neither of these, redirect the user to the authentication page

  getAccessToken() {
    // check if the access token is already set, return it's value if it is.
    if (accessToken) {
      return accessToken;
    }

    //using Implicit Grant flow, check url and get access token
    const urlAccessToken = window.location.href.match(/access_token=([^&]*)/);
    const urlExpiresIn = window.location.href.match(/expires_in=([^&]*)/);

    if (urlAccessToken && urlExpiresIn) {
      accessToken = urlAccessToken[1];
      const expiresIn = Number(urlExpiresIn[1]);
      //   set access token to empty variable after duration specified in the url
      window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
      //   clear parameters from URL so app doesn't try grabbing access token after it has expired
      window.history.pushState("Access Token", null, "/");
    } else {
      //   if access token is empty user is redirected to this authentication page
      const redirect = `https://accounts.spotify.com/autorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;

      window.location = redirect;
    }
  },

  //   fetch the data we're searching from the API.
  async search(term) {
    // first get access token
    const accessToken = Spotify.getAccessToken();

    //use this to fetch data searched for
    const response = await fetch(`${searchBaseURL}${searchTrackQuery}${term}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const jsonResponse = await response.json();
    // if there's no tracks returned, return an empty array
    if (!jsonResponse.tracks) {
      return [];
    }
    return jsonResponse.tracks.items.map((tracks) => ({
      id: tracks.id,
      name: tracks.name,
      artist: tracks.artists[0].name,
      album: tracks.album.name,
      uri: tracks.uri,
    }));
  },

  createPlaylist() {
    //create playlist method
  },
};

export default Spotify;
