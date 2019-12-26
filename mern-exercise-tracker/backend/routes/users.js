const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req,res)=>{
    User.find()
    .then(users => res.json(users))
    .catch(err =>res.state(400).json('Error:' + err));
});

router.route('/add').post((req, res) => {

    console.log("Jaysu" +req.body);
    const username= req.body.username;
    const newUser =new User({username});

    newUser.save()
    .then(()=> res.json('User Added'))
    .catch(err => res.state(400).json('Error:' +err))
});

module.exports =router;