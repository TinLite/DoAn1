const express = require('express')
const router = express.Router()
const { pool } = require('../services/mysql')

router.get('/', (req, res) => {
    pool.query(
        'SELECT * FROM `Xe`',
        function (err, results) {
            res.render('xe-list', {danhsachxe: results});
        }
    );
})

module.exports = router