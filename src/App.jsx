import React from "react";
import Login from "./Pages/Login";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Dashboard from "./Pages/Admin/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/login" element={<Login />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
