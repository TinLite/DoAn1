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

function getLichSuTheoPhieu(maphieu,callback){
    pool.execute(
        'SELECT g.* , x.Mauxe FROM gui g, xe x WHERE g.Soxe = x.Soxe AND g.Phieu = ? ORDER BY g.ID DESC LIMIT 5',
        [maphieu],
        function(err,results){
            if (err) {
                console.error(err)
            }
            callback(results)
        }
    );

}

module.exports = {
    getDSMoiVao,
    getDSMoiRa,
    getLichSuTheoPhieu
}