import mongoose from "mongoose";

export async function dbConnection() {
  try {
    let connectionToDb =await mongoose.connect("mongodb://127.0.0.1:27017/taskDb");
    console.log(
      `MongoDb is connected successfully on ${connectionToDb.connection.host}`
    );
  } catch (error) {
    console.log(error.message);
  }
}
