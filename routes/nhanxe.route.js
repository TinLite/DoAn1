const express = require('express')
const router = express.Router()
const { pool } = require('../services/mysql')

router.get('/', (req, res) => {
    res.render('nhanxe');
})
module.exports = router