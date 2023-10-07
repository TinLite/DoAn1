const { pool } = require('../services/mysql')


function getAll(callback) {
    pool.query(
        'SELECT * FROM `Bai` WHERE `Trangthai` = true',
        function (err, results) {
            callback(results)
        }
    );
}

module.exports = {
    getAll
}