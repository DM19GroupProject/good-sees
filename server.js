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

app.get('/searchMovieByTitle/:title', function(req, res) {
  axios.get(`${baseUrl}search/movie${config.key}&language=en-US&query=${req.params.title}&page=1`)
  .then(response => res.send(response.data.results))
  .catch(err => next(err))
})

app.get('/searchMovieByCast/:cast', function(req, res) {
    axios.get(`${baseUrl}search/person${config.key}&language=en-US&query=${req.params.cast}&page=1`)
  .then(response => {

  return  res.send(response.data.results)

  })
  .catch(err => next(err))
})


/*--------------------------------------------------------------------*
                        
*--------------------------------------------------------------------*/ 

app.listen(8080, function(){
    console.log(`listening on port ${this.address().port}`)
});


