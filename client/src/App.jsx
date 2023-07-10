import React, { useContext } from "react";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { Navigate,BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

function App() {
  const {user}=useContext(AuthContext)
  return (
    <div className="App">
    <Router>
      <Routes>
        <Route exact path="/" element={user?<Home />:<Register />} />
        <Route path="/login" element={user?<Navigate to="/" />:<Login />} />
        <Route path="/register" element={user?<Navigate to="/" />:<Register />} />
        <Route exact path="/profile/:username" element={<Profile />} />
      </Routes>
    </Router>
    </div>
  )
}

export default App;
