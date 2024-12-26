const app = require("fastify")({ logger: false });

const startServerAPI = () => {
  let teks = "API belum bisa digunakan, Sedang menghubungkan database";
  let linkAPi = "/api/:id";

  app.get(linkAPi, async (req, reply) => {
    reply.status(500).send(teks);
  });
  app.post(linkAPi, async (req, reply) => {
    reply.status(500).send(teks);
  });
  app.put(linkAPi, async (req, reply) => {
    reply.status(500).send(teks);
  });
  app.delete(linkAPi, async (req, reply) => {
    reply.status(500).send(teks);
  });

  app.listen({ port: process.env.PORT || 3000 }, (err, address) => {
    if (err) {
      app.log.error(err);
      process.exit(1);
    }
    app.log.info(`API server berjalan tanpa database! on ${address}`);
  });
};

const stopServerAPI = () => {
  app.close();
};

module.exports = { startServerAPI, stopServerAPI };
