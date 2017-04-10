let app = require('./server.js');
let db;
setImmediate(() => {
  db = app.get('db');
})
// db = app.get('db');
module.exports = {
  test: (req, res, next) => {
    res.send('this worked')
  },
  getStats: (req, res, next) => {
    db.movie.get_stats([req.params.id], (err, result) => {
      if (err) console.log('get stats endpoint error: ', err)
      else {
        res.send(result)
      }
    })
  },
  getReviews: (req, res, next) => {
    db.movie.get_reviews([req.params.id], (err, result) => {
      if (err) console.log('get reviews endpoint error: ', err)
      else {
        res.send(result)
      }
    })
  },
  getNewFeed: (req, res, next) => {
    db.feed.get_new_feed([req.params.id], (err, result) => {
      if (err) console.log('get new feed endpoint error: ', err)
      else {
        res.send(result)
      }
    })
  },
  getNewFeed: (req, res, next) => {
    db.feed.get_new_feed([req.params.id], (err, result) => {
      if (err) console.log('get new feed endpoint error: ', err)
      else {
        res.send(result)
      }
    })
  },
  getIfUserExists: (req, res, next) => {
    db.login.get_if_user_exists([req.params.id], (err, result) => {
      if (err) console.log('get if user exists endpoint error: ', err)
      else {
        res.send(result)
      }
    })
  },
  postNewUserInfo: (req, res, next) => {
    db.login.post_new_user_info(
      [
        req.params.id,
        req.params.first,
        req.params.last,
        req.params.picture
      ], (err, result) => {
        if (err) console.log('post new user info endpoint error: ', err)
        else {
          res.send(result)
        }
      })
  }

}





