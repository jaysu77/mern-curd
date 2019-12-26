const router =require('express').Router();
let Exercise = require('../models/exercise.model');

router.route('/').get((req,res)=>{
    Exercise.find()
    .then(exercises => res.json(exercises))
    .catch(err =>res.state(400).json('Error:' + err));
});

router.route('/add').post((req,res)=>{
    
    const username= req.body.username;
    const description =req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const newExercies =new Exercise({
        username,
        description,
        duration,
        date
    });


    newExercies.save()
    .then(()=> res.json('Exercies Added'))
    .catch(err => res.state(400).json('Error:' +err))
});

router.route('/:id').get((req, res) =>{
    console.log(req.params.id);
    Exercise.findById(req.params.id)
    .then(exercise =>res.json(exercise))
    .catch(err => res.status(400).json('Error:' + err));
});

router.route('/:id').delete((req,res) =>{
    Exercise.findByIdAndDelete(req.params.id)
    .then(() =>res.json("Exercise deleted"))
    .catch(err => res.status(400).json('Error:' + err));
});

router.route('/update/:id').post((req,res) =>{
    console.log("jayus" +req.params.id);

    Exercise.findById(req.params.id)
    .then(exercise =>{
        exercise.username= req.body.username;
        exercise.description =req.body.description;
        exercise.duration = Number(req.body.duration);
        exercise.date = Date.parse(req.body.date);

            
    exercise.save()
    .then(()=> res.json('Exercies Updated'))
    .catch(err => res.state(400).json('Error:' +err))

    })
    .catch(err => res.status(400).json('Error:' + err));
});

module.exports =router;