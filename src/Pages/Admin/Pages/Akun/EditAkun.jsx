import React, { useContext } from "react";
import { Modal } from "flowbite-react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import TextInput from "../../../../Components/TextInput";
import DropdownInput from "../../../../Components/DropdownInput";
import Button from "../../../../Components/Button";
import { PostContext } from "../../../../Context/PostContext";
import { GetContext } from "../../../../Context/GetContext";
import { useEffect } from "react";
import { UpdateContext } from "../../../../Context/UpdateContext";
import Title from "../../../../Components/Title";
import { useParams } from "react-router-dom";

const EditAkun = () => {
  const { handleGet, stateGet } = useContext(GetContext);
  const { handleUpdate, stateUpdate } = useContext(UpdateContext);
  const { updateUser } = handleUpdate;
  const { msg } = stateUpdate;
  const { getDataUserById } = handleGet;
  const { akun, setAkun, inputNewPassword, setInputNewPassword } = stateGet;
  const { name, username, email, role, id } = akun.user;
  const { newPassword, confNewPassword } = inputNewPassword;
  const { userId } = useParams();

  useEffect(() => {
    getDataUserById(userId);
  }, []);

  const reset = () => {
    setAkun({
      user: {
        id: "",
        name: "",
        email: "",
        username: "",
        role: "",
      },
    });
    setInputNewPassword({
      newPassword: "",
      confNewPassword: "",
    });
  };

  const handleChangeInput = (e) => {
    const { id, value } = e.target;
    setAkun((prevInputUser) => ({
      ...prevInputUser,
      user: {
        ...prevInputUser.user,
        [id]: value,
      },
    }));
    setInputNewPassword((prevInputNewPassword) => ({
      ...prevInputNewPassword,
      [id]: value,
    }));
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      const response = await updateUser(e, id);
      if (response.status === 200) {
        close();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Title>Edit Akun</Title>
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
      <div className="mt-10 w-full justify-items-center grid md:grid-cols-3 gap-5 sm:grid-cols-2 grid-cols-1">
        <TextInput
          label="Nama"
          id="name"
          value={name}
          onChange={handleChangeInput}
        />
        <TextInput
          label="Username"
          id="username"
          value={username}
          onChange={handleChangeInput}
        />
        <TextInput
          label="Email"
          id="email"
          value={email}
          onChange={handleChangeInput}
        />
        <DropdownInput
          options={["Admin", "User"]}
          title="Pilih Role"
          label="Pilih Role:"
          id="role"
          value={role.charAt(0).toUpperCase() + role.slice(1)}
          handleChange={handleChangeInput}
        />
        <TextInput
          label="New Password"
          type="password"
          id="newPassword"
          value={newPassword}
          onChange={handleChangeInput}
          placeHolder="*********"
        />
        <TextInput
          label="Konfirmasi Password"
          type="password"
          id="confNewPassword"
          value={confNewPassword}
          placeHolder="*********"
          onChange={handleChangeInput}
        />
      </div>
      <div className="flex gap-5 justify-end items-center mt-20">
        <Button
          bgColor="bg-primary-blue"
          paddingY="py-2"
          paddingX="px-4"
          style="w-20"
          textColor="text-netral-white"
          onClick={handleUpdateUser}
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
      </div>
    </>
  );
};

export default EditAkun;
