var Fastify = require('fastify');
var fastify = Fastify()
const { categories } = require('./routes/categories');

fastify.get('/', categories)

fastify.listen(8080);