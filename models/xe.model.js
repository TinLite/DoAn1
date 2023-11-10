const { pool } = require('../services/mysql')

function getAll(callback) {
    pool.query(
        'SELECT * FROM `xe` WHERE `Trangthai` =true LIMIT 5',
        function (err, results) {
            callback(results)
        }
    );
}

function getOne(soxe, callback) {
    pool.execute(
        'SELECT * FROM `xe` WHERE `Soxe` = ? AND `Trangthai`= true LIMIT 1',
        [soxe],
        function (err, results, fields) {
            callback(results)
        }
    )
}
function update(soxe, mauxe, callback) {
    pool.execute("UPDATE `xe` SET Mauxe = ? WHERE `Soxe` = ? AND `Trangthai` = true",
        [mauxe, soxe],
        function (err, results, fields) { // k có function (er,...) =>{}
            callback(err, results)
        }
    )
}
function update(soxe, mauxe, anh, callback) {
    pool.execute("UPDATE `xe` SET Mauxe = ?, Hinhanh = ? WHERE `Soxe` = ? AND `Trangthai` = true",
        [mauxe, anh, soxe],
        function (err, results, fields) { // k có function (er,...) =>{}
            callback(err, results)
        }
    )
}
function search(term, column, callback) {
    switch (column.trim().toLowerCase()) {
        case "soxe":
            pool.execute("SELECT * FROM `xe` WHERE `Soxe` LIKE ? AND Trangthai = true ",
                [`%${term}%`],
                function (err, results) {
                    callback(err, results)
                })
            break;
        case "mauxe":
            pool.execute("SELECT * FROM `xe` WHERE `Mauxe` LIKE ? AND Trangthai = true ",
                [`%${term}%`],
                function (err, results) {
                    callback(err, results)
                })
            break;
    }
}
function remove(soxe, callback) {
    pool.execute('UPDATE `xe` SET `Trangthai` = false WHERE `Soxe` = ? AND `Trangthai` = true',
        [soxe],
        function (err, results, fields) {
            console.log(results.info)
            callback(err, results)
        }
    )
}

function insertOne(soxe, mauxe, callback) {
    pool.execute(
        "INSERT INTO `xe` (`Soxe`,`Mauxe`) VALUES (?, ?)",
        [soxe, mauxe],
        function (err, results, fields) {
            console.log(results.info)
            callback(err, results)
        }
    );
}

function insertOne(soxe, mauxe, hinhanh, callback) {
    pool.execute(
        "INSERT INTO `xe` (`Soxe`,`Mauxe`, `Hinhanh`) VALUES (?, ?, ?)",
        [soxe, mauxe, hinhanh],
        function (err, results, fields) {
            console.log(results.info)
            callback(err, results)
        }
    );
}
module.exports = {
    getAll,
    getOne,
    update,
    search,
    remove,
    insertOne
}