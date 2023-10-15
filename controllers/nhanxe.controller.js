const {pool} = require('../services/mysql')
const httpcat = require('../services/httpcat')
const nhanxemodel = require('../models/nhanxe.model')

function list(req, res) {
        nhanxemodel.getAll((list) => {
            res.render('nhanxe', { danhsachnhanxe: list, success: (req.query.dataSuccess || req.success || false), req: req });
        })
}
function detail(req, res) {
    var soxe = req.params.soxe.trim();
    if (!soxe) {
        httpcat(res, 400);
    } else {
        xemodel.getOne(soxe, (data) => {
            if (data.length == 0) {
                httpcat(res, 204);
            } else {
                pool.execute('SELECT g.*, b.Mabai, b.Tenbai FROM  phieuxe p , gui g, bai b WHERE  p.Phieu = g.Phieu AND b.Mabai = p.Mabai AND Soxe = ?',
                [soxe],
                function(err,results){
                    if(err){
                        console.log(err)
                    } else{
                        res.render("nhanxe", { data: data[0],danhsachnhanxe: results, req: req });
                    }
                }
                )
        }
        })
    }
}
function insert(req,res) {
    var dataSent = req.body
    if (dataSent.maphieu.trim().length == 0) { // Nếu người dung k nhập mã phiếu sẽ báo lỗi
        res.render("nhanxe", { err: "Không được phép để trống mã phiếu", body: dataSent, req: req })
    } else if (dataSent.soxe.trim().length == 0) { // Nếu người dùng k nhập số xe sẽ báo lỗi
        res.render("nhanxe", { err: "Không được phép để trống số xe", body: dataSent, req: req })
    } else {
        pool.execute('SELECT * FROM `gui` WHERE (`Phieu` = ? OR `Soxe` = ?) AND  `Thoigianra` IS NULL ORDER BY Thoigianvao DESC LIMIT 5',
            [dataSent.maphieu, dataSent.soxe],
            function (err, results, fields) {
                console.log(results)
                if (results.length == 0) {
                    pool.execute("INSERT INTO `gui` (`Phieu`, `Soxe`) VALUES (?, ?)",
                        [dataSent.maphieu, dataSent.soxe],
                        function (err, results, fields) {
                            if (err) {
                                res.render("nhanxe", { err: err.message, body: dataSent, req: req })
                            } else {
                                res.redirect(req.baseUrl)
                            }
                        }
                    )
                } else {
                    res.render("nhanxe", { err: "Số xe hoặc số thẻ đã tồn tại.", body: dataSent, req: req })
                }
            })
    }
}
module.exports = {  
    list,
    insert,
    detail
}