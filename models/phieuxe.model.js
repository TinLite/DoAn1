const { pool } = require('../services/mysql')


function getAll(callback) {
    pool.query(
        'SELECT * FROM `Phieuxe WHERE `Trangthai` = true` LIMIT 5',
        function (err, results) {
            callback(results)
        }
    );
}

function getOne(maphieu, callback) {
    pool.execute(
        'SELECT * FROM `Phieuxe` WHERE `Phieu` = ? AND `Trangthai` = true',
        [maphieu],
        function (err, results, fields) {
            if (err) {
                console.error(err)
            }
            console.log(results)
            callback(results[0])
        }
    );
}

function generate(mabai, soluong, callback) {
    var query = 'INSERT INTO `Phieuxe` (`Mabai`) VALUES '
    for (i = 0; i < soluong; i++) {
        query += `(${mabai})`
        if (soluong - i != 1) {
            query += ","
        }
    }
    pool.query(query, (err, result) => {
        console.log(result.info)
        callback(err)
    })
}

module.exports = {
    getAll,
    getOne,
    generate
}