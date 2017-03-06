// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';
// import './index.css';

// ReactDOM.render(
//   <App />,
//   document.getElementById('root')
// );

 const express = require('express');
 app = express();
 mongoose = require('mongoose');
 bodyparser  = require('body-parser');
 validator = require('express-validator');
 logger = require('morgan');
 compression = require('compression');
 errorHandlers = require('error-handlers');
 exphbs = require('exrpess-handlebars');
  url = mongoose.connect('mongodb://far:far@ds151909.mlab.com:51909/autocompletet');
  ReactDOM = require('react-dom');
  ReactDOMServer = require('react-dom/server');
  React = require('react');

  require(  'babel-register')({
     presets: ['react']
  })
   
   const Autocomplete = React.createFactory(require('./autocomplete.jsx'))
   port = 3000;
   mongoose.connection.on('Connected', function(err){
     if (err) {
      console.log('err');
      process.exit(1);
     }
     console.log('Mongoose is Connected');

    var itemModel = new mongoose.schema({
      name=  String,
      time= {
        type:Date, default: Date.now
      }
    });   
  
   var itemModel =mongoose.model("rooms",itemScheme);

    app.use(compression())
    app.use(logger('dev'))
    app.use(bodyparser.json())
    app.use(validator())
    app.use(errorHandlers())
    app.use(express.static('public'))
    app.use('handlebars', exphbs())
    app.use('view engine', 'handlebars')

    app.use(function(req, res,next){
      req.rooms = itemModel
      return next()
    })

   app.post('/rooms', function(req, res, next) {
      var newItem = itemModel(req.body)
      newItem.save(function(err, result){
          if(err) return next(err)
          return res.json(result.ops)
      })
   })

      app.get('/', function(req, res, next){
        var url = 'http://localhost' + port + '/rooms'
        console.log(url)
        req.rooms.find({}, function(err, rooms){
          if (err) return next(err)
          res.render('index', {
          autocomplete: ReactDOMServer.renderToString(Autocomplete({
                options: rooms,
                    url: url
                })),
                data: `<script type="text/javascript">
                window.__autocomplete_data = {
                  rooms: ${JSON.stringify(rooms, null, 2)},
                  url: "${url}"
                }
              </script>`
            })
        })
    })

    app.listen(port)            
   })






