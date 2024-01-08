import React, { useContext, useState } from "react";
import TextInput from "../../../../Components/TextInput";
import DropdownInput from "../../../../Components/DropdownInput";
import Button from "../../../../Components/Button";
import { PostContext } from "../../../../Context/PostContext";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import { HiOutlineInformationCircle } from "react-icons/hi";
import "react-toastify/dist/ReactToastify.css";
import Title from "../../../../Components/Title";
import { Modal } from "flowbite-react";
import { useNavigate } from "react-router-dom";

const TambahAkun = () => {
  const { handlePost, statePost } = useContext(PostContext);
  const { inputUser, setInputUser, msg, setMsg } = statePost;
  const { role, name, username, email, password, confPassword } = inputUser;
  const [openModal, setOpenModal] = useState(false);
  const { tambahUser } = handlePost;
  const navigate = useNavigate();

  const reset = () => {
    setInputUser({
      role: "",
      name: "",
      username: "",
      email: "",
      password: "",
      confPassword: "",
    });
    setMsg("");
  };

  const handleTambahUser = async (e) => {
    try {
      const response = await tambahUser(e);
      if (response.status === 201) {
        closeModal();
        navigate("/admin/akun");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChangeInput = (e) => {
    const { id, value } = e.target;
    setInputUser((prevInputUser) => ({
      ...prevInputUser,
      [id]: value,
    }));
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <Title>Tambah Akun</Title>
      <ToastContainer />
      <div className="flex justify-start items-center mt-5">
        <Button
          textColor="text-white"
          navigate="/admin/akun"
          icon={<AiOutlineArrowLeft />}
          bgColor="bg-primary-blue"
          paddingY="py-2"
          paddingX="px-2.5"
          style="text-sm md:text-base lg:text-lg"
          onClick={reset}
        >
          Kembali
        </Button>
      </div>
      <div className="bg-blue-50 mt-5 rounded py-6 px-4 md:px-8 ">
        <div className="mx-auto md:mx-0 sm:w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-4 justify-items-center md:justify-items-stretch">
          <div className="md:col-span-3 md:flex md:justify-between gap-5 mb-6">
            <TextInput
              label="Nama"
              id="name"
              placeHolder="Masukan Nama"
              value={name}
              style="mb-5"
              onChange={handleChangeInput}
            />
            <TextInput
              label="Username"
              id="username"
              placeHolder="Masukan Username"
              value={username}
              style="mb-5"
              onChange={handleChangeInput}
            />
            <TextInput
              label="Email"
              id="email"
              value={email}
              placeHolder="Masukan Email"
              onChange={handleChangeInput}
            />
          </div>
          <div className="md:col-span-3 md:flex md:justify-between gap-5 mb-6">
            <DropdownInput
              options={["Admin", "User"]}
              title="Pilih Role"
              label="Pilih Role:"
              id="role"
              className="mb-5"
              value={role}
              handleChange={handleChangeInput}
            />
            <TextInput
              label="Password Baru"
              type="password"
              id="password"
              value={password}
              placeHolder="*********"
              style="mb-5"
              onChange={handleChangeInput}
            />
            <TextInput
              label="Konfirmasi Password"
              type="password"
              id="confPassword"
              value={confPassword}
              placeHolder="*********"
              onChange={handleChangeInput}
            />
          </div>
        </div>
        <div className=" flex justify-end mb-6 mt-6">
          <Button
            bgColor="bg-primary-blue"
            paddingY="py-2"
            paddingX="px-4"
            style="w-20"
            textColor="text-netral-white"
            onClick={() => setOpenModal(true)}
          >
            Simpan
          </Button>
        </div>
        <Modal show={openModal} size="md" onClose={closeModal} popup>
          <Modal.Header />
          <Modal.Body>
            <div className="flex justify-center">
              <HiOutlineInformationCircle size="50px" />
            </div>
            <p className="text-center text-error mt-5 mb-5 font-bold font-roboto">
              {msg}
            </p>
            <p className="mt-3 text-justify font-lato">
              Apakah Anda yakin ingin membuat akun ini?
            </p>
            <div className="flex justify-end mt-5 gap-5">
              <Button
                bgColor="bg-blue-800"
                paddingY="py-1"
                paddingX="px-3"
                textColor="text-white text-lg font-medium font-lato"
                onClick={handleTambahUser}
              >
                Simpan
              </Button>
              <Button
                bgColor="bg-blue-500"
                paddingY="py-1"
                paddingX="px-4"
                textColor="text-white text-lg font-medium font-lato"
                onClick={closeModal}
              >
                Batal
              </Button>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default TambahAkun;
