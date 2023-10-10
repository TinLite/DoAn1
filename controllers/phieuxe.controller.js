const { pool } = require('../services/mysql')
const httpcat = require('../services/httpcat')
const BaiXe = require('../models/baixe.model')
const PhieuXe = require('../models/phieuxe.model')

/**
 * GET /
 * Danh sách phiếu
 */
function list(req, res) {
        PhieuXe.getAll(
            function (results) {
             res.render('phieu-list', { danhsachphieu: results, req: req });
        }
        )
}

/**
 * GET /generator
 * Thêm phiếu mới
 */
function showGenerator(req, res) {
    BaiXe.getAll((result) => {
        res.render("phieu-add", {req: req, danhsachbai: result})
    })
}

/**
 * POST /generator
 * Thêm phiếu mới
 */
function generate(req, res) {
    var formData = req.body
    BaiXe.getOne(formData.mabai, (err, results) => {
        if (results.length == 0) {
            httpcat(res, 400)
        } else {
            PhieuXe.generate(formData.mabai, formData.soluong, (err) => {
                if (err) {
                    console.error(err)
                } else {
                    req.success = true
                    showGenerator(req, res)
                }
            })
        }
    })
}

/**
 * GET detail/:maphieu
 * Xem chi tiết phiếu
 */
function detail(req, res) {
    var maphieu = parseInt(req.params.maphieu.trim())
    if (!maphieu) {
        httpcat(res, 400)
    } else {
        PhieuXe.getOne(maphieu, (phieu) => {
            if (!phieu) {
                httpcat(res, 400)
            } else {
                BaiXe.getAll((list) => {
                    res.render('phieu-detail', { req: req, maphieu: maphieu, phieu: phieu, danhsachbai: list })
                })
            }
        })
    }
}

/**
 * POST /detail/:maphieu
 * Cập nhật bãi
 */
function update(req, res) {
    var maphieu = req.params.maphieu
    var mabai = parseInt(req.body.mabai);
    // TODO verify input
    PhieuXe.update(maphieu,mabai,
        function (err) {
            if (err) {
                console.log(err)
            } else {
                req.success = true
                detail(req, res)
            }
        }
    )
}
function remove(req, res) {
    var maphieu = parseInt(req.params.maphieu.trim())
    PhieuXe.remove(maphieu,
        function (err, results) {
            // TODO fix err handling implementation here
            console.log(results.info)
            if (err) {
                console.error(err)
                httpcat(res, 500)
            } else if (results.affectedRows == 0) {
                httpcat(res, 404)
            } else {
                res.redirect(req.baseUrl + "?dataSuccess=true")
            }
        }
    )
}
module.exports = {
    list,
    showGenerator,
    generate,
    detail,
    update,
    remove
}