var qiniu_bucket = "allentai"

function getQiniuToken() {
    return axios.get('/file/qiniu-token').then(res => {
        return res.data['qiniu-token']
    })
}

function getQiniuFiles() {
    return getQiniuToken().then(token => {
        return axios({
            method: "GET",
            url: `http://rsf.qbox.me/list?bucket=${qiniu_bucket}&limit=1000`,
            headers: {
                "Content-Type": " application/x-www-form-urlencoded",
                authorization: token
            }
        }).then(res => {
            return res.data
        }).catch(e => {
            console.error(e)
        })
    })

}