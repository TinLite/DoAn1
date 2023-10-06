const { pool } = require('../services/mysql')

function getAll(callback) {
    pool.query(
        'SELECT * FROM `xe` LIMIT 5',
        function (err, results) {
            callback(results)
        }
    );
}

function getOne(soxe, callback) {
    pool.execute(
        'SELECT * FROM `xe` WHERE `Soxe` = ? LIMIT 1',
        [soxe],
        function (err, results, fields) {
            callback(results)
        }
    )
}
function update(soxe, newdata, callback){
    pool.execute("UPDATE `xe` SET Mauxe = ? WHERE Soxe = ? ",
  [newdata.mauxe, soxe],
  function (err, results, fields) { // k có function (er,...) =>{}
    callback(err)
  }
  )
}

module.exports = {
    getAll,
    getOne,
    update
}