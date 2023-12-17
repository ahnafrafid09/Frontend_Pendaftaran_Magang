import React, { useContext } from "react";
import { Modal } from "flowbite-react";
import TextInput from "../../../../Components/TextInput";
import DropdownInput from "../../../../Components/DropdownInput";
import Button from "../../../../Components/Button";
import { PostContext } from "../../../../Context/PostContext";

const TambahAkun = ({ close }) => {
  const { handlePost, statePost } = useContext(PostContext);
  const { inputUser, setInputUser, msg } = statePost;
  const { role, name, username, email, password, confPassword } = inputUser;
  const { tambahUser } = handlePost;

  const handleTambahUser = async (e) => {
    try {
      const response = await tambahUser(e);
      if (response.status === 201) {
        close();
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

  return (
    <>
      <Modal show={true} size="sm" onClose={close} popup>
        <Modal.Header className="bg-primary-blue px-10 font-roboto text-white ">
          Tambah Akun
        </Modal.Header>
        <Modal.Body className="flex flex-col items-center justify-center">
          <h1 className="text-center text-xl font-semibold font-roboto text-netral-black">
            Tambah Akun
          </h1>
          <p className=" text-center font-semibold text-error font-lato">
            {msg}
          </p>
          <div className="flex items-center justify-center gap-5 flex-col pt-3">
            <TextInput
              label="Nama Lengkap"
              id="name"
              value={name}
              placeHolder="Nama Lengkap"
              onChange={handleChangeInput}
            />
            <TextInput
              label="Username"
              id="username"
              value={username}
              placeHolder="Username"
              onChange={handleChangeInput}
            />
            <TextInput
              label="Email"
              id="email"
              type="email"
              value={email}
              placeHolder="Alamat Email"
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
              label="Password"
              type="password"
              id="password"
              value={password}
              placeHolder="*********"
              onChange={handleChangeInput}
            />
            <TextInput
              label="Konfirmasi Password"
              type="password"
              id="confPassword"
              value={confPassword}
              placeHolder="**********"
              onChange={handleChangeInput}
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

export default TambahAkun;
