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
    <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Policies</h2>

      <div className="space-y-4">
        {policies.map((policy) => (
          <div
            key={policy.id}
            className="p-4 border rounded-lg bg-gray-100 dark:bg-gray-700 hover:shadow-md transition"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{policy.title}</h3>
              <button
                onClick={() => togglePolicyDetails(policy.id)}
                className="text-blue-500 hover:underline"
              >
                {expandedPolicy === policy.id ? "Hide Details" : "View Details"}
              </button>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mt-2">{policy.description}</p>

            {expandedPolicy === policy.id && (
              <p className="text-gray-600 dark:text-gray-400 mt-3">{policy.details}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
