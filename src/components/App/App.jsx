import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
// import Root from "../Root/Root";
import Home from "../Home/Home";
import Login from "../Login/Login";
import SearchResults from "../SearchResults/SearchResults";

const appRouter = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Login />}></Route>
      <Route path="/home" element={<Home />}></Route>
      <Route path="/search" element={<SearchResults />}></Route>
    </>
  )
);

function App() {
  return <RouterProvider router={appRouter} />;
}

export default App;
