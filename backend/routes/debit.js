const router = require('express').Router()
let Debit = require('../models/debit.model')

router.route('/').get((req,res) =>{
    Debit.find()
        .then(data => res.json(data))
        .catch(err => res.status(400).json(`Error : ${err}`));
});

router.route('/add').post((req,res) => {
    let { description , amt, date} = req.body
    amt = parseFloat(amt);
    let newDebit = new Debit({description,amt,date});

    newDebit.save()
            .then(() => res.json(`Successfully added to the Credit Log`))
            .catch(err => res.status(400).json(`Error : ${err}`))
});

router.route('/delete/:id').delete((req,res) => {
    let { id } = req.params
    Debit.findByIdAndDelete(id)
        .then(() => res.json(`Successfully deleted the record with id : ${id}`))
        .catch(err => res.status(400).json(`Error : ${err}`));
});

module.exports = router;


