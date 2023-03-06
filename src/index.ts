import * as dotenv from 'dotenv';
import express from 'express';

dotenv.config();
const app = express();
const { PORT } = process.env;

app.get('/', (req, res)=>{
    res.status(200);
    res.send('🚀 running 🔥');
});
app.listen(PORT, ()=>{
    console.log(`🚀 Listening on port ${PORT}\n open 🔗 http://localhost:${PORT} 🔗`);
});
