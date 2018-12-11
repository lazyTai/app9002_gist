var knex = require('knex')({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'new_root',
        password: '12_Liumingtai',
        database: 'd_gist_9002'
    }
});
var knexTinyLogger = require('knex-tiny-logger').default
var NestHydrationJS = require('nesthydrationjs')();
knex.formate = (result, resultType) => {
    return NestHydrationJS.nest(result, resultType);
}
module.insertOrUpdate = (obj) => {

}
module.exports = knexTinyLogger(knex)