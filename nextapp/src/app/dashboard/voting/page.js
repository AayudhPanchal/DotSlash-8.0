"use client";
import { useState } from "react";

const votingPolicies = [
  { id: 1, title: "Renewable Energy Initiative", description: "Should the government increase subsidies for renewable energy projects?" },
  { id: 2, title: "Universal Healthcare", description: "Do you support the introduction of universal healthcare coverage?" },
  { id: 3, title: "AI Regulation Policy", description: "Should AI-driven decisions in hiring be strictly regulated?" },
];

export default function VotingPage() {
  const [votes, setVotes] = useState({});
  const [voteCounts, setVoteCounts] = useState(
    votingPolicies.reduce((acc, policy) => ({ ...acc, [policy.id]: { yes: 0, no: 0 } }), {})
  );

  const handleVote = (policyId, vote) => {
    if (votes[policyId]) return; // Prevent multiple votes

    setVotes({ ...votes, [policyId]: vote });

    setVoteCounts((prev) => ({
      ...prev,
      [policyId]: {
        ...prev[policyId],
        [vote]: prev[policyId][vote] + 1,
      },
    }));
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6 border border-[#403cd5]/10">
      <h2 className="text-3xl font-bold text-[#403cd5] mb-6">Vote on Policies</h2>

      <div className="space-y-4">
        {votingPolicies.map((policy) => (
          <div key={policy.id} className="p-4 border border-[#403cd5]/10 rounded-lg bg-[#403cd5]/5 hover:bg-[#403cd5]/10 transition">
            <h3 className="text-xl font-bold text-[#403cd5]">{policy.title}</h3>
            <p className="text-gray-600 mt-2">{policy.description}</p>

            <div className="mt-4 flex gap-4">
              <button
                onClick={() => handleVote(policy.id, "yes")}
                className={`px-6 py-2 rounded-lg text-white transition ${
                  votes[policy.id] 
                    ? "bg-gray-400 cursor-not-allowed" 
                    : "bg-[#403cd5] hover:bg-[#403cd5]/90"
                }`}
                disabled={votes[policy.id]}
              >
                Yes ({voteCounts[policy.id].yes})
              </button>
              <button
                onClick={() => handleVote(policy.id, "no")}
                className={`px-6 py-2 rounded-lg text-white transition ${
                  votes[policy.id] 
                    ? "bg-gray-400 cursor-not-allowed" 
                    : "bg-red-500 hover:bg-red-600"
                }`}
                disabled={votes[policy.id]}
              >
                No ({voteCounts[policy.id].no})
              </button>
            </div>

            {votes[policy.id] && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">You voted "{votes[policy.id]}"</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
