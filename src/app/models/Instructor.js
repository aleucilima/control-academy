const db = require('../../config/db')

module.exports = {
  all(callback) {
    db.query(`SELECT * FROM instructors`, (err, results) => {
      if (err) return response.send("Database ERROR!")

      callback(results.rows)
    })
  },
  create() {

  },
}