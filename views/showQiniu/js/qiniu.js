function getToken() {
    return axios.get('/file/qiniu-token')
        .then(function (response) {
            console.log(response);
            return response
        })
        .catch(function (error) {
            console.log(error);
        });
}