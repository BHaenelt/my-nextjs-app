import mongoose from 'mongoose';

export async function connect() {
  try {
    console.log("=== ATTEMPTING DB CONNECTION ===");
    console.log("MONGO_URI exists:", !!process.env.MONGO_URI);
    console.log("MONGO_URI value:", process.env.MONGO_URI); // Show the actual URI (for debugging)
    
    await mongoose.connect(process.env.MONGO_URI!);
    
    const connection = mongoose.connection;

    connection.on('connected', () => {
      console.log('✅ MongoDB connected successfully');
    });

    connection.on('error', (err) => {
      console.log('❌ MongoDB connection error:', err);
      process.exit();
    });

  } catch(error) {
    console.log("❌ FULL MongoDB connection error:", error);    
  }
}