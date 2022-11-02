require("dotenv").config();

const express = require("express");
const app = express();
const userRouter = require("./api/users/user.router");
const cookieParser = require('cookie-parser');

app.use(express.json());

app.use("/api/users", userRouter);

app.use(cookieParser());

app.listen(process.env.APP_PORT,()=>{
    console.log("Server up and running on PORT:",process.env.APP_PORT);
});
