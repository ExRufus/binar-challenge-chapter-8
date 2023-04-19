const express = require('express')
const app = express()
const cors = require('cors')
const apiRouter = require('./server/routes')
const errorHandler = require('./server/middlewares/errorHandler')
const swaggerUI = require("swagger-ui-express")
const swaggerJson = require("./openapi.json") // ini yang akan dijadikan untuk tampilan swagger
const PORT = process.env.PORT || 4000

// middlewares
app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(errorHandler)
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJson))

// view engine setup
app.set('view engine', 'ejs');
app.set('views', './server/views');

/**
 * @Routes /api
 * entrypoint for all API routes
 */
app.use("/api", apiRouter)

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`)
})