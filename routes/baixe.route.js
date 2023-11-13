const express = require('express')
const router = express.Router()
const baixeController = require('../controllers/baixe.controller')

router.get('/', baixeController.list)

router.route('/them').get(baixeController.showAddForm).post(baixeController.insert)

router.use('/detail/:mabai?', baixeController.validate) // Cái này sẽ xác thực cho toàn bộ đường dẫn con luôn
router.route("/detail/:mabai").get(baixeController.detail).post(baixeController.update)
router.post("/detail/:mabai/delete", baixeController.remove)

module.exports = router