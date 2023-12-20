import React, { useContext, useState } from "react";
import Title from "../../../Components/Title";
import { GlobalContext } from "../../../Context/GlobalContext";
import { FaRegUserCircle } from "react-icons/fa";
import SubTitle from "../../../Components/SubTitle";
import Button from "../../../Components/Button";
import { UpdateContext } from "../../../Context/UpdateContext";
import { Modal } from "flowbite-react";
import TextInput from "../../../Components/TextInput";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {
  const { globalContext } = useContext(GlobalContext);
  const { handleUpdate, stateUpdate } = useContext(UpdateContext);
  const { axiosJwt, token, userId } = globalContext;
  const { name, username, email, idUser } = globalContext;
  const [openModal, setOpenModal] = useState(false);
  const {updatePassword} = handleUpdate
  const { changePassword, setChangePassword, msg } = stateUpdate;

  
  const handleUbahPassword = () => {
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  const handleOldPasswordChange = (e) => {
    setChangePassword({ ...changePassword, oldPassword: e.target.value });
  };
  
  const handleNewPasswordChange = (e) => {
    setChangePassword({ ...changePassword, newPassword: e.target.value });
  };
  
  const handleConfNewPasswordChange = (e) => {
    setChangePassword({ ...changePassword, confNewPassword: e.target.value });
  };

  const handleUpdatePassword = async (e, userId) => {
    e.preventDefault();
    try {
      const response = await updatePassword(e, userId);
      if (response.status === 200) {
        toast.success(response.data.msg, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        closeModal();
      }
    } catch (error) {
      console.error(error);
      if (error) {
        setMsg(error.response.data.msg);
      }
    }
  };

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
        onClick={handleUbahPassword}
      >
        Ubah Password
      </Button>
      <Modal show={openModal} onClose={closeModal} size="sm" popup>
        <Modal.Header />
        <Modal.Body className="flex flex-col items-center justify-center">
          <h1 className="text-center text-xl font-semibold font-roboto text-netral-black">
            Ubah Password
          </h1>
          <p className=" text-center font-semibold text-error font-lato">
            {msg}
          </p>
          <div className="flex items-center justify-center gap-5 flex-col pt-3">
            <TextInput
              label="Password Lama"
              type="password"
              id="oldPassword"
              value={changePassword.oldPassword}
              onChange={handleOldPasswordChange}
            />
            <TextInput
              label="New Password"
              type="password"
              id="newPassword"
              value={changePassword.newPassword}
              onChange={handleNewPasswordChange} 
            />
            <TextInput
              label="Konfirmasi Password"
              type="password"
              id="confNewPassword"
              value={changePassword.confNewPassword}
              onChange={handleConfNewPasswordChange}
            />
          </div>
        </Modal.Body>
        <Modal.Footer className="flex items-center justify-center w-full gap-10">
          <Button
            bgColor="bg-primary-blue"
            paddingY="py-2"
            paddingX="px-4"
            style="w-20"
            textColor="text-netral-white"
            onClick={(e)=> handleUpdatePassword(e, userId)}
          >
            Simpan
          </Button>
          <Button
            bgColor="bg-blue-200"
            paddingY="py-2"
            paddingX="px-4"
            style="w-20"
            textColor="text-blue-800"
            onClick={close}
          >
            Batal
          </Button>
        </Modal.Footer>
      </Modal>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Profile;
