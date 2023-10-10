const House = require('../models/houseModel')
const user = require('../models/userModel')
const multer = require('multer')

// multer config for image upload
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './public/images');
    },
    filename: function(req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    }
  })

const upload = multer({ storage: storage })

const getAllHouses = async (req, res) => {
    try {
        const houses = await House.find().populate('owner')
        res.render('home', { houses: houses, user: req.user})
    } catch(err){
        console.log(err)
    }
}

const uploadPage = (req, res) => {
    res.render('upload', {user: req.user})
}

const createHouse = async (req, res) => {
    try {
        const house = new House({
            price: req.body.price,
            info: req.body.info,
            status: req.body.status,
            address: req.body.address,
            image: req.file.filename, 
            owner: req.user._id
    })

    await house.save()
    res.redirect('/')
    } catch(err) {
        console.log(err)
    }
}

const editPage = async (req, res) => {
    try {
        const house = await House.findById(req.params.id)
        res.render('edit', { house: house, user: req.user })
    } catch(err){
        console.log(err)
    }
}

const updateHouse = async (req, res) => {
    console.log(req.params.id)
    console.log(req.body)
    try {
        let house = await House.findById(req.params.id)
        if(house.owner.equals(req.user._id)){
        await House.findByIdAndUpdate(req.params.id, req.body)
        }
        res.redirect('/')
    } catch(err){
        console.log(err)
    }
}

const deleteHouse = async (req, res) => {
    try {
        let house = await House.findById(req.params.id)
        if(house.owner.equals(req.user._id)){
        await House.findByIdAndRemove(req.params.id)
        }
        res.redirect('/')
    } catch(err) {
        console.log(err)
    }
}


module.exports = {
    getAllHouses,
    upload,
    uploadPage,
    createHouse,
    editPage,
    updateHouse,
    deleteHouse
}