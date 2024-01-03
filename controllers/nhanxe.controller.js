const { pool } = require('../services/mysql')
const httpcat = require('../services/httpcat')
const nhanXeModel = require('../models/nhanxe.model')
const xeModel = require('../models/xe.model')
const phieuXeModel = require('../models/phieuxe.model')

function list(req, res) {
    nhanXeModel.getDSPhieuDangGui((dsmaphieudanggui) => {
        phieuXeModel.getAllMaPhieuChuaGuiNoLimit((dsmaphieuchuagui) => {
            nhanXeModel.getDSSoXeChuaGui((dschuagui) => {
                nhanXeModel.getDSMoiVao((dsmoivao) => {
                    nhanXeModel.getDSMoiRa((dsmoira) => {
                        res.render('nhanxe', { 
                            req: req,
                            success: (req.query.dataSuccess || req.success || false),
                            err: res.err,
                            danhsachnhanxe: dsmoivao,
                            danhsachxuatxe: dsmoira,
                            dsmaphieuchuagui: dsmaphieuchuagui,
                            dsxechuagui: dschuagui,
                            dsmaphieudanggui: dsmaphieudanggui
                        });
                    })
                })
            })
        })
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
        nhanXeModel.getAllWithFormData(dataSent,
            function (results) {
                if (results.length == 0) {
                    nhanXeModel.insert(dataSent,
                        function (err) {
                            if (err) {
                                if (err.code === 'ER_NO_REFERENCED_ROW_2') {
                                    xeModel.insertWithHinhanh(dataSent.soxe, null, null,
                                        function (err) {
                                            if (err) {
                                                res.render("nhanxe", { err: err.message, body: dataSent, req: req })
                                            } else {
                                                return choxevao(req, res)
                                            }
                                        })
                                } else {
                                    res.render("nhanxe", { err: err.message, body: dataSent, req: req })
                                }
                            } else {
                                req.success = true
                                list(req, res)
                            }
                        })
                } else {
                    res.err = "Số xe hoặc số thẻ đang sử dụng trong bãi.";
                    list(req, res)
                }
            }
        )
    }
}

function choxera(req, res) {
    var formData = req.body
    nhanXeModel.updateThoiGianRa(formData,
        function (err, results) {
            if (err) {
                res.err = err.message
            } else if (results.affectedRows == 0) {
                res.err = "Không có xe nào đang gửi với mã phiếu này"
                list(req, res)
            } else {
                list(req, res)
            }
        })
}

module.exports = {
    list,
    choxevao,
    choxera,
}