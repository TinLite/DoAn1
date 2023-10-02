// Setting things up
require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT
var { Liquid } = require('liquidjs');
var engine = new Liquid();

app.engine('liquid', engine.express());
app.set('views', './views');
app.set('view engine', 'liquid');

app.use(express.static('public'))

// Routes
const phieuxeRoute = require('./routes/phieuxe.route')
const baixeRoute = require('./routes/baixe.route')
const xeRoute = require('./routes/xe.route')

app.use("/phieuxe", phieuxeRoute)
app.use("/baixe", baixeRoute)
app.use("/xe", xeRoute)

app.get('/', (req, res) => {
  res.send("It's worked!")
})

app.listen(port, () => {
  console.log(`May chu dang chay tren cong ${port}`)
})