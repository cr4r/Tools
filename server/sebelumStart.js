const startServerAPI = async (app) => {
  let teks = "Saat ini belum ada halaman website";
  let linkAPi = "/:id?";
  try {
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

    //// Memulai server
    await app.listen({ address: "0.0.0.0", port: process.env.PORT || 3000 });
    app.log.info(`Server telah berjalan di port ${app.server.address().port}`);
    return { apps: app, status: true, message: "Berhasil menjalankan server" };
  } catch (err) {
    app.log.info(err);
    return { status: false, message: err };
  }
};

const stopServerAPI = (app) => {
  app.close();
};

module.exports = { startServerAPI, stopServerAPI };
