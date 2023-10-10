const express = require('express')
const router = express.Router()
const xecontroller = require('../controllers/xe.controller')

router.get('/', xecontroller.list)

router.post('/',xecontroller.insert)

router.route("/detail/:soxe?").get(xecontroller.detail)
router.post("/detail/:soxe?", xecontroller.update)
router.post("/detail/:soxe/delete", xecontroller.remove)
module.exports = router