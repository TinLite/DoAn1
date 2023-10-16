const {pool} = require('../services/mysql')

function getDSMoiVao(callback){
    pool.query(
        'SELECT * FROM gui ORDER BY ID DESC LIMIT 5',
        function(err,results){
            callback(results)
        }
    );
}

function getDSMoiRa(callback){
    pool.query(
        'SELECT * FROM gui WHERE `Thoigianra` IS NOT NULL ORDER BY `Thoigianra` DESC LIMIT 5',
        function(err,results){
            callback(results)
        }
    );
}

module.exports = {
    getDSMoiVao,
    getDSMoiRa
}