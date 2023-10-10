const { pool } = require('../services/mysql')


function getAll(callback) {
    pool.query(
        'SELECT * FROM `Bai` WHERE `Trangthai` = true LIMIT 5',
        function (err, results) {
            callback(results)
        }
    );
}

function getOne(mabai, callback) {
    pool.execute(
        'SELECT * FROM `Bai` WHERE `mabai` = ? AND Trangthai = true',
        [mabai],
        function (err, results, fields) {
            callback(err, results)
        }
    )
}

function insert(newdata, callback) {
    pool.execute("INSERT INTO `bai` (`Tenbai`,`Vitri`) VALUES (?, ?)", // Như trên, ở đây có 3 dấu ? thì nó sẽ lấy lần lượt 3 phần tử thay vào
        [newdata.tenbai, newdata.vitri],
        function (err, results, fields) {
            console.log(results.info)
            callback(err)
        }
    )
}

function update(mabai, newdata, callback) {
    pool.execute('UPDATE `bai` SET `Tenbai` = ?, `Vitri` = ? WHERE `Mabai` = ?',
        [newdata.tenbai, newdata.vitri, mabai],
        function (err, results, fields) {
            // TODO fix err handling implementation here\
            console.log(results.info)
            callback(err)
        }
    )
}

function remove(mabai, callback) {
    pool.execute('UPDATE `bai` SET `Trangthai` = false WHERE `Mabai` = ? AND `Trangthai` = true',
        [mabai],
        function (err, results, fields) {
            console.log(results.info)
            callback(err, results)
        }
    )
}

function search(term, column, callback) {
    console.log(`${term} ${column}`)
    switch (column.trim().toLowerCase()) {
        case "mabai":
            pool.execute("SELECT * FROM `bai` WHERE `Mabai` = ?",
                [term],
                (err, results) => {
                    console.log(results)
                    callback(err, results)
                }
            )
            break;
        case "tenbai":
            pool.execute("SELECT * FROM `bai` WHERE `Tenbai` LIKE ?",
                [`%${term}%`],
                (err, results) => {
                    console.log(results)
                    callback(err, results)
                }
            )
            break;
        case "vitri":
            pool.execute("SELECT * FROM `bai` WHERE `Vitri` LIKE ?",
                [`%${term}%`],
                (err, results) => {
                    console.log(results)
                    callback(err, results)
                }
            )
            break;
    }
}

module.exports = {
    getAll,
    getOne,
    search,
    insert,
    update,
    remove
}