const express = require('express')
const router = express.Router()
const { pool } = require('../services/mysql')

router.get('/', (req, res) => {
    pool.query(
        'SELECT * FROM `Phieuxe`',
        function (err, results) {
            res.render('phieu-list', {danhsachphieu: results});
        }
    );
})

module.exports = router