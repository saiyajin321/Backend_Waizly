require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./routers')
const { errorHandler } = require('./middleware/errorHandler')
const app = express()
const port = 3000


app.use(cors())
app.use(express.urlencoded({extended : true}))
app.use(express.json())

app.use(router)
router.use(errorHandler)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})