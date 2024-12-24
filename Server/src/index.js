import dotenv from "dotenv";
import { app } from "./app.js";
import {connectDB} from "./db/index.js";


dotenv.config({
    path: './env'
})

connectDB()
.then(() => {
    app.on('error', (error) => {
        console.log("ERROR: ", error);
        throw error;
    })
})
.then( () => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server running on PORT:  ${process.env.PORT}`)
    })
})
.catch((err) => {
    console.log("MongoDB connection Failed !!", err);
    
})


app.get('/', (req,res) => {
    res.send("Hello World, connected to DB successfully!!")
})