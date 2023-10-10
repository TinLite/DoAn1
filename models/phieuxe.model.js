const { pool } = require('../services/mysql')


function getAll(callback) {
    pool.query(
        'SELECT * FROM `Phieuxe` WHERE `Trangthai` = true',
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
function update(maphieu, mabai, callback) {
    pool.execute('UPDATE `Phieuxe` SET `Mabai` = ? WHERE `Phieu` = ?',
        [mabai,maphieu],
        function (err, results, fields) {
            // TODO fix err handling implementation here\
            console.log(results.info)
            callback(err)
        }
    )
}
function remove(maphieu, callback) {
    pool.execute('UPDATE `phieuxe` SET `Trangthai` = false WHERE `Phieu` = ? AND `Trangthai` = true',
        [maphieu],
        function (err, results, fields) {
            console.log(results.info)
            callback(err, results)
        }
    )
}
module.exports = {
    getAll,
    getOne,
    generate,
    update,
    remove
}