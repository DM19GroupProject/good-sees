let app = require('./server.js');
let config = require('./config.js');
let passport = require('passport');
const axios = require('axios');
let db;

setImmediate(() => {
  db = app.get('db');
 
})


const baseUrl = 'https://api.themoviedb.org/3/';

module.exports = {
  test: (req, res, next) => {
    // passport.authenticate('facebook', { failureRedirect: '/#/login' })
    res.send('this worked')
  },

  // feed endpoints

  // passport.authenticate('facebook', { failureRedirect: '/login' }),
  // function(req, res) {
  //   // Successful authentication, redirect home.
  //   res.redirect('/');
  // });

  getNewFeed: (req, res, next) => {
    // passport.authenticate('facebook', { failureRedirect: '/#/login' })
    console.log('running')
    db.feed.get_new_feed([req.params.id], (err, result) => {
      if (err) console.log('get new feed endpoint error: ', err)
      else {
        res.send(result)
      }
    })
  },

  // login endpoints

  getIfUserExists: (req, res, next) => {
    // passport.authenticate('facebook', { failureRedirect: '/#/login' })
    db.login.get_if_user_exists([req.params.id], (err, result) => {
      if (err) console.log('get if user exists endpoint error: ', err)
      else {
        res.send(result)
      }
    })
  },
  postNewUserInfo: (req, res, next) => {
    // passport.authenticate('facebook', { failureRedirect: '/#/login' })
    db.login.post_new_user_info([
      req.params.id,
      req.params.first,
      req.params.last,
      req.params.picture
    ], (err, result) => {
      if (err) console.log('post new user info endpoint error: ', err)
    })
    res.end()
  },

  // movie endpoints

  deleteFav: (req, res, next) => {
    // passport.authenticate('facebook', { failureRedirect: '/#/login' })
    db.movie.delete_fav([
      req.params.id,
      req.params.movieId
    ], (err, result) => {
      if (err) console.log('delete_fav endpoint error: ', err)
    })
    res.end()
  },
  deleteRecommendation: (req, res, next) => {
    // passport.authenticate('facebook', { failureRedirect: '/#/login' })
    db.movie.delete_recommendation([
      req.params.id,
      req.params.movieId
    ], (err, result) => {
      if (err) console.log('delete recommendation endpoint error: ', err)
    })
    res.end()
  },
  deleteReview: (req, res, next) => {
    // passport.authenticate('facebook', { failureRedirect: '/#/login' })
    db.movie.delete_review([
      req.params.id,
      req.params.movieId
    ], (err, result) => {
      if (err) console.log('delete review endpoint error: ', err)
    })
    res.end()
  },
  deleteSeen: (req, res, next) => {
    // passport.authenticate('facebook', { failureRedirect: '/#/login' })
    db.movie.delete_seen([
      req.params.id,
      req.params.movieId
    ], (err, result) => {
      if (err) console.log('delete seen endpoint error: ', err)
    })
    res.end()
  },
  deleteToSee: (req, res, next) => {
    // passport.authenticate('facebook', { failureRedirect: '/#/login' })
    db.movie.delete_to_see([
      req.params.id,
      req.params.movieId
    ], (err, result) => {
      if (err) console.log('delete to see endpoint error: ', err)
    })
    res.end()
  },
  getStats: (req, res, next) => {
    // passport.authenticate('facebook', { failureRedirect: '/#/login' })
    db.movie.get_stats([req.params.id], (err, result) => {
      if (err) console.log('get stats endpoint error: ', err)
      else {
        res.send(result)
      }
    })
  },
  getReviews: (req, res, next) => {
    // passport.authenticate('facebook', { failureRedirect: '/#/login' })
    db.movie.get_reviews([req.params.id], (err, result) => {
      if (err) console.log('get reviews endpoint error: ', err)
      else {
        res.send(result)
      }
    })
  },
  postFav: (req, res, next) => {
    // passport.authenticate('facebook', { failureRedirect: '/#/login' })
    db.movie.post_fav([
      req.params.id,
      req.params.movieId
    ], (err, result) => {
      if (err) console.log('post fav endpoint error: ', err)
    })
    res.end()
  },
  postRecommendation: (req, res, next) => {
    // passport.authenticate('facebook', { failureRedirect: '/#/login' })
    db.movie.post_recommendation([
      req.params.id,
      req.params.movieId
    ], (err, result) => {
      if (err) console.log('post recommendation endpoint error: ', err)
    })
    res.end()
  },
  postReview: (req, res, next) => {
    // passport.authenticate('facebook', { failureRedirect: '/#/login' })
    db.movie.post_review_and_title([
      req.params.id,
      req.params.movieId,
      req.params.title,
      req.params.review
    ], (err, result) => {
      if (err) console.log('post review endpoint error: ', err)
    })
    res.end()
  },
  postSeen: (req, res, next) => {
    // passport.authenticate('facebook', { failureRedirect: '/#/login' })
    db.movie.post_seen([
      req.params.id,
      req.params.movieId
    ], (err, result) => {
      if (err) console.log('post seen endpoint error: ', err)
    })
    res.end()
  },
  thumbDown: (req, res, next) => {
    // passport.authenticate('facebook', { failureRedirect: '/#/login' })
    console.log('sad face')
    db.movie.post_thumb_down([
      req.params.id,
      req.params.movieId
    ], (err, result) => {
      if (err) console.log('post thumb down endpoint error: ', err)
    })
    res.end()
  },
  thumbSide: (req, res, next) => {
    // passport.authenticate('facebook', { failureRedirect: '/#/login' })
    console.log('meh face')
    db.movie.post_thumb_side([
      req.params.id,
      req.params.movieId
    ], (err, result) => {
      if (err) console.log('post thumb side endpoint error: ', err)
    })
    res.end()
  },
  thumbUp: (req, res, next) => {
    // passport.authenticate('facebook', { failureRedirect: '/#/login' })
    console.log('happy face')
    db.movie.post_thumb_up([
      req.params.id,
      req.params.movieId
    ], (err, result) => {
      if (err) console.log('post thumb up endpoint error: ', err)
    })
    res.end()
  },
  postToSee: (req, res, next) => {
    // passport.authenticate('facebook', { failureRedirect: '/#/login' })
    db.movie.post_to_see([
      req.params.id,
      req.params.movieId
    ], (err, result) => {
      if (err) console.log('post to see endpoint error: ', err)
    })
    res.end()
  },

  // navbar endpoints

  getUser: (req, res, next) => {
    // passport.authenticate('facebook', { failureRedirect: '/#/login' })
    db.navbar.get_basic_user_info([req.params.id], (err, result) => {
      if (err) console.log('get user endpoint error: ', err)
      else {
        res.send(result)
      }
    })
  },

  // profile endpoints

  deleteFriend: (req, res, next) => {
    // passport.authenticate('facebook', { failureRedirect: '/#/login' })
    db.profile.delete_friend([
      req.params.id,
      req.params.friendId
    ], (err, result) => {
      if (err) console.log('delete friend endpoint error: ', err)
    })
    res.end()
  },
  getFriends: (req, res, next) => {
    // passport.authenticate('facebook', { failureRedirect: '/#/login' })
    db.profile.get_friends([
      req.params.id
    ], (err, result) => {
      if (err) console.log('get friends endpoint error: ', err)
      else {
        res.send(result)
      }
    })
  },
  getUserActivity: (req, res, next) => {
    // passport.authenticate('facebook', { failureRedirect: '/#/login' })
    db.profile.get_user_activity([
      req.params.id
    ], (err, result) => {
      if (err) console.log('get user activity endpoint error: ', err)
      else {
        res.send(result)
      }
    })
  },
  postFriendRank: (req, res, next) => {
    // passport.authenticate('facebook', { failureRedirect: '/#/login' })
    db.profile.delete_friend_rank(
      [
        req.params.id,
        req.params.rank
      ], (err, result) => {
        if (err) return console.log('delete friend rank endpoint error: ', err)
      })
    console.log('halfway')
    db.profile.post_friend_rank(
      [
        req.params.id,
        req.params.friendId,
        req.params.rank
      ], (err, result) => {
        if (err) return console.log('post friend rank endpoint error: ', err)
        else res.end()
      })
  },
  postNewFriend: (req, res, next) => {
    // passport.authenticate('facebook', { failureRedirect: '/#/login' })
    db.profile.post_new_friend([
      req.params.id,
      req.params.friendId
    ], (err, result) => {
      if (err) console.log('post new friend endpoint error: ', err)
    })
    res.end()
  },

getMoviesByGenre: (req, res, next) => {
    // passport.authenticate('facebook', { failureRedirect: '/#/login' })
  axios.get(`${baseUrl}genre/${req.params.id}/movies${config.key}&language=en-US&include_adult=false&sort_by=created_at.asc&page=${req.params.page}`)
    .then(response => {
      return res.send(response.data)
    })
    .catch(err => next(err))
},

searchMovieByTitle: (req, res) => {
  axios.get(`${baseUrl}search/movie${config.key}&language=en-US&query=${req.params.movieTitle}&page=${req.params.page}`)
    .then(response => res.send(response.data.results))
    .catch(err => next(err))
},

searchMovieByCastMember:(req, res) => {
  axios.get(`${baseUrl}search/person${config.key}&language=en-US&query=${req.params.castMember}&page=1`)
    .then(response => {

      return res.send(response.data.results)

    })
    .catch(err => next(err))
},

getMovieById: (req, res, next) => {
    // passport.authenticate('facebook', { failureRedirect: '/#/login' })
  console.log(2)
  axios.get(`${baseUrl}movie/${req.params.id}${config.key}&language=en-US`)
   .then(response => {

    return res.send(response.data)
  })
  .catch(err => next(err))
}


}//end of module





