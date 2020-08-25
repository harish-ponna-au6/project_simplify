// NPM packages
const express = require("express"); 
const cors = require("cors")
require("dotenv").config();
const path = require("path")


// DB
require("./db");

const app = express()
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())



app.get("/api/home",(req,res)=>res.json({message:"Hi, This is a Simplify API"})) // home route welcome message

app.use(require("./api/routes/adminRoutes"))
app.use(require("./api/routes/editorRoutes"))
app.use(require("./api/routes/customerRoutes"))

app.use(express.static(path.resolve(__dirname,"client","build")))
app.get("*",(req,res)=>res.sendFile(path.resolve(__dirname,"client","build","index.html")))



module.exports = app;