var Fastify = require('fastify');
var fastify = Fastify()
const { categories } = require('./routes/categories');
const { stats } = require('./routes/stats');

fastify.get('/pie', categories)
fastify.get('/stats', stats)

fastify.listen({
    host: "::",
    port: 4000
});
