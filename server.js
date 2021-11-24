import Fastify from 'fastify';
const dotenv = require('dotenv');
dotenv.config();
console.log("env", process.env);
const isDev = process.env.ENV === "dev";
import getPromise from './valFromPromise';

const fastify = Fastify({
  logger: isDev
});

// Declare a route
fastify.get('/', function (request, reply) {
  reply.send({ hello: 'world' })
})


fastify.get('/test', function (request, reply) {
  reply.send({ hello: 'test' });

})

fastify.get('/testPromise', async (request, reply) => {
  const data = await getPromise();
  console.log("data", data);

  reply
    .code(200)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send(data.data);
});

// Run the server!
fastify.listen(process.env.PORT, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  // Server is now listening on ${address}
})
