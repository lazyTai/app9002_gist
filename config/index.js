const { env } = process;

const config = {
  host: env.HOST,
  port: env.PORT,
  qiniu_accessKey: env.qiniu_accessKey,
  qiniu_secretKey: env.qiniu_secretKey,
  qiniu_bucket: env.qiniu_bucket,
  jwtSecret: env.JWT_SECRET,
};
module.exports = config;
