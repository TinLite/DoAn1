const { pool } = require('../services/mysql')
const httpcat = require('../services/httpcat')
const baixeModel = require('../models/baixe.model')

/**
 * GET /
 * Danh sách bãi
 */
function list(req, res) {
    if (!Object.keys(req.query).includes("term")) {
        baixeModel.getCount( (err, size) =>
            baixeModel.getAll((list) => {
                res.render('bai-list', { danhsachbai: list, success: (req.query.dataSuccess || req.success || false), req: req, size: size });
            }, (req.query.page ? parseInt(req.query.page) : 1))
        );
    } else {
        baixeModel.search(req.query.term, req.query.column, (err, results) => {
            res.render('bai-list', { danhsachbai: results, success: (req.query.dataSuccess || req.success || false), req: req });
        })
    }
}

function showAddForm(req, res) {
    res.render('bai-add', { req, err: req.err, body: req.body })
}

/**
 * POST /
 * Thêm bãi mới
 */
function insert(req, res) {
    var formData = req.body;
    if (formData.tenbai.trim().length == 0) {
        res.render("bai-list", { err: "Tên bãi không được để trống", body: formData, req: req })
    } else {
        baixeModel.insert(formData,
            function (err) {
                if (err) { // Nếu database báo lỗi thì show lỗi ra
                    req.err = err.message
                    showAddForm(req, res)
                } else { // Ngược lại, redirect về trang chính
                    res.redirect(`${req.baseUrl}?dataSuccess=true`)
                }
            }
        )
    }
}

/**
 * /detail/
 * Middleware xác thực mã bãi
 */
function validate(req, res, next) {
    var mabai = parseInt(req.params.mabai);
    if (!mabai || mabai < 1) {
        httpcat(res, 400)
    } else {
        // Parse int sẵn luôn :v
        req.params.mabai = mabai
        next();
    }
}

function showAddForm(req, res) {
    res.render("bai-add", { req, err: req.err, success : req.query.success || req.success })
}

/**
 * GET detail/:mabai
 * Xem chi tiết bãi
 */
function detail(req, res) {
    var mabai = req.params.mabai
    baixeModel.getOne(mabai,
        function (err, results) {
            if (results.length == 0) {
                httpcat(res, 404)
            } else if (err) {
                console.error(err)
                httpcat(res, 500)
            } else {
                res.render("bai-edit", { data: results[0], err: req.err, req: req })
            }
        }
    )
}

/**
 * POST /detail/:mabai
 * Cập nhật bãi
 */
function update(req, res) {
    var mabai = req.params.mabai
    var formData = req.body;
    baixeModel.update(mabai, formData,
        function (err) {
            // TODO fix err handling implementation here
            if (err) {
                console.error(err)
                httpcat(res, 500)
            } else {
                res.redirect(req.baseUrl + "?dataSuccess=true")
            }
        }
    )
}

function remove(req, res) {
    var mabai = req.params.mabai
    baixeModel.remove(mabai,
        function (err, results) {
            // TODO fix err handling implementation here
            if (err) {
                console.error(err)
                httpcat(res, 500)
            } else if (results.affectedRows == 0) {
                httpcat(res, 404)
            } else {
                res.redirect(req.baseUrl)
            }
        }
    )
}

module.exports = {
    showAddForm,
    list,
    validate,
    insert,
    detail,
    update,
    remove
}