const { pool } = require('../services/mysql')


function getAll(callback) {
    pool.query(
        'SELECT * FROM `Bai`',
        function (err, results) {
            callback(results)
        }
    );
}

module.exports = {
    getAll
}