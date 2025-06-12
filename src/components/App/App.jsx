import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
// import Root from "../Root/Root";
import Homepage from "../HomePage/Homepage";
import Login from "../Login/Login";
import SearchResults from "../SearchResults/SearchResults";
import PlaylistHome from "../playlistHome/PlaylistHome";

const appRouter = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Login />}></Route>
      <Route path="/home" element={<Homepage />}></Route>
      <Route path="/search" element={<SearchResults />}></Route>
      <Route path="playlists" element={<PlaylistHome />}></Route>
    </>
  )
);

function App() {
  return <RouterProvider router={appRouter} />;
}

export default App;
