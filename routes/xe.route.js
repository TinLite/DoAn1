const express = require('express')
const router = express.Router()
const xecontroller = require('../controllers/xe.controller')

router.get('/', xecontroller.list)

router.route('/them')
    .get(xecontroller.showAddForm)
    .post(xecontroller.insert)
router.use('/detail/:soxe?', xecontroller.validate)
router.route("/detail/:soxe?")
    .get(xecontroller.detail)
    .post(xecontroller.update)
router.post("/detail/:soxe/delete", xecontroller.remove)
module.exports = router