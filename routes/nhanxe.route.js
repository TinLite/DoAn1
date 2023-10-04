const express = require('express')
const router = express.Router()
const { pool } = require('../services/mysql')

router.get('/', (req, res) => {
    pool.query(
        'SELECT * FROM `gui`',
        function(err, results) {
            if(err){
                console.log(err)
            }else{
                res.render('nhanxe', {danhsachnhanxe: results })
            }
        }
    )
})

router.post('/', (req, res) => {
    var dataSent = req.body
    console.log(dataSent)
    if (dataSent.maphieu.trim().length == 0 ){ // Nếu người dung k nhập mã phiếu sẽ báo lỗi
        res.render("nhanxe",{err: "Không được phép để trống mã phiếu", body: dataSent})
    }else if (dataSent.soxe.trim().length == 0){ // Nếu người dùng k nhập số xe sẽ báo lỗi
        res.render("nhanxe",{err: "Không được phép để trống số xe", body: dataSent})
    }else{
        pool.execute("INSERT INTO `gui` (`Phieu`, `Soxe`, `Thoigianvao`) VALUES (?, ?, ?)",
        [dataSent.maphieu, dataSent.soxe, new Date().getTime()],
        function (err, results, fields) {
            if (err) {
                res.render("nhanxe", {err: err.message, body: dataSent })
            }else {
                res.redirect(req.baseUrl)
            }
        }
        )
    }
} )
module.exports = router