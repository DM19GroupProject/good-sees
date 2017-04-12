const express = require('express'),
  session = require('express-session'),
  bodyParser = require('body-parser'),
  massive = require('massive'),
  passport = require('passport'),
  // LocalStrategy = require('passport-local').Strategy,
  FacebookStrategy = require('passport-facebook').Strategy,
  config = require('./config.js'),
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


// passport.use(new FacebookStrategy({
//   clientID: config.facebook.clientID,
//   clientSecret: config.facebook.clientSecret,
//   callbackURL: "http://localhost:3000/auth/facebook/callback",
//   profileFields: ['id', 'displayName']
// },
//   function (accessToken, refreshToken, profile, cb) {
//     db.getUserByFacebookId([profile.id], function (err, user) {
//       user = user[0];
//       if (!user) {
//         console.log('CREATING USER');
//         db.createUserFacebook([profile.displayName, profile.id], function (err, user) {
//           console.log('USER CREATED', user);
//           return cb(err, user);
//         })
//       } else {
//         return cb(err, user);
//       }
//     })
//   }));


// passport.serializeUser(function (user, done) {
//   done(null, user.userid);
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

passport.deserializeUser(function (id, done) {
  db.getUserById([id], function (err, user) {
    user = user[0];
    if (err) console.log(err);
    else console.log('RETRIEVED USER');
    console.log(user);
    done(null, user);
  })
})
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
app.get('/getMoviesByGenre/:id', endpointCtrl.getMoviesByGenre);
app.get('/searchMovieByTitle/:movieTitle', endpointCtrl.searchMovieByTitle);
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
app.post('/deleteSeen/:id/:movieId', endpointCtrl.deleteSeen);
app.post('/deleteToSee/:id/:movieId', endpointCtrl.deleteToSee);


app.listen(8080, function () {
  console.log('Connected on 8080')
})


//steven's endpoints

// app.get('/getMoviesByGenre/:id', function (req, res, next) {
//   axios.get(`${baseUrl}genre/${req.params.id}/movies${config.key}&language=en-US&include_adult=false&sort_by=created_at.asc`)
//     .then(response => {
//       return res.send(response.data)
//     })
//     .catch(err => next(err))
// })

// app.get('/searchMovieByTitle/:movieTitle', function (req, res) {
//   axios.get(`${baseUrl}search/movie${config.key}&language=en-US&query=${req.params.movieTitle}&page=1`)
//     .then(response => res.send(response.data.results))
//     .catch(err => next(err))
// })

// app.get('/searchMovieByCastMember/:castMember', function (req, res) {
//   axios.get(`${baseUrl}search/person${config.key}&language=en-US&query=${req.params.castMember}&page=1`)
//     .then(response => {

//       return res.send(response.data.results)

//     })
//     .catch(err => next(err))
// })

// app.get('/getMovieById/:id', function (req, res, next) {

//   console.log(2)
//   axios.get(`${baseUrl}movie/${req.params.id}${config.key}&language=en-US`)
//     .then(response => {
//       return res.send(response.data)
//     })
//   .catch(err => next(err))
// })

// app.post('/postSeen/:id'), function (req, res) {
//   db.movie.post_seen(
//     [req.params.id,
//     req.params.user_id,
//     req.params.movie.id
//     ], (err, result) => {
//       if (err) return console.log(err)
//       else res.send(result)
//     })
// }

// app.post('/postThumbDown/:id'), function (req, res) {
//   db.movie.post_thumb_down(
//     [req.params.id,
//     req.params.movie_id,
//     req.params.user_id
//     ], (err, result) => {
//       if (err) return console.log(err)
//       else res.send(result)
//     })
// }

// app.listen(8080, function () {
//   console.log(`listening on port ${this.address().port}`)
// });


// app.post('/postThumbSide/:id'), function (req, res) {
//   db.movie.post_thumb_side(
//     [req.params.id,
//     req.params.movie_id,
//     req.params.user_id
//     ], (err, result) => {
//       if (err) return console.log(err)
//       else res.send(result)
//     })
// }

// app.post('/postThumbUp/:id'), function (req, res) {
//   db.movie.post_thumb_up(
//     [req.params.id,
//     req.params.user_id,
//     req.params.mpvie_id
//     ], (err, result) => {
//       if (err) return console.log(err)
//       else res.send(result)
//     })
// }

// app.post('/postToSee/:id'), function (req, res) {
//   db.movie.post_to_see(
//     [req.params.id,
//     req.params.user_id,
//     req.params.movie_id
//     ], (err, result) => {
//       if (err) return console.log(err)
//       else res.send(result)
//     })
// }
// //navbar
// app.get('/getBasicUserInfo/:id'), function (req, res) {
//   db.navbar.get_basic_user_info([req.params.id], (err, result) => {
//     if (err) return console.log(err)
//     else res.send(result)
//   })
// }


// })

// //profile
// app.get('/getAllFriends/:id'), function (req, res) {
//   db.profile.get_all_friends([req.params.id], (err, result) => {
//     if (err) return console.log(err)
//     else res.send(result)
//   })
// }

// app.get('/getAuthorized/:id'), function (req, res) {
//   db.profile.get_authorized([req.params.id], (err, result) => {
//     if (err) return console.log(err)
//     else res.send(result)
//   })
// }

// app.get('/getFriends/:id'), function (req, res) {
//   db.profile.get_friends([req.params.id], (err, result) => {
//     if (err) return console.log(err)
//     else res.send(result)
//   })
// }

// app.get('/getUser/:id'), function (req, res) {
//   db.profile.get_user([req.params.id], (err, result) => {
//     if (err) return console.log(err)
//     else res.send(result)
//   })
// }


// //unused endpoints    
// app.get('/getIfNewFriends/:id/:fb_id'), function (req, res) {
//   db.login.get_if_new_friends([req.params.id], (err, result) => {
//     if (err) return console.log(err)
//     else res.send(result)
//   })
// }


// //steven's endpoints

app.get('/getMoviesByGenre/:id', function (req, res, next) {
  axios.get(`${baseUrl}genre/${req.params.id}/movies${config.key}&language=en-US&include_adult=false&sort_by=created_at.asc`)
    .then(response => {
      return res.send(response.data)
    })
    .catch(err => next(err))
})

app.get('/searchMovieByTitle/:movieTitle', function (req, res) {
  axios.get(`${baseUrl}search/movie${config.key}&language=en-US&query=${req.params.movieTitle}&page=1`)
    .then(response => res.send(response.data.results))
    .catch(err => next(err))
})

app.get('/searchMovieByCastMember/:castMember', function (req, res) {
  axios.get(`${baseUrl}search/person${config.key}&language=en-US&query=${req.params.castMember}&page=1`)
    .then(response => {

      return res.send(response.data.results)

    })
    .catch(err => next(err))
})

app.get('/getMovieById/:id', function (req, res, next) {
  console.log(2)
  axios.get(`${baseUrl}movie/${req.params.id}${config.key}&language=en-US`)
  
//   axios.get(`${baseUrl}movie/${req.params.id}${config.key}&language=en-US`)


    .then(response => {


      return res.send(response.data)
    })
    .catch(err => next(err))

})

// app.listen(8080, function () {
//   console.log('Connected on 8080')
// })

