const { pool } = require("../services/mysql");
const httpcat = require("../services/httpcat");
const xemodel = require("../models/xe.model");

/**
 * GET /
 * Danh sách xe
 */
function list(req, res) {
    xemodel.getAll((list) => {
        res.render("xe-list", {
            danhsachxe: list,
            success: req.query.dataSuccess || req.success || false,
            req: req,
        });
    });
}
/**
 * POST /
 * Thêm xe mới
 */
function insert(req, res) {
    var formData = req.body;
    if (formData.soxe.trim().length <= 3) {
        res.render("xe-list", { err: "Số xe không được để trống", body: formData });
    } else {
        pool.execute(
            "INSERT INTO `xe` (`Soxe`,`Mauxe`) VALUES (?, ?)",
            [formData.soxe, formData.mauxe],
            function (err, results, fields) {
                if (err) {
                    // Nếu database báo lỗi thì show lỗi ra
                    res.render("xe-list", { err: err.message, body: formData });
                } else {
                    // Ngược lại, redirect về trang chính
                    req.success = true;
                    list(req, res);
                }
            }
        );
    }
}

/**
 * GET detail/:mabai
 * Xem chi tiết xe
 */
function detail(req, res) {
    var soxe = req.params.soxe.trim();
    if (!soxe) {
        httpcat(res, 400);
    } else {
        xemodel.getOne(soxe, (data) => {
            if (data.length == 0) {
                httpcat(res, 204);
            } else {
                res.render("xe-edit", { data: data[0], req: req });
            }
        })
    }
}

function update(req, res) {
    var soxe = req.params.soxe // Số xe cũ
    var data = req.body;
    console.log(data);
    xemodel.update(soxe, data,
        function (err) {
            if (err) {
                console.error(err)
                res.send(err)
            } else {
                res.redirect(req.baseUrl)
            }
        })
}

module.exports = {
    list,
    insert,
    detail,
    update
};
