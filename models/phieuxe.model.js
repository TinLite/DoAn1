const { pool } = require('../services/mysql')

function getCount(callback) {
    pool.execute('SELECT COUNT(*) as "COUNT" FROM `phieuxe` WHERE `Trangthai` = 1',
        function (err, results, fields) {
            console.log(results)
            callback(err, results[0].COUNT, fields)
        })
}

function getAll(callback, page = 1) {
    pool.execute(
        'SELECT * FROM `Phieuxe` WHERE `Trangthai` = true LIMIT 10 OFFSET ?',
        [(page - 1) * 10],
        function (err, results) {
            callback(results)
        }
    );
}

function getAllWithMaBai(soxe, callback) {
    pool.execute('SELECT g.*, b.Mabai FROM phieuxe p, gui g, bai b WHERE p.Phieu = g.Phieu AND b.Mabai = p.Mabai AND g.Soxe = ? ORDER BY g.ID DESC',
        [soxe],
        function (err, result) {
            if (err) {
                console.error(err)
            } else {
                callback(err, result)
            }
        }
    )
}

function getOne(maphieu, callback) {
    pool.execute(
        'SELECT * FROM `Phieuxe` WHERE `Phieu` = ? AND `Trangthai` = true',
        [maphieu],
        function (err, results, fields) {
            if (err) {
                console.error(err)
            }
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
function search(term,column,callback){
    switch(column.trim().toLowerCase()){
        case "phieu":
            pool.execute("SELECT * FROM `phieuxe` WHERE `Phieu` = ?",
            [term],
            function(err, results){
                callback(err,results)
            }
        )
        break;
        case "mabai":
            pool.execute("SELECT * FROM `phieuxe` WHERE `Mabai` = ?",
            [term],
            function(err, results){
                callback(err,results)
            }
            )
        break;
    }

}

module.exports = {
    getCount,
    getAll,
    getAllWithMaBai,
    getOne,
    generate,
    update,
    remove,
    search,
}