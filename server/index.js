require('dotenv').config()
let express = require('express')
let session = require('express-session')
let app = express()
const checkForSession = require("./middlewares/checkForSession")
const swagCongroller = require('./controllers/swageController')
const authController = require('./controllers/authController')
const { SERVER_PORT, SESSION_SECRET } = process.env

app.get('/api/swag',swagCongroller.read)

app.use(express.json())
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
)

app.use(checkForSession)


app.listen(SERVER_PORT, () => {
  console.log('listening on port', SERVER_PORT)
})


//END POINTS 

app.post('/api/login',authController.login)
app.post('/api/register', authController.register)
app.post('/api/signout',authController.signout)
app.get('/api/user',authController.getUser)