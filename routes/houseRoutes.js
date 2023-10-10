const express = require('express')
const houseController = require('../controllers/houseController')
const router = express.Router()

router
    .route('/')
    .get(houseController.getAllHouses)

router
    .route('/upload')
    .get(houseController.uploadPage)
    .post(houseController.upload.single('image'), houseController.createHouse)

router
    .route('/edit/:id')
    .get(houseController.editPage)
    .post(houseController.updateHouse)

router
    .route('/delete/:id')
    .post(houseController.deleteHouse)

module.exports = router