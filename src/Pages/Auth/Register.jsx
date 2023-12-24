import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from "../../assets/Logo Diskominfo Jabar.png";
import Shape from "../../assets/Shape.png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [register, setRegister] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    confPassword: "",
  });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setRegister({ ...register, [name]: value });
  };

  const Register = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/register",
        register
      );
      if (response.status === 201) {
        toast.success(response.data.msg, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <>
      <div className="w-screen h-screen bg-gradient-to-b from-[#FFF] from--9.28% to-[#90CAF9] to-168.46%">
        <div className="flex lg:justify-between w-screen h-screen flex-col md:flex-row">
          <div className="container max-w-sm p-4 lg:pt-16 lg:pl-36 ">
            {/* md:pt-16 md:pl-36 */}
            <img className="w-2/4 lg:w-full lg:h-auto" src={Logo} alt="" />
          </div>
          <div className="self-center max-w-lg p-6 m-auto justify-self-center">
            <h1 className="font-roboto text-center text-3xl md:text-left md:text-4xl text-transparent font-semibold bg-clip-text bg-gradient-to-b from-[#1E88E5] from-0% via-[#1A98A0] via-50.52% to-[#16A75C] to-100%">
              Hallo Selamat Datang
            </h1>
            <p className="font-lato text-center text-lg md:text-left md:text-xl font-normal">
              Silahkan Daftar Akun Anda Untuk Melanjutkan.
            </p>
            <form onSubmit={Register}>
              <div className="mt-5 w-full">
                <p className="font-bold text-center text-xl text-error ">
                  {msg}
                </p>
                <input
                  type="text"
                  placeholder="Masukan Nama Lengkap"
                  name="name"
                  value={register.name}
                  onChange={handleChange}
                  className="mt-5 border-b-2 border-x-0 border-t-0 bg-transparent border-gray py-2 w-full"
                />
                <input
                  type="email"
                  placeholder="Masukan Email"
                  name="email"
                  value={register.email}
                  onChange={handleChange}
                  className="mt-5 border-b-2 border-x-0 border-t-0 bg-transparent border-gray py-2 w-full"
                />
                <input
                  type="text"
                  placeholder="Masukan Username"
                  name="username"
                  value={register.username}
                  onChange={handleChange}
                  className="mt-5 border-b-2 border-x-0 border-t-0 bg-transparent border-gray py-2 w-full"
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Masukan Password"
                  value={register.password}
                  onChange={handleChange}
                  className="mt-7 border-b-2 border-x-0 border-t-0 bg-transparent border-gray py-2 w-full"
                />
                <input
                  type="password"
                  placeholder="Masukan Confirm Password"
                  name="confPassword"
                  value={register.confPassword}
                  onChange={handleChange}
                  className="mt-5 border-b-2 border-x-0 border-t-0 bg-transparent border-gray py-2 w-full"
                />
              </div>
              <button className="w-full p-3 text-white rounded mt-16 bg-blue-900 hover:bg-blue-600">
                Register
              </button>
            </form>
            <div className="mt-5 text-center">
              <h1 className="text-netral-black font-roboto text-lg">
                Sudah Punya Akun?{" "}
                <Link to="/login">
                  <span className="text-blue-800">Login</span>
                </Link>
              </h1>
            </div>
          </div>
          <div
            className="hidden lg:block lg:w-2/5 lg:h-screen lg:bg-cover lg:bg-no-repeat lg:bg-left "
            style={{ backgroundImage: `url(${Shape})` }}
          />
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Register;
