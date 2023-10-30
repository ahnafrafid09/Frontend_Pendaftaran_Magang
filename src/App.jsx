import React from "react";
import Login from "./Pages/LogIn";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import LayoutAdmin from "./Pages/Admin/LayoutAdmin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/login" element={<Login />}></Route>
        <Route path="/admin/*" element={<LayoutAdmin />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
