'use strict'

const express = require('express')
const fastcsv = require('fast-csv')

const User = require('./models/User')

// Setup Express.js app
const app = express()

app.get('/users', async (req, res) => {
  res.setHeader('Content-Type', 'text/csv')
  res.setHeader('Content-Disposition', 'attachment; filename="users.csv"')

  const csvStream = fastcsv.format({ headers: true })

  try {
    const users = await User.find({})

    csvStream.pipe(res)

    users.forEach(user => {
      csvStream.write({
        name: user.name,
        email: user.email
      })
    })

    csvStream.end()
  } catch (err) {
    console.error('Error fetching users:', err)
    return res.status(500).send('Internal Server Error')
  }
})

app.listen(3000)
