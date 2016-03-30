var express = require('express'),
	config = require('./config'),
	helpers = require('./helpers'),
	schema = require('./schema'),
	db = require('./db'),
	bodyParser = require('body-parser'),
	app = express(),
	session = require('express-session'),
	cookieParser = require('cookie-parser'),
	swig = require('swig'),
	swigExtras = require('swig-extras'),
	restler = require('restler');

swigExtras.useTag(swig, 'markdown');
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/views/static'));
app.use(cookieParser());
app.use(session({secret: 'anything', resave: false, saveUninitialized: false}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.set('view cache', false);
swig.setDefaults({cache: false});

app.locals = {
	authurl: config.auth.authurl
};

/* GETS */
app.get('*', function(req, res, next) {
	app.locals.loggedin = req.session.name;
	next();
});

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/auth/login/', function(req, res) {
	restler.post('https://www.reddit.com/api/v1/access_token', {
		username: config.auth.cid,
		password: config.auth.secret,
		data: {
			code: req.query.code,
			grant_type: 'authorization_code',
			redirect_uri: config.auth.redirect
		}
	}).on('complete', function(data) {
		restler.get('https://oauth.reddit.com/api/v1/me', {
			'headers': {
				'User-Agent': 'BetterModMail',
				'Authorization': 'bearer ' + data.access_token
			}
		}).on('complete', function(finaldata) {
			req.session.name = finaldata.name
			req.session.auth = data.access_token
			res.redirect('/')
		});
	});
});
app.get('/auth/logout', function(req, res) {
	req.session.destroy(function() {
		res.redirect('/');
	});
});
app.get('*', function(req, res, next) {
	if (!app.locals.loggedin) {
		res.render('error', {title: "Unauthorized", body: "You must login to access this page."})
	}
	else {
		if (helpers.isMod(app.locals.loggedin) == true) {
			next();
		}
		else {
			res.render('error', {title: "Unauthorized", body: "You do not have permission to access this page."})
		}
	}
});

app.get('/mail/:user/:status', function(req, res) {
	restler.get('https://oauth.reddit.com/message/moderator', {
		'headers': {
			'User-Agent': 'BetterModMail',
			'Authorization': 'bearer ' + req.session.auth
		}
	}).on('complete', function(data) {
		var idtags = [];
				postArray = [];
				repliesArray = [];
		for(var i in data.data.children) {
			if (data.data.children[i].data.dest == "#Twitch") {
			  idtags.push(data.data.children[i].data.name);
				var postObject = {
					id: data.data.children[i].data.name,
					date: data.data.children[i].data.created_utc,
					open: true,
					assigned_to: '[None]',
					tags: '[None]'
				}
				if (data.data.children[i].data.replies.data) {
					repliesArray.push(postObject.id)
				}
				postArray.push(postObject)
			}
		}
		db.mail.create(postArray)
		Promise.all([db.mail.getTags(idtags), db.mail.getAssignedTo(idtags), db.mail.getStatus(idtags)]).then(function(db) {
		  var mail = [];
		  for(var i in data.data.children) {
				if (data.data.children[i].data.dest == "#Twitch") {
					var elementPos = db[0].map(function(x) { return x.id; }).indexOf(data.data.children[i].data.name);
					if (repliesArray.indexOf(data.data.children[i].data.name) > -1) {
						var replies = data.data.children[i].data.replies.data.children
					}
					else {
						var replies = []
					}
					var dataobject = {
			      id: data.data.children[i].data.name,
						subject: data.data.children[i].data.subject,
						body: data.data.children[i].data.body,
						author: data.data.children[i].data.author,
						date: data.data.children[i].data.created_utc,
			      tags: db[0][elementPos].tags,
			      assigned_to: db[0][elementPos].assigned_to,
			      open: db[0][elementPos].open,
						replies: replies
					}
					if ((req.params.status == "all") || (req.params.status == "open" && dataobject.open == true) || (req.params.status == "closed" && dataobject.open == false)) {
						if ((req.params.user == "all") || (req.params.user == "me" || dataobject.assigned_to == app.locals.loggedin)) {
							mail.push(dataobject);
						}
					}
				}
		  }
		  res.render('mail', {mail: mail})
		})
	});
});

// Posts
app.post('/data/tags', function(req,res) {
	db.mail.updateTags(req.body)
})

app.post('/data/assigned_to', function(req,res) {
	db.mail.updateAssigned_to(req.body)
})

app.post('/data/open', function(req,res) {
	req.body.open = (req.body.open == "true")
	db.mail.updateStatus(req.body)
})

// GET 404
app.get('*', function(req, res, next) {
	res.render('error', {title: "Error 404", body: "That page was not found."});
});

var server = app.listen(config.app.port, function() {
	console.log('Listening on: ' + config.app.port);
});
