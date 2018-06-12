var express = require('express')
var logger = require('morgan')
var bodyParser = require('body-parser')

var server = express()

server.use(logger('dev')) //log all the requests to our terminal
server.use(bodyParser.json()) // get access to all POST requests, attaches all user input to request.body
server.use(bodyParser.urlencoded({extended:false})) // 

server.set('view engine', 'ejs')
server.use(express.static('views'))
server.set('views', __dirname+'/views')

server.get('/', function(request, response){
  // response.send('<h1>Hi World!</h1>')
    response.render('home.ejs')
})

server.get('/about-me', function(request, response){
    response.render('about.ejs')
})

server.get('/past-collabs', function(request, response){
  response.render('music.ejs')
})

server.get('/movie-duos', function(request, response){
  response.render('movies.ejs')
})

server.get('/tv-duos', function(request, response){
  response.render('celebrities.ejs')
})

server.post('/', function(request, response){
  console.log(request.body)
    // take list of names and split into an array

  var names=request.body.people.split(',')
  // create loop that randomly picks 2 people and groups them together
  // add that group to a bigger array
  //when we have used up all the people, we stop the loop
  
  var groups = [ ]
  var currentGroup= [ ]
  while( names.length > 0 ){
    var randomNumber= Math.floor(Math.random() * names.length)
    var person= names[randomNumber]
    currentGroup.push(person)
    names.splice(randomNumber, 1)
    //if there's 2 people in current group, add them to the group array
    if(currentGroup.length >= 2){
      groups.push(currentGroup)
      currentGroup= [ ]
    }
  }
  console.log(groups)
  response.render('results.ejs', { data:groups})
})


var port = process.env.PORT

server.listen(port, () => {
    console.log('Server listening on port '+port)
})
