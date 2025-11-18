import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import userRoutes from "./routes/user.routes.js"
import verifyToken from "./middlewares/verifyToken.js"
import { pool } from "./data/db/conection.js"
import { signin } from './controller/signin.js'
import { signup } from './controller/signup.js'

const app = express()
const PORT = 5000
const JWT_SECRET = "your_jwt_secret"

app.use(cors())
app.use(bodyParser.json())

app.get("/", (req, res) => {
  res.send("Bienvenido a la API de usuarios 🧪")
})

app.post('/signin', signin)
app.post('/signup', signup)

app.get("/protected", verifyToken, (req, res) => {
  res.json({
    message: "¡Has accedido a la ruta protegida!",
    user: req.user,
  })
})

app.use("/", verifyToken, userRoutes)

app.listen(PORT, () =>
  console.log(`🚀 Server running at http://localhost:${PORT}`)
)

