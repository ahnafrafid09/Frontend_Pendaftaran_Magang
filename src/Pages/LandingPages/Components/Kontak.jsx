import React, { useState, useEffect } from "react";
import { Element } from "react-scroll";
import { FaMapLocationDot } from "react-icons/fa6";
import { FiPhoneIncoming } from "react-icons/fi";
import { CiMail } from "react-icons/ci";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import emailjs from "emailjs-com";

const Kontak = () => {
  const socialMediaLinks = {
    facebook: "https://www.facebook.com/Diskominfo-Jabar-100064438461544/",
    instagram: "https://www.instagram.com/diskominfojabar",
    twitter: "https://twitter.com/diskominfojabar",
  };
  const [formData, setFormData] = useState({
    email: "",
    pertanyaan: "",
  });

  useEffect(() => {
    emailjs.init("RqH2CalED6Ecb0T56");
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const serviceId = "service_ggz8oam";
    const templateId = "template_8l81dvr";

    emailjs
      .send(serviceId, templateId, formData)
      .then((response) => {
        console.log("Email sent successfully:", response);
      })
      .catch((error) => {
        console.error("Error sending email:", error);
      });

    // Reset formulir setelah pengiriman email
    setFormData({
      email: "",
      pertanyaan: "",
    });
  };
  return (
    <Element name="kontak">
      <div className="w-full h-auto md:h-screen bg-blue-50">
        <div className="w-full px-4 md:px-0 md:container md:mx-auto h-full flex flex-col md:flex-row items-center justify-between py-8 md:py-16">
          <div className="w-full md:w-2/3 lg:w-1/2 md:mr-8">
            <h1 className="font-roboto font-semibold text-blue-900 text-4xl leading-normal ">
              Silahkan kontak kami,
              <br />
              Kami Siap Membantu!
            </h1>
            <h4 className="font-bold text-xl text-blue-900 mt-5 md:mt-14">
              Kontak
            </h4>
            <div className="flex flex-col md:flex-row items-start md:items-center md:gap-5 text-blue-900 font-lato mt-3">
              <FaMapLocationDot size="21px" />
              <p>Jl. Taman sari No. 55 Bandung, 40132</p>
            </div>
            <div className="flex flex-col md:flex-row items-start md:items-center md:gap-5 text-blue-900 font-lato mt-3">
              <FiPhoneIncoming size="21px" />
              <p> 022-2502898 fax. 022-2501151</p>
            </div>
            <div className="flex flex-col md:flex-row items-start md:items-center md:gap-5 text-blue-900 font-lato mt-3">
              <CiMail size="25px" />
              <p>diskominfo@jabarprov.go.id</p>
            </div>
            <h4 className="font-semibold text-lg text-blue-900 mt-5 md:mt-14">
              Sosial Media
            </h4>
            <div className="flex items-center gap-5 mt-2 md:mt-4 text-blue-900 font-lato">
              <a
                href={socialMediaLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook size="24px" />
              </a>
              <a
                href={socialMediaLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter size="24px" />
              </a>
              <a
                href={socialMediaLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram size="24px" />
              </a>
              <p className="font-lato">Diskominfo Jabar</p>
            </div>
          </div>
          <form
            onSubmit={handleSubmit}
            className="w-full md:w-1/2 lg:w-1/3 bg-blue-100 rounded-[5px] flex justify-center items-center flex-col md:py-10 py-4 px-6 md:px-10 mt-5 md:mt-0 gap-5"
          >
            <h1 className="text-blue-900 text-4xl font-semibold font-roboto">
              Ada Pertanyaan?
            </h1>
            <input
              type="email"
              placeholder="Masukan email anda disini"
              className="w-full rounded border-none h-16 px-5"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Pertanyaan anda"
              className="w-full rounded border-none h-16 px-5"
              name="pertanyaan"
              value={formData.pertanyaan}
              onChange={handleChange}
            />
            <button
              type="submit"
              className="w-full bg-blue-900 text-white py-5 font-lato text-xl rounded font-semibold"
            >
              Kirim
            </button>
          </form>
        </div>
      </div>
    </Element>
  );
};

export default Kontak;
