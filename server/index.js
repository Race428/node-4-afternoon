require('dotenv').config()
let express = require('express')
let session = require('express-session')
let app = express()
const checkForSession = require("./middlewares/checkForSession")
const swagCongroller = require('./controllers/swagController')
const authController = require('./controllers/authController')
const { SERVER_PORT, SESSION_SECRET } = process.env
const cartController = require('./controllers/cartController')

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
app.post('/api/cart/checkout',cartController.checkout)
app.post('/api/cart/:id',cartController.add)
app.get('/api/user',authController.getUser)
app.delete('/api/cart/:id',cartController.delete)
