const express = require('express')
const userController = require('../controllers/userController')
const passport = require('passport')
const router = express.Router()

router
    .route('/login')
    .get(userController.loginPage)
    .post(userController.loginUser)

router 
    .route('/register')
    .get(userController.registerPage)
    .post(userController.registerUser)

router 
    .route('/logout')
    .get(userController.logoutUser)

router
    .route('/login/federated/google')
    .get(passport.authenticate('google'))

router
    .get('/oauth2/redirect/google', passport.authenticate('google', {
        successRedirect: '/',
        failureRedirect: '/login'
      }))
      
module.exports = router