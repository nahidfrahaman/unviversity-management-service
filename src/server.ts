// data base connection ja ja dorkar tai tai akhane thakbe
import mongoose from "mongoose";
import app from "./app";
import config from "./config";

async function dataMonstar() {
  try {
    await mongoose
      .connect(config.database_Url as string)
      .then(() => console.log("Database is connected"));
    app.listen(config.port, () => {
      console.log(`server listening port  is$}`, config.port);
    });
  } catch (err) {
    console.log("database connnection error", err);
  }

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
dataMonstar();
