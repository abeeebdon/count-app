import React from "react";

import { Route, Routes } from "react-router";
import Homepage from "./pages/Homepage";
import Header from "./components/Header";
import SingleCountry from "./pages/SingleCountry";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/:id" element={<SingleCountry />} />
      </Routes>
    </>
  );
}

export default App;
