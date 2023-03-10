 import  express   from "express";
 import mongoose  from "mongoose";
 import cors from 'cors';

import postRouters from './routes/posts.js';
import dotenv from 'dotenv';

dotenv.config()


const app = express();
app.use(express.json())
const whitelist = ["http://localhost:3000"]

const corsOptions = {
    origin: function (origin, callback) {
      if (!origin || whitelist.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error("Not allowed by CORS"))
      }
    },
    credentials: true,
  }
  app.use(cors(corsOptions))
app.use('/posts',postRouters);

const PORT = process.env.PORT || 5000;
mongoose.set("strictQuery", false);

mongoose.connect(process.env.CONNECTION_URL)
.then(()=>app.listen(PORT, ()=> console.log(`server running on port:${PORT}`)))
.catch((error)=>console.log(error.message));
