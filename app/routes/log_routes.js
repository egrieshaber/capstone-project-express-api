'use strict'

// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// pull in Mongoose model for examples
const Log = require('../models/log')

// we'll use this to intercept any errors that get thrown and send them
// back to the client with the appropriate status code
const handle = require('../../lib/error_handler')

// this is a collection of methods that help us detect situations when we need
// to throw a custom error
const customErrors = require('../../lib/custom_errors')

// we'll use this function to send 404 when non-existant document is requested
const handle404 = customErrors.handle404
// we'll use this function to send 401 when a user tries to modify a resource
// that's owned by someone else
const requireOwnership = customErrors.requireOwnership

// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `req.user`
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// INDEX
// GET /logs
router.get('/logs', requireToken, (req, res) => {
  Log.find().populate('owner', 'username').sort('-createdAt')
    .then(logs => {
      // `logs` will be an array of Mongoose documents
      // we want to convert each one to a POJO, so we use `.map` to
      // apply `.toObject` to each one
      return logs.map(log => {
        return log.toObject()
      })
    })
    // respond with status 200 and JSON of the examples
    .then(logs => res.status(200).json({ logs: logs }))
    // if an error occurs, pass it to the handler
    .catch(err => handle(err, res))
})

// SHOW BY ID
// GET /logs/5a7db6c74d55bc51bdf39793
router.get('/logs/:id', requireToken, (req, res) => {
  // req.params.id will be set based on the `:id` in the route
  Log.findById(req.params.id).populate('owner', 'username')
    .then(handle404)
    // if `findById` is succesful, respond with 200 and "example" JSON
    .then(log => res.status(200).json({ log: log.toObject() }))
    // if an error occurs, pass it to the handler
    .catch(err => handle(err, res))
})

// SHOW ALL LOGS OF SPECIFIC USER
// GET ALL OF MY LOGS
// GET /logs/user
router.get('/myLogs', requireToken, (req, res) => {
  // console.log(`CAN YOU SEE MEEEEEEEEEEEEEEE`)
  Log.find().populate('owner', 'username').sort('-createdAt')
    .then(logs => {
      // console.log(logs[0])
      const myLogs = []
      logs.forEach(log => {
        // checks to see if the post owner'id matches that of the requesting user
        // if so, adds it to the myPosts array.
        if (req.user._id.equals(log.owner._id)) {
          // console.log(`searcher is `, req.user._id)
          // console.log(`post owner is `, log.owner)
          // console.log(`I added this log to an array`, log)
          myLogs.push(log)
        }
      })
      // `logs` will be an array of Mongoose documents
      // we want to convert each one to a POJO, so we use `.map` to
      // apply `.toObject` to each one

      // returns the array, after changing all the logs to objects (though it's not really needed).
      return myLogs.map(log => log.toObject())
    })
    // respond with status 200 and JSON of the posts
    .then(logs => res.status(200).json({ logs: logs }))
    // if an error occurs, pass it to the handler
    .catch(err => handle(err, res))
})

// CREATE
// POST /logs
router.post('/logs', requireToken, (req, res) => {
  // set owner of new log to be current user
  req.body.log.owner = req.user.id

  Log.create(req.body.log)
    // respond to succesful `create` with status 201 and JSON of new "log"
    .then(log => {
      res.status(201).json({ log: log.toObject() })
    })
    // if an error occurs, pass it off to our error handler
    // the error handler needs the error message and the `res` object so that it
    // can send an error message back to the client
    .catch(err => handle(err, res))
})

// UPDATE
// PATCH /logs/5a7db6c74d55bc51bdf39793
router.patch('/logs/:id', requireToken, (req, res) => {
  // if the client attempts to change the `owner` property by including a new
  // owner, prevent that by deleting that key/value pair
  delete req.body.log.owner

  Log.findById(req.params.id)
    .then(handle404)
    .then(log => {
      // pass the `req` object and the Mongoose record to `requireOwnership`
      // it will throw an error if the current user isn't the owner
      requireOwnership(req, log)

      // the client will often send empty strings for parameters that it does
      // not want to update. We delete any key/value pair where the value is
      // an empty string before updating
      Object.keys(req.body.log).forEach(key => {
        if (req.body.log[key] === '') {
          delete req.body.log[key]
        }
      })

      // pass the result of Mongoose's `.update` to the next `.then`
      return log.update(req.body.log)
    })
    // if that succeeded, return 204 and no JSON
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(err => handle(err, res))
})

// DESTROY
// DELETE /logs/5a7db6c74d55bc51bdf39793
router.delete('/logs/:id', requireToken, (req, res) => {
  Log.findById(req.params.id)
    .then(handle404)
    .then(log => {
      // throw an error if current user doesn't own `example`
      requireOwnership(req, log)
      // delete the log ONLY IF the above didn't throw
      log.remove()
    })
    // send back 204 and no content if the deletion succeeded
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(err => handle(err, res))
})

module.exports = router
