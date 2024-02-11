# Jammin App

## Description

This app is built using HTML, CSS, JavaScript and React. It allows a user to search Spotify for a song, add that song to a playlist and save the custom playlist to their spotify account via the Spotify API using their Spotify login credentials.

### Main Features

The main features of the app are:

- Single-click login screen
- Welcome user by name pnce logged in
- Dashboard with sections to manage search, search results and the playlist
- Search by artist or song or keyword
- Assign a unique name for the playlist
- Single-click to save playlist to users' Spotify account

## How to Use App

App can be initialised by running `$ npm dev` in the project root folder.

Once initialised the user is presented with the app landing page

<img src="./images/jamminAppLoginView.png" alt="landing page" width="400" height="auto"></img>

Clicking on the 'Login with Spotify' button redirects the user to the Spotify login page to enter their credentials. Once logged in the user is redirected to to the apps main interface.

<img src="./images/jamminAppLoggedInView.png" alt="main page" width="400" height="auto"></img>

The user can search for song titles / artists / keywords in the search bar. The top ten search results are displayed on the left of the screen with track info including artist, album and album art.

<img src="./images/jamminAppSearchView.png" alt="main page" width="400" height="auto"></img>

The user can add songs to the playlist section on the right of the screen using the "Add" button beside each song.
Songs can be removed from the playlist using the "Remove" button beside each song.

<img src="./images/jamminAppPlaylistView.png" alt="main page" width="400" height="auto"></img>

Users can add a name to their playlist which will be displayed at the top of the playlist beside the "Your Playlist" text.

Users can also save their playlists to their Spotify account by clicking on the Save to Spotify button at the bottom of the playlist section.

<img src="./images/jamminAppPlaylistNamedView.png" alt="main page" width="400" height="auto"></img>
