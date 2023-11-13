const { pool } = require('../services/mysql')

function getCount(callback) {
    pool.execute('SELECT COUNT(*) as "COUNT" FROM `bai` WHERE `Trangthai` = 1',
        function (err, results, fields) {
            if (err)
                console.error(err)
            console.log(results)
            callback(err, results[0].COUNT, fields)
        })
}

function getAll(callback, page = 1) {
    pool.execute(
        'SELECT * FROM `bai` WHERE `Trangthai` = true LIMIT 10 OFFSET ?',
        [(page - 1) * 10],
        function (err, results) {
            if (err)
                console.error(err)
            callback(results)
        }
    );
}

function getOne(mabai, callback) {
    pool.execute(
        'SELECT * FROM `bai` WHERE `Mabai` = ? AND Trangthai = true',
        [mabai],
        function (err, results, fields) {
            if (err)
                console.error(err)
            callback(err, results)
        }
    )
}

function insert(newdata, callback) {
    pool.execute("INSERT INTO `bai` (`Tenbai`,`Vitri`) VALUES (?, ?)", // Như trên, ở đây có 3 dấu ? thì nó sẽ lấy lần lượt 3 phần tử thay vào
        [newdata.tenbai, newdata.vitri],
        function (err, results, fields) {
            if (err)
                console.error(err)
            console.log(results.info)
            callback(err)
        }
    )
}

function update(mabai, newdata, callback) {
    pool.execute('UPDATE `bai` SET `Tenbai` = ?, `Vitri` = ? WHERE `Mabai` = ?',
        [newdata.tenbai, newdata.vitri, mabai],
        function (err, results, fields) {
            if (err)
                console.error(err)
            console.log(results.info)
            callback(err)
        }
    )
}

function remove(mabai, callback) {
    pool.execute('UPDATE `bai` SET `Trangthai` = false WHERE `Mabai` = ? AND `Trangthai` = true',
        [mabai],
        function (err, results, fields) {
            if (err)
                console.error(err)
            console.log(results.info)
            callback(err, results)
        }
    )
}

function search(term, column, callback) {
    switch (column.trim().toLowerCase()) {
        case "mabai":
            pool.execute("SELECT * FROM `bai` WHERE `Mabai` = ?",
                [term],
                (err, results) => {
                    if (err)
                        console.error(err)
                    callback(err, results)
                }
            )
            break;
        case "tenbai":
            pool.execute("SELECT * FROM `bai` WHERE `Tenbai` LIKE ?",
                [`%${term}%`],
                (err, results) => {
                    if (err)
                        console.error(err)
                    callback(err, results)
                }
            )
            break;
        case "vitri":
            pool.execute("SELECT * FROM `bai` WHERE `Vitri` LIKE ?",
                [`%${term}%`],
                (err, results) => {
                    if (err)
                        console.error(err)
                    callback(err, results)
                }
            )
            break;
    }
}

module.exports = {
    getCount,
    getAll,
    getOne,
    search,
    insert,
    update,
    remove
}