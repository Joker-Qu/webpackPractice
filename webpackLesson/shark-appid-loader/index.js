'use strict';
const loaderUtils = require('loader-utils')
module.exports = function(source) {
    const params = loaderUtils.parseQuery(this.query),
        callback = this.async(); // 异步解析模块
    if (typeof params === "object") {
        // 添加个人签名
        if (params.appID && typeof params.appID === "string") {
            source = source.replace(/<\/body>/,"<input type='hidden' id='shark-appid' style='display: none'>"+params.appID+"</input></body>");
        }
        callback(null, source); // 异步回调处理结果
    }
};