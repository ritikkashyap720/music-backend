const express = require("express")
const cors = require('cors')
const router = require("./routes/music.route")
const app = express();
const dotenv = require("dotenv")
const PORT = 8000 || process.env.PORT;

require('dotenv').config();
var corsOptions = {
    origin: "https://music-6dku.onrender.com"||process.env.FRONT_END_URL,
    optionsSuccessStatus: 200
  }

app.use(cors(corsOptions));
app.use("/",router)
app.get("/start-server/start",(req,res)=>{res.send("Server started")})

app.listen(PORT, () => { console.log(`Server started at http://localhost:${PORT}`) });
