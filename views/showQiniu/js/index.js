var app2 = new Vue({
    el: '#app',
    data: {
        token: "",
        message: '页面加载于 ' + new Date().toLocaleString()
    },
    methods: {
        uploadFile() {
            var file = this.$refs.myfile.files[0]
            uploadFileFetch.call(this, file).then(res => {
            })
        }
    },
    mounted() {
        var self = this;
        getQiniuFiles().then(res => {
            debugger
        })
    }
})