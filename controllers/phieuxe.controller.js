const { pool } = require('../services/mysql')
const httpcat = require('../services/httpcat')
const BaiXe = require('../models/baixe.model')
const PhieuXe = require('../models/phieuxe.model')

/**
 * GET /
 * Danh sách phiếu
 */
function list(req, res) {
    pool.query(
        'SELECT * FROM `Phieuxe`',
        function (err, results) {
            res.render('phieu-list', { danhsachphieu: results, req: req });
        }
    );
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
    pool.execute('UPDATE `Phieuxe` SET `Mabai` = ? WHERE `Phieu` = ?',
        [mabai, maphieu],
        function (err, results, fields) {
            if (err) {
                console.log(err)
                detail(req, res)
            } else {
                req.success = true
                detail(req, res)
            }
        }
    )
}

module.exports = {
    list,
    showGenerator,
    generate,
    detail,
    update
}