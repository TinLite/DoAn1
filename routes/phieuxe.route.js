const express = require('express')
const router = express.Router()
const phieuxeController = require('../controllers/phieuxe.controller')

router.get('/', phieuxeController.list)

router.route('/detail/:maphieu?')
    .get(phieuxeController.detail)
    .post(phieuxeController.update)
router.post('/detail/:maphieu/delete',phieuxeController.remove)

router.route('/generate/')
    .get(phieuxeController.showGenerator)
    .post(phieuxeController.generate)

module.exports = router