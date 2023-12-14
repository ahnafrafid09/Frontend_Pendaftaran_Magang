import React from "react";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import LayoutAdmin from "./Pages/Admin/LayoutAdmin";
import LayoutUser from "./Pages/User/LayoutUser";
import LandingPages from "./Pages/LandingPages/LandingPages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<LandingPages />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/*" element={<LayoutAdmin />} />
        <Route path="/*" element={<LayoutUser />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
