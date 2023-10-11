const {pool} = require('../services/mysql')

function getAll(callback){
    pool.query(
        'SELECT * FROM gui WHERE Trangthai = true LIMIT 5',
        function(err,results){
            callback(results)
        }
    );
}

module.exports = {
    getAll
}