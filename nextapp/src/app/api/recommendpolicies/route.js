import { NextResponse } from "next/server";
import dbConnect from "@/utils/db";
import RecommendedPolicy from "@/models/recommendpolicies";
import { policies } from "@/app/data/policies";

export async function GET() {
  try {
    await dbConnect();
    
    // Check if we need to initialize policies
    const count = await RecommendedPolicy.countDocuments();
    
    if (count === 0 && Array.isArray(policies)) {
      // Initialize with sample policies
      const initialPolicies = policies.map(policy => ({
        title: policy.title,
        description: policy.description,
        details: policy.details,
        category: policy.category || 'life',
        priority: Math.floor(Math.random() * 5) + 1
      }));

      await RecommendedPolicy.insertMany(initialPolicies);
    }

    // Fetch all policies
    const allPolicies = await RecommendedPolicy.find({}).lean();
    
    return NextResponse.json({ 
      success: true,
      policies: allPolicies 
    });

  } catch (error) {
    console.error("Error in recommend policies:", error);
    return NextResponse.json({ 
      success: false,
      error: "Failed to fetch policies" 
    }, { status: 500 });
  }
}
