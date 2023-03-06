import * as dotenv from 'dotenv';
dotenv.config();
import express from "express";
const app = express();
const PORT = process.env.PORT;

app.get('/', (req, res)=>{
    res.status(200);
    res.send(`🚀 running 🔥`);
})
app.listen(PORT, ()=>{
    console.log(`🚀  Listening on port ${PORT}\n open 🔗 http://localhost:${PORT} 🔗`);
});
