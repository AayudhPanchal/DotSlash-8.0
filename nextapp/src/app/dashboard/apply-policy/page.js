"use client";
import { useState } from "react";

export default function ApplyPolicyPage() {
  const [formData, setFormData] = useState({ title: "", description: "", justification: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.justification) {
      setError("All fields are required.");
      return;
    }

    setSubmitted(true);
    setError("");
    setFormData({ title: "", description: "", justification: "" });

    // Here you would normally send the data to an API or backend
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6 border border-[#403cd5]/10">
      <h2 className="text-3xl font-bold text-[#403cd5] mb-4">Apply for a Policy</h2>
      <p className="text-gray-300 mb-6">
        Submit a proposal for a new policy or modifications to an existing one.
      </p>

      {submitted && (
        <p className="text-green-600 dark:text-green-400 mb-4">Your application has been submitted successfully!</p>
      )}

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Policy Title */}
        <div>
          <label className="block text-gray-300 mb-2">Policy Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-3 bg-[#403cd5]/5 border border-[#403cd5]/20 rounded-lg text-gray-800 focus:border-[#403cd5] focus:ring-1 focus:ring-[#403cd5]"
            placeholder="Enter policy title"
          />
        </div>

        {/* Policy Description */}
        <div>
          <label className="block text-gray-300 mb-2">Policy Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="w-full p-3 bg-[#403cd5]/5 border border-[#403cd5]/20 rounded-lg text-gray-800 focus:border-[#403cd5] focus:ring-1 focus:ring-[#403cd5]"
            placeholder="Briefly describe the policy"
          />
        </div>

        {/* Justification */}
        <div>
          <label className="block text-gray-300 mb-2">Justification</label>
          <textarea
            name="justification"
            value={formData.justification}
            onChange={handleChange}
            rows="3"
            className="w-full p-3 bg-[#403cd5]/5 border border-[#403cd5]/20 rounded-lg text-gray-800 focus:border-[#403cd5] focus:ring-1 focus:ring-[#403cd5]"
            placeholder="Explain why this policy is needed"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 px-4 bg-[#403cd5] text-white font-semibold rounded-lg hover:bg-[#403cd5]/90 transition"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
}
