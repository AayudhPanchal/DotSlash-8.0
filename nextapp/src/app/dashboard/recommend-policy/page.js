"use client";
import { useState, useEffect } from "react";
import axios from "axios";

export default function PolicyPage() {
  const [policies, setPolicies] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const [expandedPolicy, setExpandedPolicy] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserProfile = async () => {
    try {
      const userId = sessionStorage.getItem("user-auth-token");
      console.log("UserId from session:", userId); // Debug log

      if (!userId) {
        console.log("No auth token found");
        return;
      }

      const response = await fetch(`/api/user/info`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "user-data": userId,
        },
      });

      console.log("Response status:", response.status); // Debug log
      
      const data = await response.json();
      console.log("Response data:", data); // Debug log

      if (data.success && data.data) {
        setUserProfile(data.data);
      } else {
        console.error("Error fetching profile:", data.message);
        setUserProfile(null);
      }
    } catch (error) {
      console.error("Error in fetchUserProfile:", error);
      setUserProfile(null);
    }
  };

  const fetchPolicies = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/recommendpolicies");
      
      if (response.data.success && Array.isArray(response.data.policies)) {
        setPolicies(response.data.policies);
      } else {
        console.error("Invalid response:", response.data);
      }
    } catch (error) {
      console.error("Error fetching policies:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await fetchUserProfile();
      await fetchPolicies();
      setLoading(false);
    };

    loadData();
  }, []);

  const togglePolicyDetails = (id) => {
    setExpandedPolicy(expandedPolicy === id ? null : id);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      {/* User Profile Section */}
      {userProfile && (
        <div className="mb-8 p-4 md:p-6 bg-white rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-[#403cd5] mb-4">Your Profile</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600"><span className="font-semibold">Name:</span> {userProfile.name}</p>
              <p className="text-gray-600"><span className="font-semibold">Age:</span> {userProfile.age}</p>
              <p className="text-gray-600"><span className="font-semibold">Gender:</span> {userProfile.gender}</p>
              <p className="text-gray-600">
                <span className="font-semibold">Marital Status:</span> {userProfile.maritalStatus}
              </p>
            </div>
            <div>
              <p className="text-gray-600">
                <span className="font-semibold">Occupation:</span> {userProfile.occupation}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Government Employee:</span> {userProfile.isGovernmentEmployee ? "Yes" : "No"}
              </p>
              {userProfile.children && userProfile.children.length > 0 && (
                <p className="text-gray-600">
                  <span className="font-semibold">Children:</span> {userProfile.children.length}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Recommended Policies Section */}
      <div className="bg-white shadow-lg rounded-lg p-4 md:p-6">
        <h2 className="text-3xl font-bold text-[#403cd5] mb-6">Recommended Policies</h2>
        <div className="space-y-4">
          {policies.map((policy) => (
            <div
              key={policy._id}
              className="p-4 md:p-6 rounded-lg bg-gradient-to-r from-[#403cd5]/10 to-white border border-[#403cd5]/20 hover:from-[#403cd5]/20 transition-all duration-300"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-[#403cd5]">{policy.title}</h3>
                <button
                  onClick={() => togglePolicyDetails(policy._id)}
                  className="px-4 py-2 rounded-lg text-[#403cd5] hover:bg-[#403cd5]/10 transition-all duration-300"
                >
                  {expandedPolicy === policy._id ? "Hide Details" : "View Details"}
                </button>
              </div>
              
              <p className="text-gray-600 mt-2">{policy.description}</p>
              <div className="text-sm text-gray-500 mt-1">Category: {policy.category}</div>

              {expandedPolicy === policy._id && (
                <div className="mt-4 p-4 bg-white rounded-lg border border-[#403cd5]/10">
                  <p className="text-gray-600">{policy.details}</p>
                  {userProfile && (
                    <div className="mt-2 text-sm text-[#403cd5]">
                      This policy matches your profile based on your {policy.category} needs.
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
