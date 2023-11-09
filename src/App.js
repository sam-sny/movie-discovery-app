import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Homepage from "./components/Hompage";
import Movies from "./components/Movies";

const App = () => {
  return(
  <Router>
<Routes>
  <Route path="/" element={<Homepage />}></Route>
  <Route path="/movies/:id" element={<Movies />}></Route>
</Routes>
  </Router>
  );
}

export default App;