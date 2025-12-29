import { connect } from "@/lib/dbConfig";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
 
export async function POST(request: NextRequest) {
  try {
    // 1. Connect to database
    await connect();

    // 2. Get data from request
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    console.log(reqBody);

    // 3. Check if user already exists
    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    // 4. Hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // 5. Create new user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,  // ← Save hashed password
    });

 const savedUser = await newUser.save()
 console.log("New User Created:", savedUser);

    // 6. Return success response
    return NextResponse.json(
      { 
        message: "User created successfully",
        user: {
          id: newUser._id,
          username: newUser.username, 
          email: newUser.email,
        }
      },
      { status: 201 }
    );

  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}