const throwError = (res, code) => {
    res.status(code)
    res.send("<!DOCTYPE html><body style=\"background-color: black;\"><img src=\"https://http.cat/400.jpg\"></body></html>")
}

module.exports = throwError