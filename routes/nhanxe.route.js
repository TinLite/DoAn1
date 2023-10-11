const express = require('express')
const router = express.Router()
const { pool } = require('../services/mysql')
const nhanxeController = require('../controllers/nhanxe.controller')

router.get('/', nhanxeController.list)
router.post('/', (req, res) => {
    var dataSent = req.body
    if (dataSent.maphieu.trim().length == 0) { // Nếu người dung k nhập mã phiếu sẽ báo lỗi
        res.render("nhanxe", { err: "Không được phép để trống mã phiếu", body: dataSent, req: req })
    } else if (dataSent.soxe.trim().length == 0) { // Nếu người dùng k nhập số xe sẽ báo lỗi
        res.render("nhanxe", { err: "Không được phép để trống số xe", body: dataSent, req: req })
    } else {
        pool.execute('SELECT * FROM `gui` WHERE (`Phieu` = ? OR `Soxe` = ?) AND `Thoigianra` IS NULL LIMIT 1',
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
})
module.exports = router