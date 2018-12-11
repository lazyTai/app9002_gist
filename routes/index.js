const {jwtHeaderDefine} = require('../utils/router-helper');
const {resolve} = require('../utils/file');

module.exports = [
    /*===============static*/
    {
        method: 'GET',
        path: '/static/{file*}',
        handler: (request, reply) => {
            var file = resolve(`./views/${request.params.file}`)
            return reply.file(file);
        },
        config: {
            auth: false,
            tags: ['api', 'views'],
            description: 'render html',
        },
    },
    {
        method: 'GET',
        path: '/',
        handler: (request, reply) => {
            reply.file(resolve('./views/index.html'))
        },
        config: {
            auth: false,
            tags: ['api', 'tests'],
            description: '测试hello-hapi',
            validate: {
                ...jwtHeaderDefine, // 增加需要 jwt auth 认证的接口 header 校验
            },
        },
    },
];
