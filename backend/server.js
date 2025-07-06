import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { connectDB } from './config/db.js'
import userRouter from './routes/userRouter.js'
import taskRouter from './routes/taskRoute.js'
const app = express()

const port = process.env.Port || 9000


// Middelware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : true}));

// DB connect

connectDB();

// Routes

app.use("/api/user", userRouter)
app.use("/api/tasks", taskRouter)

app.get ('/', (req,res) =>{
    res.send('API Working')
})

app.listen (port, () => {
    console.log(`server started on http://localhost:${port}`)
})