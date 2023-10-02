const express = require('express')
const router = express.Router()
const { pool } = require('../services/mysql')

router.get('/', (req, res) => {
    pool.query(
        'SELECT * FROM `Bai`',
        function (err, results) {
            res.render('bai-list', {danhsachbai: results});
        }
    );
})

module.exports = router