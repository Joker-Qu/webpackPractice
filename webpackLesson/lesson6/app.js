const fs = require('fs')
path = require('path')
gutil = require('gulp-util')
webpack = require('webpack')
webpackDevServer = require('webpack-dev-server')
webpack_config = require('./webpack.config')
Mock = require('mockjs')
Random = Mock.Random
express = require('express')
app = express()

const compiler = webpack(webpack_config('development'))
new webpackDevServer(compiler,{
    stats: {
        color:true,
        chunks:false
    },
    noInfo:false,
    proxy:{
        '*':{
            target:'http://localhost:3000'
        }
    }
}).listen(8080,function () {
    console.log('listening 8080')
})
app.get('/mockData',function (req,res,next) {
    let template = {
        "string|1-10": "★",
        "number|123.10": 1.123,
        'regexp': /[a-z][A-Z][0-9]/,
        'date': Random.date('yyyy-MM-dd'),
        'image': Random.image(),
        'paragraph': Random.cparagraph()
    };
    let generateData = Mock.mock(template);
    res.send(generateData);
    next();
});
app.get('/build',
    function(req, res, next) {
        webpack(webpack_config('production'),
            function(err, stats) {
                gutil.log('[webpack:build]', stats.toString({
                    chunks: false,
                    colors: true
                }));
                if (err) {
                    throw new gutil.PluginError('webpack:build', err);
                }
                res.send({
                    success: true
                });
                next();
            });
    });
// 监听3000端口
app.listen(3000,
    function() {
        console.log('Proxy Server is running on port 3000!');
    });