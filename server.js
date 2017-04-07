const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
const axios = require('axios')
const config = require('./config.js');
const app = module.exports = express();


const baseUrl = 'https://api.themoviedb.org/3/'


/*--------------------------------------------------------------------*
                              MIDDLEWARE
*--------------------------------------------------------------------*/ 

app.use(bodyParser.json());
app.use(express.static('./public'));


/*--------------------------------------------------------------------*
                              ENDPOINTS
*--------------------------------------------------------------------*/ 

app.get('/searchMovieByTitle/:movieTitle', function(req, res) {
  axios.get(`${baseUrl}search/movie${config.key}&language=en-US&query=${req.params.movieTitle}&page=1`)
  .then(response => res.send(response.data.results))
  .catch(err => next(err))
})

app.get('/searchMovieByCastMember/:castMember', function(req, res) {
    axios.get(`${baseUrl}search/person${config.key}&language=en-US&query=${req.params.castMember}&page=1`)
  .then(response => {

  return  res.send(response.data.results)

  })
  .catch(err => next(err))
})

app.get('/getMovieById/:id', function(req, res, next) {
  console.log(2)
  axios.get(`${baseUrl}movie/${req.params.id}${config.key}&language=en-US`)
 
  .then(response => {
   
    return res.send(response.data)
  })
  .catch(err => next(err))

})


/*--------------------------------------------------------------------*
                        
*--------------------------------------------------------------------*/ 

app.listen(8080, function(){
    console.log(`listening on port ${this.address().port}`)
});


