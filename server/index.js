const express = require('express')
const cookieParser = require('cookie-parser')

const app = express()
const port = process.env.PORT || 8001

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8000')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.use(cookieParser())

app.use('/auth', require('./routes/auth'))
app.use('/callback', require('./routes/callback'))
app.use('/login', require('./routes/login'))
app.use('/refresh', require('./routes/refresh'))

app.listen(port, () => console.log('Listening on port ' + port))