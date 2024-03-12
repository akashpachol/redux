const express = require("express");
const dotenv = require("dotenv").config();
const user = require("./routes/userRoutes");
const path = require("path");
const cors = require("cors");
const port = process.env.PORT || 5000;
const app = express();

const corsOptions ={
    origin:'http://localhost:5173/', 
    credentials:true,            
    optionSuccessStatus:200
}
app.use(cors());

app.use("/", user);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/Profile", express.static(path.join(__dirname, "public/images")));

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
