import mongoose from "mongoose";

export const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "JobHike",
    });
    console.log("Database connected successfully");
  } catch (error) {
    console.log(error);
    console.log("error while connecting database");
  }
};
