var config = require("./config")

var isMod = function(username) {
  return config.app.mods.indexOf(username) > -1;
}

module.exports = {
  isMod: isMod
}
