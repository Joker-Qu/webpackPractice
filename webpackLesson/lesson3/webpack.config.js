var path = require('path')
HtmlWebpackPlugin = require('html-webpack-plugin')
ExtractTextPlugin = require('extract-text-webpack-plugin')//抽取css
webpack = require('webpack')
module.exports = {
    entry:process.env.NODE_ENV === 'production' ? './webpack.entry.js'
        :[
            'webpack-dev-server/client?http://localhost:8080',
            'webpack/hot/only-dev-server',
            './webpack.entry.js'
        ],
    output: {
        filename: 'webpack.bundle.js',
        path: path.resolve(__dirname, './bulid'),
        // 声明资源（js、css、图片等）的引用路径
        // webpack打包时会把html页面上的相对路径根据publicPath解析成绝对路径
        // eg：当publicPath为'https://jd.com/'时，如果有html或者css含有一张图片相对路径为'./img/test.jpg',打包之后html（或css）中图片的路径就会变成'https://jd.com/img/test.jpg'
        publicPath: ''
    },
    context: __dirname,
    module: {
        rules: [
            {
                test: /\.css$/,
                use:process.env.NODE_ENV === 'production' ? ExtractTextPlugin.extract({
                    fallback:"style-loader",
                    use:"css-loader"
                }): ['style-loader','css-loader?sourceMap']
            },
            {
                test:/\.(jpg|png)$/,
                use:['url-loader?limit=10000&name=img/[name].[ext]']
            },
            {
                test:/\.html$/,
                use:['html-loader']
            }
        ]
    },
    plugins: process.env.NODE_ENV === 'production' ? [
        new HtmlWebpackPlugin({
            template:'./src/index.html',
            filename:'index.html'
        }),
        new ExtractTextPlugin('style.css'),
        new webpack.DefinePlugin({'NODE_ENV':JSON.stringify(process.env.NODE_ENV)})
    ]:[
        new HtmlWebpackPlugin({
            template:'./src/index.html',
            filename:'index.html'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.DefinePlugin({'NODE_ENV':JSON.stringify(process.env.NODE_ENV)})
    ],
    devServer:{
        contentBase:path.resolve(__dirname,'src'),
        hot:true,
        noInfo:false
    },
    devtool: 'source-map'
}