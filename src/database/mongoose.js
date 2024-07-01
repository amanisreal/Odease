const mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://amanborkar995:bKm6cdy7JaOziaAg@orderease.qrbx1kh.mongodb.net/?retryWrites=true&w=majority&appName=OrderEase`);

const connectDB = (url) => {
    mongoose.set("strictQuery", true);
    mongoose
      .connect(url)
      .then(() => console.log("MongoDB connected"))
      .catch((error) => console.log(error));
  };
  
module.exports = connectDB;