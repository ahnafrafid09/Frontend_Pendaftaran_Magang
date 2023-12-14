import React, { useContext } from "react";
import { Modal } from "flowbite-react";
import TextInput from "../../../../Components/TextInput";
import DropdownInput from "../../../../Components/DropdownInput";
import Button from "../../../../Components/Button";
import { PostContext } from "../../../../Context/PostContext";
import { GetContext } from "../../../../Context/GetContext";
import { useEffect } from "react";
import { UpdateContext } from "../../../../Context/UpdateContext";

const EditAkun = ({ close, idUser }) => {
  const { handleGet, stateGet } = useContext(GetContext);
  const { handleUpdate, stateUpdate } = useContext(UpdateContext);
  const { updateUser } = handleUpdate;
  const { msg } = stateUpdate;
  const { getDataUserById, resetFormData } = handleGet;
  const { akun, setAkun, inputNewPassword, setInputNewPassword } = stateGet;
  const { name, username, email, role, id } = akun.user;
  const { newPassword, confNewPassword } = inputNewPassword;

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
      <Modal show={true} size="sm" onClose={close} popup>
        <Modal.Header className="bg-primary-blue px-10 font-roboto">
          <h3 className="text-white mt-1">Tambah Akun</h3>
        </Modal.Header>
        <Modal.Body className="flex flex-col items-center justify-center">
          <p className=" text-center font-semibold text-error font-lato">
            {msg}
          </p>
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
            value={role}
            handleChange={handleChangeInput}
          />
          <TextInput
            label="New Password"
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
        </Modal.Body>
        <Modal.Footer className="flex items-center justify-center w-full gap-10">
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
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditAkun;
