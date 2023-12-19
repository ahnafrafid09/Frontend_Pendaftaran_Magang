import React, { useState } from "react";
import { Element } from "react-scroll";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Image from "../../../assets/image1.png";

const Faq = () => {
  const faqData = [
    {
      question: "Apa tujuan program magang di Diskominfo Jabar?",
      answer:
        "Tujuan dari program magang kami adalah memberikan pengalaman praktis kepada mahasiswa, memungkinkan mereka untuk mengembangkan keterampilan yang dibutuhkan di dunia industri, serta memberikan wawasan tentang teknologi informasi dan layanan yang kami sediakan.",
    },
    {
      question: "Bagaimana proses pendaftaran magang nya?",
      answer:
        "Proses pendaftaran magang dimulai dengan mengisi formulir pendaftaran yang tersedia di halaman beranda kami. Calon magang harus melengkapi informasi yang diperlukan dan mengirimkannya untuk dipertimbangkan.",
    },
    {
      question: "Apakah program magang ini berbayar?",
      answer:
        "Tidak, program magang kami tidak berbayar. Kami berkomitmen untuk memberikan kesempatan belajar yang adil dan terjangkau bagi mahasiswa yang berminat untuk bergabung.",
    },
    {
      question: "Bagaimana seleksi calon peserta magang dilakukan?",
      answer:
        "Seleksi calon magang dilakukan melalui evaluasi formulir pendaftaran, wawancara, dan penilaian keterampilan. Kami mencari mahasiswa yang memiliki motivasi tinggi, semangat untuk belajar, dan potensi untuk berkontribusi.",
    },
    {
      question: "Apa yang berbeda dengan program magang lain?",
      answer:
        "Program magang kami menawarkan kombinasi pengajaran praktis dan bimbingan mentor yang intensif. Kami juga memberikan akses kepada mahasiswa untuk terlibat dalam proyek-proyek nyata yang relevan dengan industri.",
    },
    {
      question: "Bagaimana peran mentor dalam program magang?",
      answer:
        "Mentor dalam program magang kami bertanggung jawab untuk membimbing dan memberikan arahan kepada mahasiswa. Mereka berbagi pengetahuan dan pengalaman mereka, membantu mahasiswa mengatasi tantangan, dan memberikan pandangan tentang dunia profesional.",
    },
  ];

  const [openIndex, setOpenIndex] = useState([]);

  const toggleAnswer = (index) => {
    setOpenIndex((prevIndexes) => {
      if (prevIndexes.includes(index)) {
        return prevIndexes.filter((prevIndex) => prevIndex !== index);
      } else {
        return [...prevIndexes, index];
      }
    });
  };

  return (
    <Element name="faq">
      <div className="w-full h-auto md:h-screen bg-gradient-to-br from-blue-800 to-blue-300">
        <div className="w-full md:container md:mx-auto h-full flex items-center justify-center flex-col py-8 md:py-16 px-4">
          <h1 className="text-center text-white text-4xl md:text-5xl font-semibold font-roboto leading-relaxed mb-2 md:mb-5">
            FAQ
          </h1>
          <p className="text-center text-white text-base md:text-lg font-normal font-lato mb-5">
            Kami Menyediakan Untuk Pertanyaan Yang Sering Ditanyakan
          </p>
          <div className="grid grid-cols-1 gap-10 w-full justify-items-center">
            {faqData.map((faq, index) => (
              <div
                key={index}
                className="bg-white w-full md:w-1/2 p-4 rounded shadow text-blue-900"
              >
                <div className="flex items-center justify-between">
                  <h3
                    className="text-lg font-semibold mb-2 cursor-pointer font-roboto"
                    onClick={() => toggleAnswer(index)}
                  >
                    {faq.question}
                  </h3>
                  <button onClick={() => toggleAnswer(index)}>
                    {openIndex.includes(index) ? (
                      <IoIosArrowUp size="24px" />
                    ) : (
                      <IoIosArrowDown size="24px" />
                    )}
                  </button>
                </div>
                {openIndex.includes(index) && (
                  <p className="mt-2  font-lato">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Element>
  );
};

export default Faq;
