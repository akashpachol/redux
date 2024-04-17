const express = require("express");
const dotenv = require("dotenv").config();
const user = require("./routes/userRoutes");
const admin = require("./routes/adminRoutes");
const path = require("path");
const cors = require("cors");
const port = process.env.PORT || 5000;
const dbConnection = require("./config/dbConnect");
const { errorHandler } = require("./middleware/errorMiddleware");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dbConnection();
app.use(express.static(path.join(__dirname, "public")));
app.use("/Profile", express.static(path.join(__dirname, "public/images")));
app.use("/", user);
app.use("/admin", admin);
app.use(errorHandler
  );
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
