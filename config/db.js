const { default: mongoose } = require("mongoose");

const connectDB = async () => {
  mongoose.set("strictQuery", true);
  mongoose
    .connect(process.env.DB_URL)
    .then((conn) => {
      console.log(
        { host: conn.connection.host },
        { database: conn.connection.name }
      );
    })
    .catch((err) => {
      console.log("Not Connected to Database ERROR! ", err);
    });
};

module.exports = connectDB;
