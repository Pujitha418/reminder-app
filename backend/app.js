import express from "express";
import healthRouter from "./routes/health.route.js";
import remindersRouter from './routes/reminders.route.js'
import {initDb} from './config/initDb.js'

const app = express();
const port = process.env.PORT || 5000; 
app.use(express.json()); //middleware to parse json data in request body.MONGO_URI

app.use("/reminder", remindersRouter);
app.use("/", healthRouter);


app.listen(port, () => {
    initDb();
    console.log(`App listening on port ${port}`);
    
});