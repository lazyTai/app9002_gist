var path = require('path')
var {qiniu_accessKey, qiniu_secretKey, qiniu_bucket} = require("../config")
var qiniu = require("qiniu")
var axios = require('axios')

function resolve(str) {
    return path.resolve(__dirname, '../', str)
}

function createQiniuToken() {
    var mac = new qiniu.auth.digest.Mac(qiniu_accessKey, qiniu_secretKey);
    var options = {
        scope: qiniu_bucket,
        returnBody: '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","name":"$(x:name)"}'
    }
    var putPolicy = new qiniu.rs.PutPolicy(options);
    var uploadToken = putPolicy.uploadToken(mac);
    return uploadToken
}

function getQiniuFiles() {
    var token = createQiniuToken();
    return axios({
        method: "GET",
        url: `http://rsf.qbox.me/list?bucket=${qiniu_bucket}&limit=1000`,
        data: {
            token: token,
        },
        headers: {
            "Content-Type": " application/x-www-form-urlencoded",
            Authorization: token
        }
    }).then(res => {
        return res.data
    }).catch(e => {
        console.error(e.response.data)
    })

}

module.exports = {resolve, createQiniuToken, getQiniuFiles}