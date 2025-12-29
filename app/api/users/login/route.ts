import { connect } from "@/lib/dbConfig";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  try {
    // 1. Connect to database
    await connect();

    // 2. Get data from request
    const reqBody = await request.json();
    const { email, password } = reqBody;

    console.log("Login attempt:", email);

    // 3. Check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );
    }

    // 4. Check if password is correct
    const validPassword = await bcryptjs.compare(password, user.password);

    if (!validPassword) {
      return NextResponse.json(
        { error: "Invalid password" },
        { status: 400 }
      );
    }

    // 5. Create token data
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    // 6. Create token (expires in 1 day)
    const token = jwt.sign(
      tokenData,
      process.env.TOKEN_SECRET!,
      { expiresIn: "1d" }
    );

    // 7. Send response with cookie
    const response = NextResponse.json({
      message: "Login successful",
      success: true,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;

  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}