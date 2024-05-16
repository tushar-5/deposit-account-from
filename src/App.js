import React from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import DepositForm from "./components/DepositForm";
import Checkings from "./components/Checkings";
import Saving from "./components/Saving";
import NotFound from "./components/NotFound";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<DepositForm/>}/>
        <Route exact path="/checkings" element={<Checkings/>}/>
        <Route exact path="/saving" element={<Saving/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
  </Router>
  );
}

export default App;
