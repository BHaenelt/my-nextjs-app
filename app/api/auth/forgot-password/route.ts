import { NextRequest, NextResponse } from 'next/server'; //tells you what 
//kind of request and response you are dealing with. Gives 
//cookies from the request and allows you to create a response
import { connect } from '@/lib/dbConfig';
//{connect} is a function that connects to the database
import User from '@/models/User';
import crypto from 'crypto';
// Node.js built-in module for cryptographic operations
//use it to create secure password hashes
//  (so you don't store plain passwords) and generate random 
// strings for things like verification tokens or session IDs
import { sendPasswordResetEmail } from '@/lib/mailer';
//It takes the user's email and a reset token, then uses an email 
//  (like Resend or Nodemailer) to send them a link to reset their password.
connect(); // Establishes a connection to the database by calling
//the connect function from dbConfig.ts file

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Find user
    const user = await User.findOne({ email });
    
    // Always return success message (security: don't reveal if email exists)
    if (!user) {
      return NextResponse.json(
        { message: "If that email exists, a reset link has been sent" },
        { status: 200 }
      );
    }

    // Generate secure token
    const resetToken = crypto.randomBytes(32).toString('hex');
    
    // Hash token before saving to database
    const hashedToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    // Save hashed token and expiry to database
    user.forgotPasswordToken = hashedToken;
    user.forgotPasswordTokenExpiry = new Date(Date.now() + 3600000); // 1 hour
    await user.save();

    // Send email with unhashed token
    await sendPasswordResetEmail(email, resetToken);

    return NextResponse.json(
      { message: "If that email exists, a reset link has been sent" },
      { status: 200 }
    );

  } catch (error: any) {
    console.error('Forgot password error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}