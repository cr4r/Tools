require("dotenv").config();
const fastify = require("fastify")({ logger: true });
//=====================================================================================//
const fView = require("@fastify/view");
const fStatic = require("@fastify/static");
const ejs = require("ejs");
const path = require("path");
//=====================================================================================//
const mongoose = require("mongoose");
const runAPINoDB = require("./sebelumStart");
// Session and cookie with mongo
const fastifyCors = require("@fastify/cors");
const fastifySession = require("@fastify/session");
const fastifyCookie = require("@fastify/cookie");
const fastifyFormbody = require("@fastify/formbody");
const fastifyMultipart = require("@fastify/multipart");

const maxCookie = 24 * 60 * 60 * 1000 * 360; // 360 hari

// const { AlitaRoutes } = require("./routes/alita.routes");

//=====================================================================================//
// function connect Database
const startDatabase = async () => {
  // Memulai server tanpa DB
  await runAPINoDB.startServerAPI();
  let status = false,
    i = 0;
  fastify.log.info(`Sedang mencoba menghubungkan database`);
  while (!status) {
    try {
      await mongoose.connect(process.env.MONGODB_URI, {
        serverSelectionTimeoutMS: 4000,
      });
      console.log("✔✔✔ Database sudah terhubung ✔✔✔");
      status = true;
    } catch (err) {
      // "Error!, Gagal terhubung ke database"
      console.log(`[${i}] Error!!! Gagal terhubung ke database, try again`);
    }
    i++;
  }
  // Stop server tanpa DB
  await runAPINoDB.stopServerAPI();
};
//=====================================================================================//

//=====================================================================================//
// register Form multipart
fastify.register(fastifyMultipart, {
  limits: {
    fileSize: 5 * 1024 * 1024, // Batasi ukuran file maksimum 5MB
  },
});
// Headers Handler
fastify.register(fastifyCors, {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"], // allow these methods
  headers: true, // allow headers
  credentials: true, // allow credentials,
  // exposedHeaders: ["Coders-Family"],
  bodyParser: {
    json: true,
  },
});

// register Form data parsing
fastify.register(fastifyFormbody);
// Setup Cookie dan Session
fastify.register(fastifyCookie);
fastify.register(fastifySession, {
  key: "user_sid",
  secret:
    "11b8efw5tfe8sfi97d44167606f848234defcea0c91cd899b9f6c33f8354e74ded09",
  cookie: {
    maxAge: maxCookie,
    secure: false,
  },
});
//=====================================================================================//

//=====================================================================================//
// Untuk Views
fastify.register(fView, {
  engine: {
    ejs: ejs,
  },
  root: path.join(__dirname, "views"),
  viewExt: "html",
  includeViewExtension: true,
});

// Untuk Style
fastify.register(fStatic, {
  root: path.join(__dirname, "public/assets"),
  prefix: "/assets/",
});
//=====================================================================================//

//=====================================================================================//
//Setup URL (Routing)
//
// fastify.register(AlitaRoutes, { prefix: root.url });
//=====================================================================================//

//=====================================================================================//
// Start database dan server
const start = async () => {
  try {
    // Menghubungkan database
    await startDatabase();
    // Memulai server
    await fastify.listen({
      address: "0.0.0.0",
      port: process.env.PORT || 3000,
    });
    fastify.log.info(
      `Server telah berjalan di port ${fastify.server.address().port}`
    );
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
//=====================================================================================//

//=====================================================================================//
// RUN Function
start();
//=====================================================================================//
