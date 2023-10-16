const { pool } = require('../services/mysql')
const httpcat = require('../services/httpcat')
const nhanxemodel = require('../models/nhanxe.model')

function list(req, res) {
    nhanxemodel.getAll((list) => {
        res.render('nhanxe', { err: res.err, danhsachnhanxe: list, success: (req.query.dataSuccess || req.success || false), req: req });
    })
}
function choxevao(req, res) {
    var dataSent = req.body
    req.nhanBody = req.body;
    if (dataSent.maphieu.trim().length == 0) { // Nếu người dung k nhập mã phiếu sẽ báo lỗi
        res.err = "Không được phép để trống mã phiếu";
        list(req, res);
    } else if (dataSent.soxe.trim().length == 0) { // Nếu người dùng k nhập số xe sẽ báo lỗi
        res.err = "Không được phép để trống số xe";
        list(req, res);
    } else {
        pool.execute('SELECT * FROM `gui` WHERE (`Phieu` = ? OR `Soxe` = ?) AND `Thoigianra` IS NULL',
            [dataSent.maphieu, dataSent.soxe],
            function (err, results, fields) {
                console.log(results)
                if (results.length == 0) {
                    pool.execute("INSERT INTO `gui` (`Phieu`, `Soxe`) VALUES (?, ?)",
                        [dataSent.maphieu, dataSent.soxe],
                        function (err, results, fields) {
                            if (err) {
                                res.err = err.message
                                list(req, res);
                            } else {
                                res.redirect(req.baseUrl)
                            }
                        }
                    )
                } else {
                    res.err = "Số xe hoặc số thẻ đang sử dụng trong bãi.";
                    list(req, res)
                }
            }
        )
    }
}

function choxera(req, res) {
    res.send("OK");
}

module.exports = {
    list,
    choxevao,
    choxera,
}