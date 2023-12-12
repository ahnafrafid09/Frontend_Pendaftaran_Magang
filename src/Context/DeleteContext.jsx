import React, { createContext, useState, useContext } from "react";
import { GlobalContext } from "./GlobalContext";

export const DeleteContext = createContext();

export const DeleteProvider = (props) => {
  const { globalContext } = useContext(GlobalContext);
  const { axiosJwt, token } = globalContext;

  const deletePelamar = async (e, pelamarId) => {
    e.preventDefault();

    try {
      const response = await axiosJwt.delete(`/pelamar/${pelamarId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = { deletePelamar };

  return (
    <DeleteContext.Provider value={{ handleDelete }}>
      {props.children}
    </DeleteContext.Provider>
  );
};
