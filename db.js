var	config = require('./config'),
  schema = require('./schema'),
  thinky = require('thinky')({host:config.rethink.host, port:config.rethink.port, db: config.rethink.db}),
	r = thinky.r,
	type = thinky.type,
	Query = thinky.Query,
  MailModel = thinky.createModel('mail', schema.mail, schema.primarykey.mail);
  MuteModel = thinky.createModel('mute', schema.mute, schema.primarykey.mute);

var mail = {
  getTags: (ids) => {
    return new Promise((resolve, reject) => {
      MailModel.filter(function(doc) {return r.expr(ids).contains(doc('id'))}).run().then((db) => {
        resolve(db)
      })
    })
  },
  getAssignedTo: (ids) => {
    return new Promise((resolve, reject) => {
      MailModel.filter(function(doc) {return r.expr(ids).contains(doc('id'))}).run().then((db) => {
        resolve(db)
      })
    })
  },
  getStatus: (ids) => {
    return new Promise((resolve, reject) => {
      MailModel.filter(function(doc) {return r.expr(ids).contains(doc('id'))}).run().then((db) => {
        resolve(db)
      })
    })
  },
  create: (array) => {
    return new Promise((resolve, reject) => {
      MailModel.insert(array).run().then((db) => {
        resolve(db)
      })
    })
  },
  updateTags: (object) => {
    return new Promise((resolve, reject) => {
      MailModel.filter({id: object.id}).update({tags: object.tags}).then((db) => {
        resolve(db)
      })
    })
  },
  updateAssigned_to: (object) => {
    return new Promise((resolve, reject) => {
      MailModel.filter({id: object.id}).update({assigned_to: object.user}).then((db) => {
        resolve(db)
      })
    })
  },
  updateStatus: (object) => {
    return new Promise((resolve, reject) => {
      MailModel.filter({id: object.id}).update({open: object.open}).then((db) => {
        resolve(db)
      })
    })
  }
}

var mute = {
  add: (object) => {
    return new Promise((resolve, reject) => {
      MuteModel.insert(object).run().then((db) => {
        resolve(db)
      });
    })
  },
  remove: (id) => {
    return new Promise((resolve, reject) => {
      MuteModel.filter({id: id}).delete().run().then((db) => {
        resolve(db)
      });
    })
  },
  get: () => {
    return new Promise((resolve, reject) => {
      MuteModel.then((db) => {
        resolve(db)
      });
    })
  }
}

module.exports = {
  mail: mail,
  mute: mute
}
