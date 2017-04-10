const express = require('express'),
      session = require('express-session'),
      bodyParser = require('body-parser'),
      massive = require('massive'),
      passport = require('passport'),
      // LocalStrategy = require('passport-local').Strategy,
      FacebookStrategy = require('passport-facebook').Strategy,
      config = require('./config.js'),
      cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'keyboardcat'
}))
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('./public'));



/////////////
// DATABASE //
/////////////
const massiveInstance = massive.connectSync({connectionString: 'postgres://localhost/sandbox'})

app.set('db', massiveInstance);
const db = app.get('db');

// db.create_user(function(err, user) {
//   if (err) console.log(err);
//   else console.log('CREATED USER');
//   console.log(user);
// })



passport.use(new FacebookStrategy({
  clientID: config.facebook.clientID,
  clientSecret: config.facebook.clientSecret,
  callbackURL: "http://localhost:3000/auth/facebook/callback",
  profileFields: ['id', 'displayName']
},
function(accessToken, refreshToken, profile, cb) {
  db.getUserByFacebookId([profile.id], function(err, user) {
    user = user[0];
    if (!user) {
      console.log('CREATING USER');
      db.createUserFacebook([profile.displayName, profile.id], function(err, user) {
        console.log('USER CREATED', user);
        return cb(err, user);
      })
    } else {
      return cb(err, user);
    }
  })
}));

passport.serializeUser(function(user, done) {
  done(null, user.userid);
})

passport.deserializeUser(function(id, done) {
  db.getUserById([id], function(err, user) {
    user = user[0];
    if (err) console.log(err);
    else console.log('RETRIEVED USER');
    console.log(user);
    done(null, user);
  })
})


app.get('/auth/facebook', passport.authenticate('facebook'))

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', {successRedirect: '/' }), function(req, res) {
    res.status(200).send(req.user);
  })

app.get('/auth/me', function(req, res) {
  if (!req.user) return res.sendStatus(404);
  res.status(200).send(req.user);
})

app.get('/auth/logout', function(req, res) {
  req.logout();
  res.redirect('/');
})


//endpoints for sql
// db.schema(function(err, data) {
//   if (err) console.log(err);
//   else console.log("All tables successfully reset")
// })

//feed
app.get('/getNewFeed/:id'), function (req, res) {
db.feed.get_new_feed([req.params.id], (err, result) => {
if (err) return console.log(err)
else res.send(result)
})
}
//login
app.get('/getIfNewFriends/:id/:fb_id'), function (req, res) {
db.login.get_if_new_friends([req.params.id], (err, result) => {
if (err) return console.log(err)
else res.send(result)
})
}

app.get('/getIfUserExists/:id'), function (req, res) {
db.login.get_if_user_exists([req.params.id], (err, result) => {
if (err) return console.log(err)
else res.send(result)
})
}

app.post('/postNewUserInfo/:id'), function (req, res) {
db.login.post_new_user_info(
	[
		req.params.fb_id,
		req.params.first_name,
		req.params.last_name
	], (err, result) => {
if (err) return console.log(err)
else res.send(result)
})
}

//movie
app.get('/getReviews/:id'), function (req, res) {
db.movie.get_reviews([req.params.id], (err, result) => {
if (err) return console.log(err)
else res.send(result)
})
}

app.get('/getStats/:id'), function (req, res) {
db.movie.get_stats([req.params.id], (err, result) => {
if (err) return console.log(err)
else res.send(result)
})
}

app.delete('/getReviews/:id'), function (req, res) {
db.movie.get_reviews([req.params.id], (err, result) => {
if (err) return console.log(err)
else res.send(result)
})
}

app.delete('/getReviews/:id'), function (req, res) {
db.movie.get_reviews([req.params.id], (err, result) => {
if (err) return console.log(err)
else res.send(result)
})
}

app.delete('/getReviews/:id'), function (req, res) {
db.movie.get_reviews([req.params.id], (err, result) => {
if (err) return console.log(err)
else res.send(result)
})
}

app.delete('/getReviews/:id'), function (req, res) {
db.movie.get_reviews([req.params.id], (err, result) => {
if (err) return console.log(err)
else res.send(result)
})
}

app.delete('/getReviews/:id'), function (req, res) {
db.movie.get_reviews([req.params.id], (err, result) => {
if (err) return console.log(err)
else res.send(result)
})
}

app.post('/postFav/:id'), function (req, res) {
db.movie.post_fav(
	[
		req.params.id,
		req.params.movie_id,
		req.params.user_id
	], (err, result) => {
if (err) return console.log(err)
else res.send(result)
})
}

app.post('/postRecommendations/:id'), function (req, res) {
db.movie.post_recommendations(
	[
		req.params.id,
		req.params.movie_id,
		req.params.user_id
	], (err, result) => {
if (err) return console.log(err)
else res.send(result)
})
}

app.post('/postReviewTitle/:id'), function (req, res) {
db.movie.post_review_title(
	[
		req.params.id,
		req.params.comment_title,
		req.params.movie_id,
		req.params.user_id
	], (err, result) => {
if (err) return console.log(err)
else res.send(result)
})
}

app.post('/postReview/:id'), function (req, res) {
db.movie.post_review(
	[req.params.id,
	 req.params.user_id,
	 req.params.movie_id
	], (err, result) => {
if (err) return console.log(err)
else res.send(result)
})
}

app.post('/postSeen/:id'), function (req, res) {
db.movie.post_seen(
	[req.params.id,
	 req.params.user_id,
	 req.params.movie.id
	], (err, result) => {
if (err) return console.log(err)
else res.send(result)
})
}

app.post('/postThumbDown/:id'), function (req, res) {
db.movie.post_thumb_down(
	[req.params.id,
	 req.params.movie_id,
	 req.params.user_id
	], (err, result) => {
if (err) return console.log(err)
else res.send(result)
})
}

app.post('/postThumbSide/:id'), function (req, res) {
db.movie.post_thumb_side(
	[req.params.id,
	 req.params.movie_id,
	 req.params.user_id
	], (err, result) => {
if (err) return console.log(err)
else res.send(result)
})
}

app.post('/postThumbUp/:id'), function (req, res) {
db.movie.post_thumb_up(
	[req.params.id,
	 req.params.user_id,
	 req.params.mpvie_id
	], (err, result) => {
if (err) return console.log(err)
else res.send(result)
})
}

app.post('/postToSee/:id'), function (req, res) {
db.movie.post_to_see(
	[req.params.id,
	 req.params.user_id,
	 req.params.movie_id
	], (err, result) => {
if (err) return console.log(err)
else res.send(result)
})
}
//navbar
app.get('/getBasicUserInfo/:id'), function (req, res) {
db.navbar.get_basic_user_info([req.params.id], (err, result) => {
if (err) return console.log(err)
else res.send(result)
})
}

//profile
app.get('/getAllFriends/:id'), function (req, res) {
db.profile.get_all_friends([req.params.id], (err, result) => {
if (err) return console.log(err)
else res.send(result)
})
}

app.get('/getAuthorized/:id'), function (req, res) {
db.profile.get_authorized([req.params.id], (err, result) => {
if (err) return console.log(err)
else res.send(result)
})
}

app.get('/getFriends/:id'), function (req, res) {
db.profile.get_friends([req.params.id], (err, result) => {
if (err) return console.log(err)
else res.send(result)
})
}

app.get('/getUser/:id'), function (req, res) {
db.profile.get_user([req.params.id], (err, result) => {
if (err) return console.log(err)
else res.send(result)
})
}


app.listen(8080, function() {
  console.log('Connected on 8080')
})
