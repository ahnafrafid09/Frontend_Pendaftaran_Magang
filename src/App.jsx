import React from "react";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import LayoutAdmin from "./Pages/Admin/LayoutAdmin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route path="/admin/*" element={<LayoutAdmin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
