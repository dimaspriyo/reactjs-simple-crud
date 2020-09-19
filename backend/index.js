const express = require('express')
const app = express()

var mysql = require('mysql');

var connection = mysql.createConnection({
    host     : 'database',
    user     : 'user',
    password : 'password',
    database : 'reactjs-crud-page',
    port     : '3306'
  });
   
  // connection.connect(function(err) {
  //   if (err) {
  //    throw err
  //   }
  // });



  
  var bodyParser = require("body-parser");
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  const cors = require('cors')

  var corsOptions = {
    origin: '*',
  }
  app.use(cors(corsOptions));


//Route

app.get('/', function (req, res) {

    connection.query('SELECT * FROM `persons`', function (error, results, fields) {
        if (error) {
           return res.status(500).send('Query Error');
        }
        return res.json(results);
      });

  })

  app.post('/', function (req, res) {

    name = req.body.name;
    email = req.body.email;
    country = req.body.country;
    married = req.body.married;

    connection.query('INSERT into persons(`name`, `email`, `country`, `married`) VALUES (?,?,?,?)',[name, email, country, married], function (error, results, fields) {
        if (error) {
           return res.status(500).send('Query Error');
        }
        return res.json(results);
      });
    

  })

  app.get('/:id', function (req, res) {

    id = req.params.id;

    connection.query('SELECT * FROM `persons` where id=? limit 1', id, function (error, results, fields) {
        if (error) {
           return res.status(500).send('Query Error');
        }
        return res.json(results[0]);
      });

  })

  app.post('/:id', function (req, res) {

    id = req.params.id;
    name = req.body.name;
    email = req.body.email;
    country = req.body.country;
    married = req.body.married;

    connection.query('UPDATE persons set name=?, email=?, country=?, married=? where id=?',[name, email, country, married, id], function (error, results, fields) {
        if (error) {
           return res.status(500).send('Query Error');
        }
        return res.status(200).send(results);
      });
    
  })

  app.delete('/:id', function (req, res) {

    id = req.params.id;

    connection.query('DELETE FROM persons where id=?',[id], function (error, results, fields) {
        if (error) {
           return res.status(500).send('Query Error');
        }
        return res.status(200).send(results);
      });
    
  })




  app.listen(3001, () => console.log('You are running on port 3001!'))


  