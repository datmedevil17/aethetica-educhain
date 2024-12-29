import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home2";
import Battle from "./components/Battle";
import Canvass from "./components/Canvass";
import Marketplace from "./components/Marketplace";
import Profile from "./components/Profile";
import Artists from "./components/Artists";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/battle" element={<Battle />} />
        <Route path="/canvas" element={<Canvass />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/artists" element={<Artists />} />
      </Routes>
    </Router>
  );
}

export default App;
