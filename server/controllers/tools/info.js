const configFile = process.env.CONFIG_FILE;
const { tools, root } = require(configFile);
const Info = async (req, rep) => {
  return {
    viewIndex: "Tools/template/index",
    pesan: "",
    title: "Tools Youtube",
    logo: "",
    addScript: "",
    sidebar: "Tools Youtube",
    keyword: "",
    session: req.session,
    config: { tools, root },
    index: "index",
    ipServer: req.ip,
    script: false,
    css: false,
    akun: {
      nama: "Coders Family",
      email: "cr4rrr@gmail.com",
      start: "26/12/2024",
      role: "Admin IT",
      foto: "/assets/img/160x160/img0.jpg",
    },
  };
};
module.exports = {
  Info,
};
