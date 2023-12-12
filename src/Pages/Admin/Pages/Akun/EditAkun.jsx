import React, { useContext } from "react";
import { Modal } from "flowbite-react";
import TextInput from "../../../../Components/TextInput";
import DropdownInput from "../../../../Components/DropdownInput";
import Button from "../../../../Components/Button";
import { PostContext } from "../../../../Context/PostContext";
import { GetContext } from "../../../../Context/GetContext";
import { useEffect } from "react";

const EditAkun = ({ close, idUser }) => {
  const { handlePost, statePost } = useContext(PostContext);
  const { handleGet, stateGet } = useContext(GetContext);
  const { getDataUserById } = handleGet;
  const { user, setUser } = stateGet;
  const { name, username, newPassword, confPassword, email, role } = user;
  const { inputUser, setInputUser, msg } = statePost;
  const { tambahUser } = handlePost;

  useEffect(() => {
    getDataUserById(idUser);
  }, []);

  const handleTambahUser = async (e) => {
    e.preventDefault();
    try {
      const response = await tambahUser();
      console.log(response);
      if (response.status === 201) {
        close();
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeInput = (e) => {
    const { id, value } = e.target;
    setInputUser((prevInputUser) => ({
      ...prevInputUser,
      [id]: value,
    }));
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
            id="password"
            value={password}
            onChange={handleChangeInput}
          />
          <TextInput
            label="Konfirmasi Password"
            type="password"
            id="confPassword"
            value={confPassword}
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
            onClick={handleTambahUser}
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
