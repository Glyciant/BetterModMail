var	config = require('./config'),
  thinky = require('thinky')({host:config.rethink.host, port:config.rethink.port, db: config.rethink.db}),
  r = thinky.r,
  type = thinky.type,
  Query = thinky.Query;

var schema = {};

schema.primarykey = {
  mail: "id",
};

schema.mail = {
  id: type.string(),
  tags: type.string(),
  assigned_to: type.string(),
  author: type.string(),
  subject: type.string(),
  body: type.string(),
  open: type.boolean(),
  date: type.number(),
};

module.exports = schema
