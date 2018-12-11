const Joi = require('joi');
const { jwtHeaderDefine } = require('../utils/router-helper');
const GROUP_NAME = 'label';
var Schema = require('../schemas/label')
var db = require("../utils/db")
var { isDev } = require('../utils/env')
module.exports = [
    {
        method: 'POST',
        path: `/api/${GROUP_NAME}`,
        handler: async (request, reply) => {
            var result = await db("t_label").insert(request.payload.label)
            if (result) {
                var result1 = await db("t_label").select().where({ id: result[0] })
                reply({ success: true, message: result1[0] });
            } else {
                reply({ success: false });
            }

        },
        config: {
            auth: !isDev,
            tags: ['api', GROUP_NAME],
            validate: {
                payload: {
                    label: Schema
                },
                ...jwtHeaderDefine,
            },
        },
    },
    {
        method: 'PUT',
        path: `/api/${GROUP_NAME}/{labelId}`,
        handler: async (request, reply) => {
            var result = await db('t_label').update(request.payload.label).where({ id: request.params.labelId })
            reply(result);
        },
        config: {
            auth: !isDev,
            tags: ['api', GROUP_NAME],
            validate: {
                params: {
                    labelId: Joi.number().required()
                },
                payload: {
                    label: Schema.required()
                },
                ...jwtHeaderDefine,
            },
        },
    },
    {
        method: 'DELETE',
        path: `/api/${GROUP_NAME}/{id}`,
        handler: async (request, reply) => {
            var result = await db('t_label').delete().where({ id: request.params.id })
            reply(result);
        },
        config: {
            auth: !isDev,
            tags: ['api', GROUP_NAME],
            validate: {
                params: {
                    id: Joi.number().required()
                },
                ...jwtHeaderDefine,
            },
        },
    },
    {
        method: 'GET',
        path: `/api/${GROUP_NAME}`,
        handler: async (request, reply) => {
            var query = db('t_label').select();
            if (request.query.name) {
                query = query.andWhere("name", "like", `%${request.query.name}%`)
            }
            if (request.query.groupId) {
                query = query.andWhere("group_id", request.query.groupId)
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
                    groupId: Joi.number(),
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
            var query = db('t_label').select();
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
                params: {
                    id: Joi.number(),
                },
                ...jwtHeaderDefine,
            },
        },
    },
    {
        method: 'GET',
        path: `/api/${GROUP_NAME}/one`,
        handler: async (request, reply) => {
            var query = db('t_label').select();
            if (request.query.name) {
                query = query.andWhere("name", `${request.query.name}`)
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
                    id: Joi.number(),
                },
                ...jwtHeaderDefine,
            },
        },
    },
];
