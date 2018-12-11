var {createQiniuToken, getQiniuFiles} = require("../utils/file");
const Joi = require('joi');
const {jwtHeaderDefine, isDev} = require('../utils/router-helper');

const GROUP_NAME = 'file';


module.exports = [
    {
        method: 'POST',
        path: `/${GROUP_NAME}/upload-file`,
        handler: async (request, reply) => {
            reply();
        },
        config: {
            auth: !isDev,
            tags: ['api', GROUP_NAME],
            description: "上传文件",
            validate: {
                payload: {
                    file: Joi.any()
                        .meta({swaggerType: 'file'})
                        .description('json file')
                },
                ...jwtHeaderDefine,
            },
            payload: {
                maxBytes: 1048576,
                parse: true,
                output: 'stream'
            },
        },
    },
    {
        method: 'GET',
        path: `/${GROUP_NAME}/qiniu-token`,
        handler: async (request, reply) => {
            reply({
                "qiniu-token": createQiniuToken()
            });
        },
        config: {
            auth: !isDev,
            tags: ['api', GROUP_NAME],
            description: "获取七牛上传token",
            validate: {
                ...jwtHeaderDefine,
            },
            response: {
                schema: Joi.object({
                    "qiniu-token": Joi.string().default("xxx-xxx-xxx")
                })
            }
        },
    },
    {
        method: 'GET',
        path: `/${GROUP_NAME}/get-qiniu-files`,
        handler: async (request, reply) => {

            var files = await  getQiniuFiles()
            reply({
                files
            });
        },
        config: {
            auth: !isDev,
            tags: ['api', GROUP_NAME],
            description: "获取七牛所有的files",
            validate: {
                ...jwtHeaderDefine,
            }
        },
    },
];
