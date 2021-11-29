import fastify from 'fastify'
import mockApi from './mockApi';

const server = fastify();

server.get('/start', async (request, reply) => {
  const data = await mockApi();
  return data;
})

server.listen(8080, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})