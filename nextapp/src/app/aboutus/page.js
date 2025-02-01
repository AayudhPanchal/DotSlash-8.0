"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { FaHeart, FaLightbulb, FaHandsHelping, FaEnvelope } from "react-icons/fa";

const teamMembers = [
  {
    name: "John Doe",
    role: "CEO",
    image: "/images/john.jpg", // Replace with actual image path
  },
  {
    name: "Jane Smith",
    role: "CTO",
    image: "/images/jane.jpg", // Replace with actual image path
  },
  {
    name: "Sam Wilson",
    role: "COO",
    image: "/images/sam.jpg", // Replace with actual image path
  },
];

const values = [
  {
    title: "Passion",
    description: "We are passionate about what we do and strive for excellence.",
    icon: <FaHeart size={32} />,
  },
  {
    title: "Innovation",
    description: "We embrace innovation and constantly seek new ways to improve.",
    icon: <FaLightbulb size={32} />,
  },
  {
    title: "Collaboration",
    description: "We believe in the power of collaboration and teamwork.",
    icon: <FaHandsHelping size={32} />,
  },
];

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Our Mission Section */}
      <section className="py-16 bg-[#2627bf]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-lg max-w-2xl mx-auto">
            Our mission is to protect nature and wildlife through innovation, transparency, and community-driven solutions.
          </p>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-16 bg-[#f8f9fa]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-gray-300 p-6 rounded-lg shadow-md text-gray-900 flex flex-col items-center">
                <Image src={member.image} alt={member.name} width={150} height={150} className="rounded-full mb-4" />
                <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                <p className="text-center">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16 bg-[#2627bf]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="bg-gray-300 p-6 rounded-lg shadow-md text-gray-900 flex flex-col items-center transition-colors duration-300 hover:bg-[#403cd5] hover:text-white"
                whileHover={{ scale: 1.05 }}
              >
                <div className="mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                <p className="text-center">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            className="text-3xl font-bold mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Contact Us
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <Link
              href="mailto:info@holytrinity.com"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
            >
              <FaEnvelope className="mr-2" />
              Send an Email
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;