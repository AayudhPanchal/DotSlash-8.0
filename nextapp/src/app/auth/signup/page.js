"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileno: "",
    password: "",
    captchaToken: "", // Store CAPTCHA token
    captchaInput: "", // Store user input for CAPTCHA
  });
  const [captchaImage, setCaptchaImage] = useState(""); // Store CAPTCHA image
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // Track loading state
  const [otp, setOtp] = useState(""); // Store OTP input
  const [isOtpSent, setIsOtpSent] = useState(false); // Track if OTP is sent
  const [otpError, setOtpError] = useState(""); // Track OTP errors

  const router = useRouter();

  // Fetch CAPTCHA image and token when the component mounts
  useEffect(() => {
    const fetchCaptcha = async () => {
      try {
        const response = await axios.get("/api/auth/captcha");
        const { captchaImage, captchaToken } = response.data;
        setCaptchaImage(`data:image/png;base64,${captchaImage}`);
        setFormData((prevData) => ({
          ...prevData,
          captchaToken,
        }));
      } catch (error) {
        console.error("Error fetching CAPTCHA:", error);
      }
    };

    fetchCaptcha();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Add your signup logic here
      await axios.post("/api/auth/signup", formData);
      // On success, redirect to another page
      router.push("/welcome");
    } catch (error) {
      console.error("Signup failed:", error);
      toast.error("Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold text-white mb-6">Sign Up</h2>
        <div className="mb-4">
          <label className="block text-gray-400 mb-2" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-400 mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-400 mb-2" htmlFor="mobileno">
            Mobile Number
          </label>
          <input
            type="text"
            id="mobileno"
            name="mobileno"
            value={formData.mobileno}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-400 mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-400 mb-2" htmlFor="captchaInput">
            CAPTCHA
          </label>
          <div className="flex items-center">
            <input
              type="text"
              id="captchaInput"
              name="captchaInput"
              value={formData.captchaInput}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <img
              src={captchaImage}
              alt="CAPTCHA"
              className="ml-4 h-12 w-32 object-cover"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={loading}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}

export default SignupPage;