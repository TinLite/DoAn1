const { pool } = require('../services/mysql')


function getList(callback) {
    pool.query(
        'SELECT * FROM `Bai`',
        function (err, results) {
            callback(results)
        }
    );
}

module.exports = {
    getList
}