import React, { createContext, useState, useContext } from "react";
import { GlobalContext } from "./GlobalContext";
import { GetContext } from "./GetContext";

export const DeleteContext = createContext();

export const DeleteProvider = (props) => {
  const { globalContext } = useContext(GlobalContext);
  const { axiosJwt, token } = globalContext;
  const { handleGet } = useContext(GetContext);
  const { getDataUser } = handleGet;

  const deletePelamar = async (e, pelamarId) => {
    e.preventDefault();

    try {
      const response = await axiosJwt.delete(`/admin/pelamar/${pelamarId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  const deleteAkun = async (e, userId) => {
    e.preventDefault();

    try {
      const response = await axiosJwt.delete(`/admin/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200) {
        getDataUser();
      }
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = { deletePelamar, deleteAkun };

  return (
    <DeleteContext.Provider value={{ handleDelete }}>
      {props.children}
    </DeleteContext.Provider>
  );
};
