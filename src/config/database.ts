import mongoose from "mongoose";

//DB Connection
const dbConnection = async (): Promise<void> => {
  await mongoose.connect(process.env.DB_URI ?? "").then(() => {
    console.log("connected to DB");
  });
};

export default dbConnection;
