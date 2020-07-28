const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'elist_db',
  password: 'postgres',
  port: 5432,
});

const getEntries = () => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM entries.entries ORDER BY id ASC', (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  }) 
}

const createEntry = (body) => {
  return new Promise(function(resolve, reject) {
    const { title, medium, description, image_url } = body
    pool.query('INSERT INTO entries.entries (title, medium, description, image_url) VALUES ($1, $2, $3, $4) RETURNING *', [title, medium, description, image_url], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`A new entry has been added added: ${results.rows[0]}`)
    })
  })
}

const deleteEntry = () => {
  return new Promise(function(resolve, reject) {
    const id = parseInt(request.params.id)
    pool.query('DELETE FROM entries.entries WHERE id = $1', [id], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`Entry deleted with ID: ${id}`)
    })
  })
}

const getUsers = () => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  }) 
}

const createUser = (body) => {
  return new Promise(function(resolve, reject) {
    const { username, email, password } = body
    pool.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *', [username, email, password], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`A new entry has been added added: ${results.rows[0]}`)
    })
  })
}

const deleteUser = () => {
  return new Promise(function(resolve, reject) {
    const id = parseInt(request.params.id)
    pool.query('DELETE FROM users.users WHERE id = $1', [id], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`Entry deleted with ID: ${id}`)
    })
  })
}

module.exports = {
  getEntries,
  createEntry,
  deleteEntry,
  getUsers,
  createUser,
  deleteUser
}