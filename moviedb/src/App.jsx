import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./Component/HomePage";
import Navbar from "./Component/Global/Navbar";
import TopRated from "./Component/TopRated";
import Upcomming from "./Component/Upcomming";
import SinglePage from "./Component/SinglePage";
import Search from "./Component/Search";

function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route exact path="/" element={<HomePage />}></Route>
        <Route exact path="/top" element={<TopRated />}></Route>
        <Route exact path="/upcome" element={<Upcomming />}></Route>
        <Route exact path="/single/:id" element={<SinglePage />}/>
        <Route exact path="/search/:name" element={<Search />}/>
      </Routes>
    </>
  );
}

export default App;
