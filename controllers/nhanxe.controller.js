const { pool } = require('../services/mysql')
const httpcat = require('../services/httpcat')
const nhanXeModel = require('../models/nhanxe.model')

function list(req, res) {
    nhanXeModel.getDSMoiVao((dsmoivao) => {
        nhanXeModel.getDSMoiRa((dsmoira) => {
            res.render('nhanxe', { err: res.err, danhsachnhanxe: dsmoivao,danhsachxuatxe: dsmoira, success: (req.query.dataSuccess || req.success || false), req: req });
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
                console.log(results)
                if (results.length == 0) {
                    nhanXeModel.insert(dataSent,
                        function (err) {
                            if (err) { // Nếu database báo lỗi thì show lỗi ra
                                res.render("nhanxe", { err: err.message, body: formData, req: req })
                            } else { // Ngược lại, redirect về trang chính
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
    function(err,results){
        if(err){
            res.err=err.message
        }else if (results.affectedRows == 0){
            res.err = "Không có xe nào đang gửi với mã phiếu này"
            list(req,res)
        }else{
            list(req,res)
        }
    })
}

module.exports = {
    list,
    choxevao,
    choxera,
}