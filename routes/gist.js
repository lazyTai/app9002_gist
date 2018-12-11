const Joi = require('joi');
const { jwtHeaderDefine } = require('../utils/router-helper');
const GROUP_NAME = 'gist';
var GroupSchema = require('../schemas/group')
var GistSchema = require('../schemas/gist')
var db = require("../utils/db")
var { isDev } = require('../utils/env')

var resultType = [{
    id: "id", title: "title", content: "content", group_id: "group_id", label_id: "label_id",
    label: {
        id: { column: 't_label_id' },
        name: { column: 't_label_name' },
    }
}]
var columns = ["t_gist.id", "t_gist.title", "t_gist.content", "t_gist.group_id", "t_gist.label_id",]
module.exports = [
    {
        method: 'POST',
        path: `/api/${GROUP_NAME}`,
        handler: async (request, reply) => {
            var result = await db("t_gist").insert(request.payload.gist)
            if (result) {
                reply({ success: true, message: { id: result[0] } });
            } else {
                reply({ success: false });
            }

        },
        config: {
            auth: !isDev,
            tags: ['api', GROUP_NAME],
            validate: {
                payload: {
                    gist: GistSchema
                },
                ...jwtHeaderDefine,
            },
        },
    },
    {
        method: 'PUT',
        path: `/api/${GROUP_NAME}/{id}`,
        handler: async (request, reply) => {
            var result = await db('t_gist').update(request.payload.gist).where({ id: request.params.id })
            reply(result);
        },
        config: {
            auth: !isDev,
            tags: ['api', GROUP_NAME],
            validate: {
                params: {
                    id: Joi.number().required()
                },
                payload: {
                    gist: GistSchema.required()
                },
                ...jwtHeaderDefine,
            },
        },
    },
    {
        method: 'DELETE',
        path: `/api/${GROUP_NAME}/{id}`,
        handler: async (request, reply) => {
            var result = await db('t_gist').delete().where({ id: request.params.id })
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
        path: `/api/${GROUP_NAME}/get-one`,
        handler: async (request, reply) => {
            var sql = db('t_gist').select()
            if (request.query.title) {
                sql.andWhere("title", "like", `%${request.query.title}%`)
            }
            if (request.query.id) {
                sql.andWhere("id", request.query.id)
            }
            var result = await sql
            if (result.length > 0) {
                reply(result[0]);
            } else {
                reply(result)
            }

        },
        config: {
            jsonp: 'callback',
            auth: !isDev,
            tags: ['api', GROUP_NAME],
            validate: {
                query: {
                    title: Joi.string(),
                    id: Joi.number(),
                    callback: Joi.any(),
                    _t: Joi.any(),
                    _: Joi.any(),
                },
                ...jwtHeaderDefine,
            },
        },
    },
    {
        method: 'GET',
        path: `/api/${GROUP_NAME}/{id}`,
        handler: async (request, reply) => {
            var sql = db('t_gist').select()
            if (request.query.title) {
                sql.andWhere("title", "like", `%${request.query.title}%`)
            }
            if (request.params.id) {
                sql.andWhere("id", request.params.id)
            }
            var result = await sql
            if (result.length > 0) {
                reply(result[0]);
            } else {
                reply(result)
            }

        },
        config: {
            jsonp: 'callback',
            auth: !isDev,
            tags: ['api', GROUP_NAME],
            validate: {
                params: {
                    id: Joi.number(),
                },
                query: {
                    title: Joi.string(),
                    callback: Joi.any(),
                    _t: Joi.any(),
                    _: Joi.any(),
                },
                ...jwtHeaderDefine,
            },
        },
    },
    {
        method: 'GET',
        path: `/api/${GROUP_NAME}`,
        handler: async (request, reply) => {
            var sql = db('t_gist').select()
            if (request.query.title) {
                sql.andWhere("title", "like", `%${request.query.title}%`)
            }
            if (request.query.id) {
                sql.andWhere("id", request.query.id)
            }
            sql.leftJoin("t_label").on("t_label.id", "==", "t_gist.label_id")
                .groupBy("group_id")
            var result = await sql
            reply(result);
        },
        config: {
            auth: !isDev,
            tags: ['api', GROUP_NAME],
            validate: {
                query: {
                    title: Joi.string(),
                    id: Joi.number(),
                },
                ...jwtHeaderDefine,
            },
        },
    },
    {
        method: 'GET',
        path: `/api/${GROUP_NAME}/by-group-id`,
        handler: async (request, reply) => {
            var sql = db('t_gist').column(columns.concat([
                "t_label.id as  t_label_id ", "t_label.name  as t_label_name"
            ]))
                .select()
                .where('t_gist.group_id', request.query.groupId);
            if (request.query.title) {
                sql.where("t_gist.title", "like", `%${request.query.title}%`)
            }
            sql.leftJoin("t_label", { "t_label.id": "t_gist.label_id" })
            var result = await sql;
            result = db.formate(result, resultType)
            reply(result);
        },
        config: {
            auth: !isDev,
            tags: ['api', GROUP_NAME],
            validate: {
                query: {
                    title: Joi.string(),
                    groupId: Joi.string().required()
                },
                ...jwtHeaderDefine,
            },
        },
    },
];
