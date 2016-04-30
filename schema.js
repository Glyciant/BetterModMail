var	config = require('./config'),
  thinky = require('thinky')({host:config.rethink.host, port:config.rethink.port, db: config.rethink.db}),
  r = thinky.r,
  type = thinky.type,
  Query = thinky.Query;

var schema = {};

schema.primarykey = {
  mail: "id",
  mute: "id"
};

schema.mail = {
  id: type.string(),
  tags: type.string(),
  assigned_to: type.string(),
  open: type.boolean(),
};

schema.mute = {
  id: type.string(),
  mod: type.string(),
  date: type.string(),
  reason: type.string()
}

module.exports = schema
