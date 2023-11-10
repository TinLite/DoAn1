var fs = require('fs');
var mime = require('mime-types')

module.exports = {
    saveBase64Image: function(raw64Data, file_name, callback) {
        // https://stackoverflow.com/a/578862148

        var data = raw64Data.split(';base64,');
        // 0 = mime type
        // 1 = base64 data
        var extension = mime.extension(data[0]);
        fs.writeFile(
            `${process.env.UPLOAD_FOLDER}${file_name}.${extension}`,
            data[1],
            {encoding:'base64',},
            function (err) {
                callback(err, `${file_name}.${extension}`);
            }
        )
    }
}