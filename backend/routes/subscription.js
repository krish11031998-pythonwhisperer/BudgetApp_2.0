const router = require('express').Router()
let Subscription = require('../models/subscription.model')

router.route('/').get((req,res) =>{
    Subscription.find()
        .then(data => res.json(data))
        .catch(err => res.status(400).json(`Error : ${err}`));
});

router.route('/add').post((req,res) => {
    let { description , amt } = req.body
    amt = parseFloat(amt);
    let newCredit = new Subscription({description,amt});

    newCredit.save()
            .then(() => res.json(`Successfully added to the Credit Log`))
            .catch(err => res.status(400).json(`Error : ${err}`))
});

router.route('/delete/:id').delete((req,res) => {
    let { id } = req.params
    Subscription.findByIdAndDelete(id)
        .then(() => res.json(`Successfully deleted the record with id : ${id}`))
        .catch(err => res.status(400).json(`Error : ${err}`));
});

module.exports = router;


