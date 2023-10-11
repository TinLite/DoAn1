const {pool} = require('../services/mysql')
const httpcat = require('../services/httpcat')
const nhanxemodel = require('../models/nhanxe.model')

function list(req, res) {
        nhanxemodel.getAll((list) => {
            console.log(list)
            res.render('nhanxe', { danhsachnhanxe: list, success: (req.query.dataSuccess || req.success || false), req: req });
        })
}
module.exports = {  
    list
}