const router = require('express').Router()
const Saving = require('../models/saving.models')

router.route('/').get((req,res) =>{
    Saving.find()
        .then(data => res.json(data))
        .catch(err => res.status(400).json(`Error : ${err}`));
});

router.route('/add').post((req,res) => {
    let { description , amt, date} = req.body
    amt = parseFloat(amt);
    let newCredit = new Saving({description,amt,date});

    newCredit.save()
            .then(() => res.json(`Successfully added to the Credit Log`))
            .catch(err => res.status(400).json(`Error : ${err}`))
});

router.route('/delete/:id').delete((req,res) => {
    let { id } = req.params
    Saving.findByIdAndDelete(id)
        .then(() => res.json(`Successfully deleted the record with id : ${id}`))
        .catch(err => res.status(400).json(`Error : ${err}`));
});

module.exports = router;