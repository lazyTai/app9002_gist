const Hapi = require('hapi');
const hapiAuthJWT2 = require('hapi-auth-jwt2');
require('env2')('./.env');
const config = require('./config');

const pluginHapiSwagger = require('./plugins/hapi-swagger');
const pluginHapiAuthJWT2 = require('./plugins/hapi-auth-jwt2');


const routesIndex = require('./routes/index');
const routesUsers = require('./routes/users');
const routesFiles = require('./routes/file1');
const routesGroup = require('./routes/group');
const routesGist = require('./routes/gist');
const routesLabel = require('./routes/label');

const server = new Hapi.Server();
// 配置服务器启动host与端口
server.connection({
  port: config.port,
  host: config.host,
});

const init = async () => {
  // 注册插件
  await server.register([
    ...pluginHapiSwagger,
    hapiAuthJWT2,
  ]);
  pluginHapiAuthJWT2(server);
  // 注册路由
  server.route([
    ...routesLabel,
    ...routesGist,
    ...routesIndex,
    ...routesGroup,
    ...routesFiles,
    ...routesUsers,
  ]);
  // 启动服务
  await server.start();

  console.log(`Server running at: ${server.info.uri}`);
};

init();
