const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const database = {
  users: [
    {
      id: '123',
      name: 'John',
      password: 'cookies',
      email: 'john@gmail.com',
      entries: 0,
      joined: new Date()
    },
    {
      id: '124',
      name: 'Sally',
      password: 'bananas',
      email: 'sally@gmail.com',
      entries: 0,
      joined: new Date()
    }
  ],
  login: [
    {
      id: '987',
      has: '',
      email: 'john@gmail.com'
    }
  ]
}

app.get('/', (req, res) => res.send(database.users));

app.post('/signin', (req, res) => {
  // Load hash from your password DB.
  bcrypt.compare("apples", '$2a$10$zP.Ksg4fFYa0p42qMDT6b.kSItB2djY5EBzjVt57Z4qbf03Hf81nu', function(err, res) {
      console.log('first guess', res);
  });
  bcrypt.compare("veggies", '$2a$10$zP.Ksg4fFYa0p42qMDT6b.kSItB2djY5EBzjVt57Z4qbf03Hf81nu', function(err, res) {
    console.log('second guess', res);
  });

  if (req.body.email === database.users[0].email && req.body.password === database.users[0].password) {
    res.json(database.users[0])
  } else {
    res.status(400).json('error logging in')
  }
});

app.post('/register', (req, res) => {
  const { email, name, password } = req.body;
  // bcrypt.hash(password, null, null, function(err, hash) {
  //     console.log(hash);
  // });
  database.users.push({
    id: '125',
    name: name,
    email: email,
    entries: 0,
    joined: new Date()
  })
  res.json(database.users[database.users.length-1])
})

app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  let found = false;
  database.users.forEach(user => {
    if(user.id === id) {
      found = true;
      res.json(user);
    }
  })
  if(!found) {
    res.status(400).json('not found')
  }
})

app.put('/image', (req, res) => {
  const { id } = req.body;
  let found = false;
  database.users.forEach(user => {
    if(user.id === id) {
      found = true;
      user.entries++
      res.json(user.entries);
    }
  })
  if(!found) {
    res.status(400).json('not found')
  }
})





app.listen(3000, () => console.log("App is running on port 3000"))


/*
/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT user
*/
