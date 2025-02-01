"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  FaIdCard,
  FaPassport,
  FaGraduationCap,
  FaHandHoldingUsd,
  FaPiggyBank,
  FaIdBadge,
} from "react-icons/fa";
import Chatbot from "./components/chatbot";
import { useState } from "react";
import ServiceModal from "./components/ServiceModal";
import { serviceFaqs } from "./data/serviceFaqs";

const features = [
  {
    title: "Aadhar Card",
    description:
      "Manage your unique identification number and biometric information securely.",
    icon: <FaIdCard size={32} />,
  },
  {
    title: "PAN Card",
    description:
      "Access and manage your Permanent Account Number for tax-related services.",
    icon: <FaIdBadge size={32} />,
  },
  {
    title: "Passport",
    description:
      "Apply, renew, and track your passport applications seamlessly.",
    icon: <FaPassport size={32} />,
  },
  {
    title: "Pension Services",
    description: "Track and manage your pension benefits and disbursements.",
    icon: <FaHandHoldingUsd size={32} />,
  },
  {
    title: "Provident Fund",
    description:
      "Monitor your EPF contributions and access PF-related services.",
    icon: <FaPiggyBank size={32} />,
  },
  {
    title: "Education Services",
    description:
      "Access educational resources, certificates, and verification services.",
    icon: <FaGraduationCap size={32} />,
  },
];

const sponsors = [
  { id: 1, src: "/ETHIndia.png", alt: "Sponsor 1" },
  { id: 2, src: "/Polygon.png", alt: "Sponsor 2" },
  { id: 3, src: "/Devfolio.png", alt: "Sponsor 3" },
  { id: 4, src: "/Aptos.png", alt: "Sponsor 4" },
  { id: 5, src: "/sponsor5.png", alt: "Sponsor 5" },
];

const Home = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleServiceClick = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  return (
    <div className="z-auto min-h-screen bg-gray-900 text-white">
      <Chatbot />
      <section className="desktop hero hidden md:block">
        <div className="3dviewer hidden md:block h-screen mx-auto">
          <script
            type="module"
            src="https://unpkg.com/@splinetool/viewer@1.9.59/build/spline-viewer.js"
          ></script>
          <spline-viewer
            loading-anim-type="spinner-small-light"
            url="https://prod.spline.design/eAiiKfUMzQGpOmPc/scene.splinecode"
          ></spline-viewer>
        </div>
        <div className="hidden md:flex absolute top-64 left-24 flex-col">
          <div className="w-[35vw] title text-8xl font-bold">
            Welcome to the web.
          </div>
          <div className="description pt-4 text-3xl opacity-80">
            this is our description and what we do.
          </div>
          <div className="action_button pt-6">
            <button className="group cursor-pointer slide-anime px-5 py-3 rounded-full w-[180px] bg-white text-[#403cd5] flex justify-between items-center font-semibold">
              Schedule Call{" "}
              <div className="group-hover:translate-x-2 transition-all">
                <ArrowRight />
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* Mobile view */}
      <section className="mobile hero md:hidden bg-cover bg-center h-screen" style={{ backgroundImage: "url('/main.png')" }}>
        <div className="flex flex-col absolute top-28 items-center text-left p-4">
          <div className="title text-4xl font-extrabold pl-8">
            Welcome to the web.
          </div>
          <div className="description pt-2 px-12 text-md opacity-80">
            this is our description and what we do.
          </div>
          <div className="action_button pt-80">
            <button className="group cursor-pointer slide-anime px-5 py-3 rounded-full w-[180px] bg-white text-[#403cd5] flex justify-between items-center font-semibold">
              Schedule Call{" "}
              <div className="group-hover:translate-x-2 transition-all">
                <ArrowRight />
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-[#f8f9fa]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-gray-300 p-6 rounded-lg shadow-md text-gray-900 flex flex-col items-center transition-colors duration-300 hover:bg-[#403cd5] hover:text-white cursor-pointer"
                whileHover={{ scale: 1.05 }}
                onClick={() => handleServiceClick(feature)}
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-center">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      <ServiceModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        service={selectedService}
        faqs={selectedService && serviceFaqs[selectedService.title] ? serviceFaqs[selectedService.title] : []}
      />

      {/* Sponsors */}
      <section className="py-16 bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">
            Our Sponsors
          </h2>
          <div className="relative w-full overflow-hidden">
            <div className="flex justify-center animate-marquee space-x-8">
              {sponsors.map((sponsor, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 p-4 bg-white rounded-lg shadow-md"
                >
                  <Image
                    src={sponsor.src}
                    alt={sponsor.alt}
                    height={0}
                    width={0}
                    sizes="100vw"
                    style={{ width: "auto", height: "7vh" }}
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            className="text-3xl font-bold mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Ready to get started?
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <Link
              href="/signup"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Sign Up Now
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
