const { pool } = require('../services/mysql')


function getAll(callback) {
    pool.query(
        'SELECT * FROM `Bai` LIMIT 5',
        function (err, results) {
            callback(results)
        }
    );
}

module.exports = {
    getAll
}