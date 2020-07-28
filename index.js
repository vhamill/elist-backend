const express = require('express')
const app = express()
const port = 3001

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

app.use(express.json())

const entry_model = require('./entry_model')

app.use(express.json())
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});

app.get('/', (req, res) => {
  entry_model.getEntries()
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.post('/entries', (req, res) => {
  entry_model.createEntry(req.body)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.delete('/entries/:id', (req, res) => {
  entry_model.deleteEntry(req.params.id)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.get('/users', (req, res) => {
  entry_model.getUsers()
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.post('/users', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;
    entry_model.createUser(req.body)
      .then(response => {
        res.status(200).send(response);
      })
      .catch(error => {
        res.status(500).send(error);
      })
    res.status(201).send();
  } 
  catch {
    res.status(500).send();
  }
  
})

app.post('/users/login', async (req, res) => {
  const user = users.find(user => user.name === req.body.name);
  if (user == null) {
    return res.status(400).send('Cannot find user');
  }
  try{
    if (await bcrypt.compare(req.body.password, user.password)){
      res.send('Success');
    } else {
      res.send('Not Allowed');
    }
  } catch {
    res.status(500).send();
  }
})

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

