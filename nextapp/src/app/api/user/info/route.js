import dbConnect from "@/utils/db";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        await dbConnect(); // Add await here
        const userId = req?.headers?.get('user-data');
        
        if (!userId) {
            return NextResponse.json({
                success: false,
                message: 'No user ID provided'
            });
        }

        const userData = await User.findById(userId).select('-password');
        
        if (!userData) {
            return NextResponse.json({
                success: false,
                message: 'User Not Found'
            });
        }

        return NextResponse.json({
            success: true,
            data: userData.toObject() // Convert to plain object
        });

    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json({ 
            success: false, 
            message: error.message 
        });
    }
}
