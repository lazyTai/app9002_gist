const JWT = require('jsonwebtoken');
const config = require('../config');
const Joi = require('joi')
const GROUP_NAME = 'users';

module.exports = [{
  method: 'POST',
  path: `/${GROUP_NAME}/createJWT`,
  handler: async (request, reply) => {
    const generateJWT = (jwtInfo) => {
      const payload = {
        userId: jwtInfo.userId,
        exp: Math.floor(new Date().getTime() / 1000) + 7 * 24 * 60 * 60,
      };
      return JWT.sign(payload, config.jwtSecret);
    };
    // 前台传来的userid
    reply({
      token: generateJWT({
        userId: request.payload.userId,
      })
    });
  },
  config: {
    tags: ['api', GROUP_NAME],
    description: '用于测试的用户 JWT 签发',
    auth: false, // 约定此接口不参与 JWT 的用户验证，会结合下面的 hapi-auth-jwt 来使用
    validate: {
      payload: {
        userId: Joi.number()
          .required()
          .description('the first number'),
      }
    },
    response: {
      schema: Joi.object({
        token: Joi.string().default('xxx.xxx.xxx'),
      })
    }
  },
}];
