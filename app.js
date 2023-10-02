// Setting things up
require('dotenv').config()
const express = require('express')
const app = express()
var bodyParser = require('body-parser')
const port = process.env.PORT
var { Liquid } = require('liquidjs');
var engine = new Liquid();
var httpcat = require('./services/httpcat')

app.engine('liquid', engine.express());
app.set('views', './views');
app.set('view engine', 'liquid');

app.use(express.static('public'))
// app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true })); // Support encoded bodies like form and stuff

// Routes
const phieuxeRoute = require('./routes/phieuxe.route')
const baixeRoute = require('./routes/baixe.route')
const xeRoute = require('./routes/xe.route')
const nhanxeRoute = require('./routes/nhanxe.route');

app.use("/phieuxe", phieuxeRoute)
app.use("/baixe", baixeRoute)
app.use("/xe", xeRoute)
app.use("/nhanxe", nhanxeRoute)

app.get('/', (req, res) => {
  res.send("It's worked!")
})

// // Project wide error handling
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack)
  httpcat(res, statusCode)
})

app.listen(port, () => {
  console.log(`May chu dang chay tren cong ${port}`)
})