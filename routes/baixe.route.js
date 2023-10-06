const express = require('express')
const router = express.Router()
const { pool } = require('../services/mysql')
const httpcat = require('../services/httpcat')
const baixeController = require('../controllers/baixe.controller')

router.get('/', baixeController.list)

router.post('/', baixeController.insert)

router.route("/detail/:mabai?").get(baixeController.detail).post(baixeController.update)

module.exports = router