import mongoose from "mongoose";

//DB Connection
const dbConnection = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.DB_URI ?? "");
    console.log("Connected to DB");
  } catch (error) {
    console.error("Database connection failed", error);
    process.exit(1); // Exit the process with a failure
  }
};

export default dbConnection;
