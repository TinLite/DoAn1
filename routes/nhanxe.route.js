const express = require('express')
const router = express.Router()
const { pool } = require('../services/mysql')
const nhanxeController = require('../controllers/nhanxe.controller')

router.get('/', nhanxeController.list)
router.post('/vao', nhanxeController.choxevao)
router.post('/ra', nhanxeController.choxera)

module.exports = router