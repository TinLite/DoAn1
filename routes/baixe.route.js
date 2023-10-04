const express = require('express')
const router = express.Router()
const { pool } = require('../services/mysql')
const httpcat = require('../services/httpcat')

router.get('/', (req, res) => {
    res.redirect(req.baseUrl + "/danhsach");
})

router.get('/danhsach/', (req, res) => {
    pool.query(
        'SELECT * FROM `Bai`',
        function (err, results) {
            if (err) {
                console.error(err);
            } else {
                res.render('bai-list', { danhsachbai: results, success: (req.query.dataSuccess || false), req: req });
            }
        }
    );
})

//
router.route('/them').get((req, res) => {
    res.render("bai-add")
}).post((req, res) => {
    var formData = req.body;
    if (formData.mabai.trim().length == 0) { // Kiểm tra xem mã bãi có để trống hay không
        res.render("bai-add", { err: "Mã bãi không được phép để trống", body: formData })
    } else if (formData.mabai.trim().length > 10) { // Kiểm tra xem mã bãi dài hơn 10 kí tự?
        res.render("bai-add", { err: "Mã bãi không được dài quá 10 kí tự", body: formData })
    } else {
        // Kiểm tra xem mã bãi đã tồn tại trong hệ thống
        pool.execute(
            'SELECT * FROM `Bai` WHERE `mabai` = ?', // Nó sẽ dùng các phần tử trong mảng ở dưới thay thế vào hỏi chấm ở trên
            [formData.mabai],
            function (err, results, fields) {
                if (results.length != 0) { // Nếu lệnh select ra != 0 (Tức là đã query ra được cột này trong hệ thống, thì báo lỗi)
                    res.render("bai-add", { err: "Mã bãi này đã tồn tại trong hệ thống.", body: formData })
                } else {
                    pool.execute("INSERT INTO `bai` (`Mabai`,`Tenbai`,`Vitri`) VALUES (?, ?, ?)", // Như trên, ở đây có 3 dấu ? thì nó sẽ lấy lần lượt 3 phần tử thay vào
                        [formData.mabai, formData.tenbai, formData.vitri],
                        function (err, results, fields) {
                            if (err) { // Nếu database báo lỗi thì show lỗi ra
                                res.render("bai-add", { err: err.message, body: formData })
                            } else { // Ngược lại, redirect về trang chính
                                res.redirect(req.baseUrl + "/danhsach?dataSuccess=true")
                            }
                        }
                    )
                }
            }
        )
    }
})

router.route("/detail/:mabai?").get((req, res) => { //
    if (!req.params.mabai || req.params.mabai.trim().length == 0) {
        httpcat(res, 400)
    } else {
        pool.execute(
            'SELECT * FROM `Bai` WHERE `mabai` = ?', // Nó sẽ dùng các phần tử trong mảng ở dưới thay thế vào hỏi chấm ở trên
            [req.params.mabai],
            function (err, results, fields) {
                if (results.length == 0) {
                    httpcat(res, 204)
                } else {
                    res.render("bai-edit", results[0])
                }
            }
        )
    }
})

module.exports = router