const { pool } = require('../services/mysql')

function getDSMoiVao(callback) {
    pool.query(
        'SELECT * FROM `gui`,`phieuxe`,`bai` WHERE `gui`.Phieu = `phieuxe`.Phieu AND `phieuxe`.Mabai = `bai`.Mabai AND `gui`.Thoigianra IS NULL ORDER BY ID DESC LIMIT 5',
        function (err, results) {
            callback(results)
        }
    );
}

function getDSMoiRa(callback) {
    pool.query(
        'SELECT * FROM gui WHERE `Thoigianra` IS NOT NULL ORDER BY `Thoigianra` DESC LIMIT 5',
        function (err, results) {
            callback(results)
        }
    );
}

function getDSSoXeChuaGui(callback) {
    pool.query(
        'SELECT * FROM Xe WHERE `Soxe` NOT IN ( SELECT Soxe FROM `gui` WHERE `Thoigianra` IS NULL ) AND `Trangthai` = 1',
        function (err, results) {
            callback(results)
        }
    );
}

function getDSPhieuDangGui(callback) {
    pool.query(
        'SELECT `Phieu` FROM `gui` WHERE `Thoigianra` IS NULL',
        function (err, results) {
            callback(results)
        }
    );
    
}

function getLichSuTheoPhieu(maphieu, callback) {
    pool.execute(
        'SELECT g.* , x.Mauxe FROM gui g, xe x WHERE g.Soxe = x.Soxe AND g.Phieu = ? ORDER BY g.ID DESC LIMIT 5',
        [maphieu],
        function (err, results) {
            if (err) {
                console.error(err)
            }
            callback(results)
        }
    );

}
function insert(newdata, callback) {
    pool.execute("INSERT INTO `gui` (`Phieu`, `Soxe`) VALUES (?, ?)",
        [newdata.maphieu, newdata.soxe],
        function (err, results, fields) {
            if (!err)
                console.log(results.info)
            else
                console.log(err)
            callback(err)
        }
    )
}
function getAllWithFormData(newdata,callback){
    pool.execute('SELECT * FROM `gui` WHERE (`Phieu` = ? OR `Soxe` = ?) AND `Thoigianra` IS NULL',
    [newdata.maphieu, newdata.soxe],
    function(err,results,fields){
        console.log(results.info)
        callback(results)
    })
}
function updateThoiGianRa (newdata,callback){
    pool.execute('UPDATE gui SET Thoigianra = CURRENT_TIMESTAMP() WHERE Phieu = ? AND Thoigianra IS NULL',
    [newdata.maphieu],
    function (err, results, fields) {
        console.log(results.info)
        callback(err,results)
       })
}

module.exports = {
    getDSMoiVao,
    getDSMoiRa,
    getLichSuTheoPhieu,
    insert,
    getAllWithFormData,
    updateThoiGianRa,
    getDSSoXeChuaGui,
    getDSPhieuDangGui
}