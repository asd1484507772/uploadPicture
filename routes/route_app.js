'use strict';
const {
    json
} = require('body-parser');
var path = require('path');
var config = require('../config');
var multer = require('multer');
var upload = multer({
    dest: 'uploads/'
});

module.exports = function(app) {

    //添加图片信息
    app.post('/api/v1/pictures', upload.single('file'), function(req, res, next) {
        //返回路径
        return res.status(200).send({
            url: "http://localhost:3000/" + req.file.filename
        });

    });

    app.use('/*', function(req, res, next) {
        return res.status(200).json({
            status: 'not found',
            data: '404'
        });
    });
};