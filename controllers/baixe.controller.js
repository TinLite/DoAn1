const { pool } = require('../services/mysql')
const httpcat = require('../services/httpcat')

/**
 * GET /
 * Danh sách bãi
 */
function list(req, res) {
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
}

/**
 * POST /
 * Thêm bãi mới
 */
function insert(req, res) {
    var formData = req.body;
    if (formData.tenbai.trim().length == 0) {
        res.render("bai-list", { err: "Tên bãi không được để trống", body: formData })
    } else {
        pool.execute("INSERT INTO `bai` (`Tenbai`,`Vitri`) VALUES (?, ?)", // Như trên, ở đây có 3 dấu ? thì nó sẽ lấy lần lượt 3 phần tử thay vào
            [formData.tenbai, formData.vitri],
            function (err, results, fields) {
                if (err) { // Nếu database báo lỗi thì show lỗi ra
                    res.render("bai-list", { err: err.message, body: formData })
                } else { // Ngược lại, redirect về trang chính
                    req.query["dataSuccess"] = true
                    list(req, res)
                }
            }
        )
    }
}

/**
 * GET detail/:mabai
 * Xem chi tiết bãi
 */
function detail(req, res) {
    var mabai = parseInt(req.params.mabai.trim())
    if (!mabai) {
        httpcat(res, 400)
    } else {
        pool.execute(
            'SELECT * FROM `Bai` WHERE `mabai` = ?', // Nó sẽ dùng các phần tử trong mảng ở dưới thay thế vào hỏi chấm ở trên
            [mabai],
            function (err, results, fields) {
                if (results.length == 0) {
                    httpcat(res, 204)
                } else {
                    res.render("bai-edit", results[0])
                }
            }
        )
    }
}

/**
 * POST /detail/:mabai
 * Cập nhật bãi
 */
function update(req, res) {
    
}

module.exports = {
    list,
    insert,
    detail,
    update
}