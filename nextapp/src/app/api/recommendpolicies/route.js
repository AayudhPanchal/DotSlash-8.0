import { NextResponse } from "next/server";
import dbConnect from "@/utils/db";
import RecommendedPolicy from "@/models/recommendpolicies";
import { policies } from "@/app/data/policies";

export async function GET(request) {
  try {
    await dbConnect();
    
    // Get user profile from query params
    const { searchParams } = new URL(request.url);
    const age = searchParams.get('age');
    const occupation = searchParams.get('occupation');
    const maritalStatus = searchParams.get('maritalStatus');

    // Initialize if empty
    const count = await RecommendedPolicy.countDocuments();
    if (count === 0 && Array.isArray(policies)) {
      const initialPolicies = policies.map(policy => ({
        title: policy.title,
        description: policy.description,
        details: policy.details,
        category: policy.category || 'life',
        priority: Math.floor(Math.random() * 5) + 1,
        ageRange: policy.ageRange || { min: 18, max: 70 },
        suitableFor: policy.suitableFor || []
      }));
      await RecommendedPolicy.insertMany(initialPolicies);
    }

    // Build query based on user profile
    let query = {};
    if (age) {
      query['ageRange.min'] = { $lte: parseInt(age) };
      query['ageRange.max'] = { $gte: parseInt(age) };
    }
    if (occupation) {
      query.suitableFor = occupation;
    }

    // Fetch and sort policies
    const allPolicies = await RecommendedPolicy.find(query)
      .sort({ priority: -1 })
      .lean();
    
    return NextResponse.json({ 
      success: true,
      policies: allPolicies,
      filters: { age, occupation, maritalStatus }
    });

  } catch (error) {
    console.error("Error in recommend policies:", error);
    return NextResponse.json({ 
      success: false,
      error: "Failed to fetch policies" 
    }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    
    // If it's a chat request
    if (body.message) {
      // Process the message to identify user needs
      const userMessage = body.message.toLowerCase();
      let query = {};
      
      // Simple keyword matching
      if (userMessage.includes('health')) {
        query.category = 'health';
      } else if (userMessage.includes('life')) {
        query.category = 'life';
      } else if (userMessage.includes('vehicle')) {
        query.category = 'vehicle';
      }

      // Fetch matching policies
      const matchedPolicies = await RecommendedPolicy.find(query).lean();

      // Generate reply based on matched policies
      const reply = matchedPolicies.length > 0
        ? `I found ${matchedPolicies.length} policies that might interest you based on your query.`
        : "I couldn't find specific policies matching your query. Here are some recommended policies:";

      return NextResponse.json({
        success: true,
        policies: matchedPolicies,
        reply
      });
    }
    
    // Existing policy creation logic
    const newPolicy = await RecommendedPolicy.create(body);
    
    return NextResponse.json({ 
      success: true,
      policy: newPolicy
    });
  } catch (error) {
    return NextResponse.json({ 
      success: false,
      error: "Failed to process request"
    }, { status: 500 });
  }
}
