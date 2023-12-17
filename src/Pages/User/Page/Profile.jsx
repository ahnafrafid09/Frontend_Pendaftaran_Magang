import React, { useContext, useState } from "react";
import Title from "../../../Components/Title";
import { GlobalContext } from "../../../Context/GlobalContext";
import { FaRegUserCircle } from "react-icons/fa";
import SubTitle from "../../../Components/SubTitle";
import Button from "../../../Components/Button";
import { UpdateContext } from "../../../Context/UpdateContext";

const Profile = () => {
  const { globalContext } = useContext(GlobalContext);
  const { handleUpdate, stateUpdate } = useContext(UpdateContext);
  const { name, username, email, id } = globalContext;
  const { updatePassword } = handleUpdate;
  const { msg, changePassword, setChangePassword } = stateUpdate;
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <Title>Manajemen Akun</Title>
      <div className="w-full bg-blue-50 mt-10 px-10 flex items-center h-28 gap-5 rounded">
        <FaRegUserCircle size="60px" />
        <div className="text-xl font-lato capitalize">
          <h1>Informasi Akun</h1>
          <p className="font-bold ">{name}</p>
        </div>
      </div>
      <div className="w-full bg-blue-50 mt-10 px-10 py-5">
        <SubTitle>Profile Anda</SubTitle>
        <div className="grid grid-cols-1 md:grid-cols-2  gap-10 my-10">
          <div className="flex items-center justify-center gap-x-11 ">
            <h3>Nama :</h3>
            <input
              className="rounded bg-gray-300 capitalize"
              type="text"
              disabled
              value={name}
            />
          </div>
          <div className="flex items-center justify-center gap-x-11">
            <h3>Email :</h3>
            <input
              className="rounded bg-gray-300 capitalize"
              type="text"
              disabled
              value={email}
            />
          </div>
          <div className="flex items-center justify-center  gap-x-4">
            <h3>Username :</h3>
            <input
              className="rounded bg-gray-300 capitalize"
              type="text"
              disabled
              value={username}
            />
          </div>
          <div className="justify-self-end md:justify-self-center">
            <Button
              bgColor="bg-green-700"
              paddingY="py-2"
              paddingX="px-2"
              textColor="text-white font-medium"
            >
              Ubah Password
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
