"use client";
import { useState } from "react";

const policies = [
  {
    id: 1,
    title: "Environmental Protection Policy",
    description: "This policy aims to reduce carbon emissions and promote green energy solutions.",
    details: "Implemented in 2023, this policy focuses on sustainability, carbon footprint reduction, and green energy subsidies.",
  },
  {
    id: 2,
    title: "Workplace Safety Policy",
    description: "Ensures safe and healthy working conditions for employees in all industries.",
    details: "Includes OSHA regulations, mandatory safety training, and periodic inspections.",
  },
  {
    id: 3,
    title: "Data Privacy Protection Act",
    description: "Regulates how companies collect, store, and use personal data.",
    details: "Inspired by GDPR, it mandates user consent, transparency, and strict data security measures.",
  },
];

export default function PolicyPage() {
  const [expandedPolicy, setExpandedPolicy] = useState(null);

  const togglePolicyDetails = (id) => {
    setExpandedPolicy(expandedPolicy === id ? null : id);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-3xl font-bold text-[#403cd5] mb-6">Policies</h2>

      <div className="space-y-4">
        {policies.map((policy) => (
          <div
            key={policy.id}
            className="p-6 rounded-lg bg-gradient-to-r from-[#403cd5]/10 to-white border border-[#403cd5]/20 hover:from-[#403cd5]/20 transition-all duration-300"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-[#403cd5]">{policy.title}</h3>
              <button
                onClick={() => togglePolicyDetails(policy.id)}
                className="px-4 py-2 rounded-lg text-[#403cd5] hover:bg-[#403cd5]/10 transition-all duration-300"
              >
                {expandedPolicy === policy.id ? "Hide Details" : "View Details"}
              </button>
            </div>
            <p className="text-gray-600 mt-2">{policy.description}</p>

            {expandedPolicy === policy.id && (
              <div className="mt-4 p-4 bg-white rounded-lg border border-[#403cd5]/10">
                <p className="text-gray-600">{policy.details}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
