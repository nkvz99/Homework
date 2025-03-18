import express from "express";
import bookRoutes from "./routes/books.routes.js";
import logger from "./middlewares/logger.middleware.js";




const PORT = 3000;
const HOSTNAME = 'localhost';

const app = express()

app.use(express.json());
app.use(logger)
app.use("/books" , bookRoutes)

app.listen(PORT,HOSTNAME,()=>{
    console.log(`Server startet listening on: http://${HOSTNAME}:${PORT}`)
})