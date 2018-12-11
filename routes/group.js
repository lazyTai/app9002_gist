const Joi = require('joi');
const { jwtHeaderDefine } = require('../utils/router-helper');
const GROUP_NAME = 'group';
var GroupSchema = require('../schemas/group')
var db = require("../utils/db")
var { isDev } = require('../utils/env')
module.exports = [
    {
        method: 'POST',
        path: `/api/${GROUP_NAME}`,
        handler: async (request, reply) => {
            var result = await db("t_group").insert(request.payload.group)
            if (result) {
                reply({ message: true });
            } else {
                reply({ message: false });
            }

        },
        config: {
            auth: !isDev,
            tags: ['api', GROUP_NAME],
            validate: {
                payload: {
                    group: GroupSchema
                },
                ...jwtHeaderDefine,
            },
        },
    },
    {
        method: 'PUT',
        path: `/api/${GROUP_NAME}/{groupId}`,
        handler: async (request, reply) => {
            var result = await db('t_group').update(request.payload.group).where({ id: request.params.groupId })
            reply(result);
        },
        config: {
            auth: !isDev,
            tags: ['api', GROUP_NAME],
            validate: {
                params: {
                    groupId: Joi.number().required()
                },
                payload: {
                    group: GroupSchema.required()
                },
                ...jwtHeaderDefine,
            },
        },
    },
    {
        method: 'DELETE',
        path: `/api/${GROUP_NAME}/{groupId}`,
        handler: async (request, reply) => {
            var result = await db('t_group').delete().where({ id: request.params.groupId })
            reply(result);
        },
        config: {
            auth: !isDev,
            tags: ['api', GROUP_NAME],
            validate: {
                params: {
                    groupId: Joi.number().required()
                },
                ...jwtHeaderDefine,
            },
        },
    },
    {
        method: 'GET',
        path: `/api/${GROUP_NAME}`,
        handler: async (request, reply) => {
            var query = db('t_group').select();
            if (request.query.name) {
                query = query.andWhere("name", "like", `%${request.query.name}%`)
            }
            if (request.query.id) {
                query = query.andWhere("id", request.query.id)
            }
            var result = await query;
            reply(result);
        },
        config: {
            auth: !isDev,
            tags: ['api', GROUP_NAME],
            validate: {
                query: {
                    name: Joi.string(),
                    id: Joi.number(),
                },
                ...jwtHeaderDefine,
            },
        },
    },
    {
        method: 'GET',
        path: `/api/${GROUP_NAME}/{id}`,
        handler: async (request, reply) => {
            var query = db('t_group').select();
            if (request.query.name) {
                query = query.andWhere("name", "like", `%${request.query.name}%`)
            }
            if (request.params.id) {
                query = query.andWhere("id", request.params.id)
            }
            var result = await query;
            if (result.length >= 0) {
                reply(result[0]);
            } else {
                reply({});
            }

        },
        config: {
            auth: !isDev,
            tags: ['api', GROUP_NAME],
            validate: {
                query: {
                    name: Joi.string(),
                },
                params:{
                    id: Joi.number(),
                },
                ...jwtHeaderDefine,
            },
        },
    },
];
