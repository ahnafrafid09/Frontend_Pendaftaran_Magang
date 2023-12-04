import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from "../../assets/Logo Diskominfo Jabar.png";
import Shape from "../../assets/Shape.png";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const Auth = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/login", {
        username: username,
        password: password,
      });
      navigate("/admin");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };
  return (
    <>
      <div className="w-screen h-screen bg-gradient-to-b from-[#FFF] from--9.28% to-[#90CAF9] to-168.46%">
        <div className="flex lg:justify-between w-screen h-screen flex-wrap md:flex-nowrap md:flex-col lg:flex-row">
          <div className="container max-w-sm p-4 lg:pt-16 lg:pl-36 ">
            {/* md:pt-16 md:pl-36 */}
            <img className="w-2/4 lg:w-full lg:h-auto" src={Logo} alt="" />
          </div>
          <div className="self-center p-6 mx-auto justify-self-center">
            <h1 className="font-roboto text-center text-3xl md:text-left md:text-4xl text-transparent font-semibold bg-clip-text bg-gradient-to-b from-[#1E88E5] from-0% via-[#1A98A0] via-50.52% to-[#16A75C] to-100%">
              Welcome Admin
            </h1>
            <p className="font-lato text-center text-lg md:text-left md:text-xl font-normal">
              Masukan Informasi Login Anda Untuk Mengkases
            </p>
            <form onSubmit={Auth}>
              <div className="mt-5 w-full">
                <p className="font-bold text-center text-xl text-error ">
                  {msg}
                </p>
                <input
                  type="text"
                  placeholder="Masukan Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="mt-5 border-b-2 border-x-0 border-t-0 bg-transparent border-gray py-2 w-full"
                />
                <input
                  type="password"
                  placeholder="Masukan Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-7 border-b-2 border-x-0 border-t-0 bg-transparent border-gray py-2 w-full"
                />
              </div>
              <button className="w-full p-3 text-white rounded mt-16 bg-blue-900 hover:bg-blue-600">
                Login
              </button>
            </form>
          </div>
          <div
            className="hidden lg:block lg:w-2/5 lg:h-screen lg:bg-cover lg:bg-no-repeat lg:bg-left "
            style={{ backgroundImage: `url(${Shape})` }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default Login;
