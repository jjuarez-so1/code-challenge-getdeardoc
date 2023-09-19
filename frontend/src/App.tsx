import React from "react";
import "./app.scss";

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar";
import Navbar from "./components/navbar/Navbar";
import Pokedex from "./pages/pokedex/Pokedex";

function App() {
 return (
  <div className="App">
    <BrowserRouter>
      <Sidebar />
      <div className="AppContainer">
        <Navbar />
        <Routes>
          <Route path="/" element={<Pokedex />} />
        </Routes>
      </div>
    </BrowserRouter>
  </div>
 );
}

export default App;
