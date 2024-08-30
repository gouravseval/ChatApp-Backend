import express from "express"
import dotenv from "dotenv"
import authRouter from "./src/routes/auth.routes.js"
import { dbConnection } from "./src/database/index.js"
import messageRouter from "./src/routes/messages.routes.js"
import userRouter from "./src/routes/user.routes.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import { app, server } from "./src/socket/socket.js"

dotenv.config()

app.use(cors({
    origin: "https://chatappbygourav.netlify.app/",
    credentials: true,
}))
app.use(express.json())
app.use(cookieParser())
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/messages", messageRouter)
app.use("/api/v1/", userRouter)
app.get("/", async(req, res) => {
   const html = "<p>Api is running...</p>"
   res.send(html)
})
dbConnection().then(()=>{
    server.listen(process.env.PORT, () => {
        console.log("Server is listening on port :", process.env.PORT)
    })
})
