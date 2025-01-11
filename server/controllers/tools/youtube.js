const YoutubeModel = require("../../models/tools");
const { getReqParts, pecahString, handleServerResponse } = require("../umum");
const { Info } = require("./info");

const viewIndex = "Tools/template/index";

const youtube_get = async (req, reply) => {
  let info = await Info(req, reply);
  info.viewIndex = viewIndex;
  info.index = "youtube";
  info.script = "youtube";
  info.sidebar = "Tools Youtube";
  info.css = ["cssCustom"];
  return reply.view(info.viewIndex, { info });
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
