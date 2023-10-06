const { pool } = require('../services/mysql')


function getAll(callback) {
    pool.query(
        'SELECT * FROM `Phieuxe`',
        function (err, results) {
            callback(results)
        }
    );
}

function getOne(maphieu, callback) {
    pool.execute(
        'SELECT * FROM `Phieuxe` WHERE `Phieu` = ?',
        [maphieu],
        function (err, results, fields) {
            callback(results[0])
        }
    );
}

module.exports = {
    getAll,
    getOne
}