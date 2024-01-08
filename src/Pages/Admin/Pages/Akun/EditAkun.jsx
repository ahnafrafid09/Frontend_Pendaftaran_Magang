import React, { useContext } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import TextInput from "../../../../Components/TextInput";
import DropdownInput from "../../../../Components/DropdownInput";
import Button from "../../../../Components/Button";
import { GetContext } from "../../../../Context/GetContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
    try {
      const response = await updateUser(e, userId);
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
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Title>Edit Akun</Title>
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
        <p className="text-center text-error font-semibold">{msg}</p>
        <div className="mx-auto md:mx-0 sm:w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-4 justify-items-center md:justify-items-stretch">
          <div className="md:col-span-3 md:flex md:justify-between gap-5 mb-6">
            <TextInput
              label="Nama"
              id="name"
              value={name}
              style="mb-5"
              onChange={handleChangeInput}
            />
            <TextInput
              label="Username"
              id="username"
              value={username}
              style="mb-5"
              onChange={handleChangeInput}
            />
            <TextInput
              label="Email"
              id="email"
              value={email}
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
              value={role.charAt(0).toUpperCase() + role.slice(1)}
              handleChange={handleChangeInput}
            />
            <TextInput
              label="Password Baru"
              type="password"
              id="newPassword"
              value={newPassword}
              style="mb-5"
              onChange={handleChangeInput}
            />
            <TextInput
              label="Konfirmasi Password"
              type="password"
              id="confNewPassword"
              value={confNewPassword}
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
            onClick={handleUpdateUser}
          >
            Simpan
          </Button>
        </div>
      </div>
    </>
  );
};

export default EditAkun;
