import React from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import NotFound from "./components/NotFound";
import Homepage from "./components/Home";
import DepositForm from "./components/DepositForm";
import VerifyEmail from "./components/VerifyEmail";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" Component={Homepage}/>
        <Route exact path="/checkings" Component={DepositForm}/>
        <Route exact path="/saving" Component={DepositForm}/>
        <Route exact path="/verifyemail" Component={VerifyEmail}/>
        <Route path="*" Component={NotFound}/>
      </Routes>
  </Router>
  );
}

export default App;
