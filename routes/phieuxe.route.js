const express = require('express')
const router = express.Router()
const phieuxeController = require('../controllers/phieuxe.controller')

router.get('/', phieuxeController.list)

router.route('/detail/:maphieu?')
    .get(phieuxeController.detail)
    .post(phieuxeController.update)

module.exports = router