import React, { useContext } from "react";
import TextInput from "../../../../Components/TextInput";
import DropdownInput from "../../../../Components/DropdownInput";
import Button from "../../../../Components/Button";
import { GetContext } from "../../../../Context/GetContext";
import { useEffect } from "react";
import { UpdateContext } from "../../../../Context/UpdateContext";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Title from "../../../../Components/Title";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const EditAkunP = ({ idUser }) => {
  const { handleGet, stateGet } = useContext(GetContext);
  const { handleUpdate, stateUpdate } = useContext(UpdateContext);
  const { updateUser } = handleUpdate;
  const { getDataUserById, resetFormData } = handleGet;
  const { akun, setAkun, inputNewPassword, setInputNewPassword } = stateGet;
  const { name, username, email, role, id } = akun.user;
  const { newPassword, confNewPassword } = inputNewPassword;
  const navigate = useNavigate();

  useEffect(() => {
    getDataUserById(idUser);
  }, []);

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
      </div>
      <div className="bg-blue-50 mt-5 rounded py-6 px-4 md:px-8 ">
      <div className="mx-auto lg:mx-0 md:w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-4 justify-items-center md:justify-items-stretch">
      <div className="lg:col-span-3 lg:flex lg:justify-between lg:gap-0 mb-6">
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
          </div>
          <div className="lg:col-span-3 lg:flex lg:justify-between lg:gap-0 mb-6">
            <DropdownInput
              options={["Admin", "User"]}
              title="Pilih Role"
              label="Pilih Role:"
              id="role"
              value={role}
              handleChange={handleChangeInput}
            />
            <TextInput
              label="Password Baru"
              type="password"
              id="newPassword"
              value={newPassword}
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
          <div className="lg:col-span-3 lg:flex lg:justify-center lg:gap-4 mb-6 mt-6">
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
            <Link to="/admin/akun">
                <Button
                navigate={`/admin/akun/`}
                bgColor="bg-blue-200"
                paddingY="py-2"
                paddingX="px-4"
                style="w-20"
                textColor="text-blue-800"
                >
                Batal
                </Button>
            </Link>
            </div>
        </div>
    </div>
    </>
  );
};

export default EditAkunP;
