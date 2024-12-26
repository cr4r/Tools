const YoutubeModel = require("../../models/tools");
const { getReqParts, pecahString, handleServerResponse } = require("../umum");

const youtube_get = async (req, reply) => {
  return reply.status(200).send("Hallo ");
};

const youtube_post = async (req, reply) => {};

const youtube_put = async (req, reply) => {};

const youtube_delete = async (req, reply) => {};

module.exports = {
  youtube_get,
  youtube_post,
  youtube_put,
  youtube_delete,
};
