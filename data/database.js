import mongoose from "mongoose";

export const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "testing",
    })
    .then(() => {
      console.log("Connected to mongoDB");
    })
    .catch((err) => {
      console.log(err);
    });
};
