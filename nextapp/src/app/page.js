"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  FaRocket,
  FaShieldAlt,
  FaUsers,
  FaChartLine,
  FaCogs,
  FaMobileAlt,
} from "react-icons/fa";

const features = [
  {
    title: "Fast Performance",
    description:
      "Experience lightning-fast load times and smooth interactions.",
    icon: <FaRocket size={32} />,
  },
  {
    title: "Secure",
    description:
      "Top-notch security features to protect your data and privacy.",
    icon: <FaShieldAlt size={32} />,
  },
  {
    title: "User Friendly",
    description:
      "Intuitive and easy-to-use interface for a seamless experience.",
    icon: <FaUsers size={32} />,
  },
  {
    title: "Analytics",
    description: "Gain insights with powerful analytics and reporting tools.",
    icon: <FaChartLine size={32} />,
  },
  {
    title: "Customizable",
    description:
      "Highly customizable to fit your specific needs and preferences.",
    icon: <FaCogs size={32} />,
  },
  {
    title: "Mobile Ready",
    description:
      "Optimized for mobile devices to ensure a great experience on the go.",
    icon: <FaMobileAlt size={32} />,
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
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <script
        type="module"
        src="https://unpkg.com/@splinetool/viewer@1.9.59/build/spline-viewer.js"
      ></script>
      <section className="hero">
        <div className="3dviewer hidden md:block h-screen mx-auto">
          <spline-viewer url="https://prod.spline.design/wXGJuw02W7TK6thw/scene.splinecode"></spline-viewer>
        </div>
        <div className="hidden md:flex absolute top-64 left-24 flex-col">
          <div className="w-[35vw] title text-8xl font-bold">
            Welcome to the web.
          </div>
          <div className="description pt-4 text-3xl opacity-80">
            this is our description and what we do.
          </div>
          <div className="action_button pt-6">
            <button className="group cursor-pointer slide-anime px-5 py-3 rounded-full w-[180px] dark:bg-white bg-base-dark text-white dark:text-black flex justify-between items-center font-semibold ">
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
                className="bg-gray-300 p-6 rounded-lg shadow-md text-gray-900 flex flex-col items-center transition-colors duration-300 hover:bg-[#403cd5] hover:text-white"
                whileHover={{ scale: 1.05 }}
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-center">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsors */}
      <section>
        <div className="relative w-full overflow-hidden">
          {/* Left Gradient Fade */}
          <div className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-white dark:from-background"></div>

          {/* Marquee Content */}
          <div className="flex animate-marquee">
            {sponsors.map((sponsor, index) => (
              <div key={index} className="flex-shrink-0 mx-8">
                <Image
                  src={sponsor.src}
                  alt={sponsor.alt}
                  height={0}
                  width={0} 
                  sizes="100vw"
                  style={{width: 'auto', height: '7vh'}}
                  className="object-contain"
                />
              </div>
            ))}
          </div>

          {/* Right Gradient Fade */}
          <div className="absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-white dark:from-background"></div>
        </div>
      </section>

      {/* Call to Action Section */}
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
