const express = require('express'),
  session = require('express-session'),
  bodyParser = require('body-parser'),
  massive = require('massive'),
  passport = require('passport'),
  // LocalStrategy = require('passport-local').Strategy,
  FacebookStrategy = require('passport-facebook').Strategy,
  config = require('./config.js'),
  // userService = require('./public/js/services/userService.js'),
  axios = require('axios'),
  cors = require('cors');
const baseUrl = 'https://api.themoviedb.org/3/';
const app = module.exports = express();


/*--------------------------------------------------------------------*
                              MIDDLEWARE
*--------------------------------------------------------------------*/

app.use(bodyParser.json());
app.use(express.static('./public'));
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'keyboardcat'
}))
app.use(passport.initialize());
app.use(passport.session());



app.get('/auth/facebook',
  passport.authenticate('facebook', { scope: ['user_friends']}));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/#/feed');
  });

app.get('/auth/me', (req, res) => {
  res.status(200).send(req.user[0].fb_id);
})

/*--------------------------------------------------------------------*
                              DATABASE
*--------------------------------------------------------------------*/


let db = massive.connectSync({ connectionString: config.dbString })

//endpoints for sql
db.schema(function (err, data) {
  if (err) console.log(err);
  else console.log("All tables successfully reset")
})

app.set('db', db);
db = app.get('db');

const endpointCtrl = require('./endpointCtrl.js')

db.schema(function (err, data) {
  if (err) console.log("hello", err);
  else console.log('db created')
})

/*--------------------------------------------------------------------*
                                AUTH
*--------------------------------------------------------------------*/











passport.use(new FacebookStrategy({
  clientID: config.facebook.clientID,
  clientSecret: config.facebook.clientSecret,
  callbackURL: "http://localhost:8080/auth/facebook/callback",
  profileFields: ['id', 'displayName', 'first_name', 'last_name', 'picture']
},
  function (accessToken, refreshToken, profile, cb) {
    db.login.get_user([profile.id], function (err, user) {
      // console.log('checking user out')
      // user = user[0];
      console.log('this is the user: ',user,'with this id',profile.id )
      // console.log(profile._json.first_name, profile._json.last_name, profile._json.id, profile._json.picture.data.url)

      if (!user[0]) {
        console.log('CREATING USER');
        db.login.post_new_user_info([profile._json.id, profile._json.first_name, profile._json.last_name,  profile._json.picture.data.url], function (err, user) {
          console.log('USER CREATED', profile._json.first_name, profile._json.last_name);
          // userService.user = profile._json.id;
          // console.log(userService.user);
          return cb(err, user);
        })
      } else {

        // userService.user = profile._json.id;
        // console.log(userService.user);
        return cb(err, user);
      }
    })
  }));

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});



// passport.serializeUser(function (user, done) {
//   done(null, user.userid);
// })


// passport.deserializeUser(function (id, done) {
//   db.getUserById([id], function (err, user) {
//     user = user[0];
//     if (err) console.log(err);
//     elog('RETRIEVED USER');
//     console.log(user);
//     done(null, user);
//   })
// })

// passport.deserializeUser(function (id, done) {
//   db.getUserById([id], function (err, user) {
//     user = user[0];
//     if (err) console.log(err);
//     else console.log('RETRIEVED USER');
//     console.log(user);
//     done(null, user);
//   })
// })
// >>>>>>> 45dbd8d46ffdb067e341ff2cf6525e280495a68a


/////////////
// DATABASE //
/////////////


//endpoints for sql
// db.schema(function(err, data) {
//   if (err) console.log(err);
//   else console.log("All tables successfully reset")
// })


// db.create_user(function(err, user) {
//   if (err) console.log(err);
//   else console.log('CREATED USER');
//   console.log(user);
// })


/*--------------------------------------------------------------------*
                              ENDPOINTS
*--------------------------------------------------------------------*/

//----GET---------*

app.get('/getNewFeed/:id', endpointCtrl.getNewFeed);
app.get('/getIfUserExists/:id', endpointCtrl.getIfUserExists);
app.get('/getReviews/:id', endpointCtrl.getReviews);
app.get('/getStats/:id', endpointCtrl.getStats);
app.get('/getUser/:id', endpointCtrl.getUser);
app.get('/getFriends/:id', endpointCtrl.getFriends);
app.get('/getUserActivity/:id', endpointCtrl.getUserActivity);
app.get('/getMoviesByGenre/:id/:page', endpointCtrl.getMoviesByGenre);
app.get('/searchMovieByTitle/:movieTitle/:page', endpointCtrl.searchMovieByTitle);
app.get('/searchMovieByCastMember/:castMember', endpointCtrl.searchMovieByCastMember);
app.get('/getMovieById/:id', endpointCtrl.getMovieById);

//----POST------*

app.post('/postNewUserInfo/:id/:first/:last/:picture', endpointCtrl.postNewUserInfo);
app.post('/postFav/:id/:movieId', endpointCtrl.postFav);
app.post('/postRecommendation/:id/:movieId', endpointCtrl.postRecommendation);
app.post('/postReview/:id/:movieId/:title/:review', endpointCtrl.postReview);
app.post('/postSeen/:id/:movieId', endpointCtrl.postSeen);
app.post('/thumbDown/:id/:movieId', endpointCtrl.thumbDown);
app.post('/thumbSide/:id/:movieId', endpointCtrl.thumbSide);
app.post('/thumbUp/:id/:movieId', endpointCtrl.thumbUp);
app.post('/postToSee/:id/:movieId', endpointCtrl.postToSee);
app.post('/postNewFriend/:id/:friendId', endpointCtrl.postNewFriend);
app.post('/postFriendRank/:id/:friendId/:rank', endpointCtrl.postFriendRank);

//----DELETE----*

app.post('/deleteFriend/:id/:friendId', endpointCtrl.deleteFriend);
app.post('/deleteFav/:id/:movieId', endpointCtrl.deleteFav);
app.post('/deleteRecommendation/:id/:movieId', endpointCtrl.deleteRecommendation);
app.post('/deleteReview/:id/:movieId', endpointCtrl.deleteReview);
app.delete('/deleteSeen/:id/:movieId', endpointCtrl.deleteSeen);
app.post('/deleteToSee/:id/:movieId', endpointCtrl.deleteToSee);


// app.get('/login',
//   passport.authenticate('facebook'));


app.listen(8080, function () {
  console.log('Connected on 8080')
})


