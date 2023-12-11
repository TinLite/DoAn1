const httpcat = require("../services/httpcat");
const xemodel = require("../models/xe.model");
const phieuxemodel = require("../models/phieuxe.model");
const uploadService = require("../services/uploads")

/**
 * GET /
 * Danh sách xe
 */
function list(req, res) {
    if (!Object.keys(req.query).includes("term")) {
        xemodel.getCount((err, size) =>
            xemodel.getAll((list) => {
                res.render("xe-list", { danhsachxe: list, body: req.insertForm, err: req.error_message, success: req.query.dataSuccess || req.success || false, req: req, size: size, });
            }, (req.query.page ? parseInt(req.query.page) : 1))
        );
    } else {
        xemodel.search(req.query.term, req.query.column,
            function (err, results) {
                res.render("xe-list", { danhsachxe: results, body: req.insertForm, err: req.error_message, success: req.query.dataSuccess || req.success || false, req: req, });
            })
    }
}

function validate(req,res,next){
    var soxe = req.params.soxe;
    if(!soxe){
        httpcat(res, 400)
    }else{
        next();
    }
}
/**
 * POST /
 * Thêm xe mới
 */
function insert(req, res) {
    var formData = req.body;
    var insertfunc = (filename) => xemodel.insertWithHinhanh(
        formData.soxe,
        formData.mauxe,
        filename,
        function (err) {
            if (err) {
                // Nếu database báo lỗi thì show lỗi ra
                req.err = err.message
                req.insertForm = FormDataEvent
            } else {
                req.success = true;
            }
            showAddForm(req, res);
        }
    )
    // console.log(formData)
    if (formData.anh && formData.anh.length > 10)
        uploadService.saveBase64Image(
            formData.anh,
            formData.soxe,
            (err, filename) => {
                if (err) {
                    console.error(err);
                    req.error_message = err.message
                }
                insertfunc(filename);
            }
        )
    else {
        insertfunc(null)
    }
}

function showAddForm(req, res) {
    res.render("xe-add", { req, err: req.err, success: req.success || req.query.success, body: req.body });
}

/**
 * GET detail/:soxe
 * Xem chi tiết xe
 */
function detail(req, res) {
    var soxe = req.params.soxe
    if (!soxe) {
        return httpcat(res, 400);
    }
    xemodel.getOne(soxe,
        function (result1) {
            if (result1.length == 0) {
                return httpcat(res, 404);
            }
            phieuxemodel.getAllWithMaBai(soxe, (err, lichsugui) => {
                res.render("xe-edit", { data: result1[0], lichsunhanxe: lichsugui, req: req });
            })
        }
    )
}

function update(req, res) {
    var soxe = req.params.soxe // Số xe cũ
    var data = req.body;

    var errorHandlerAndRedirect = function (err) {
        if (err) {
            console.error(err)
            res.send(err)
        } else {
            res.redirect(req.baseUrl)
        }
    };

    // Nếu người dùng cập nhật ảnh (Trường anh tồn tại trong form)
    if (data.anh) {
        uploadService.saveBase64Image(
            data.anh,
            soxe,
            (err, filename) => {
                if (err) {
                    console.error(err);
                    req.error_message = err.message
                }
                xemodel.updateWithAnh(
                    soxe,
                    data.mauxe,
                    filename,
                    errorHandlerAndRedirect
                )
            }
        )
    }
    else
        xemodel.update(
            soxe,
            data.mauxe,
            errorHandlerAndRedirect
        )
}
function remove(req, res) {
    var soxe = (req.params.soxe.trim())
    xemodel.remove(soxe,
        function (err, results) {
            // TODO fix err handling implementation here
            console.log(results.info)
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
    list,
    showAddForm,
    insert,
    detail,
    update,
    validate,
    remove
};
