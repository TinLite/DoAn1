const express = require('express')
const router = express.Router()
const { pool } = require('../services/mysql')

router.get('/', (req, res) => {
    pool.query(
        'SELECT * FROM `Xe`',
        function (err, results) {
            res.render('xe-list', {danhsachbai: results});
        }
    );
})

module.exports = router