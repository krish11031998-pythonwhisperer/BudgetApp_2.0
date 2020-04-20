const router = require('express').Router();
let Product = require('../models/product.models');
let ProductDetails = require('../product_detail');

router.route('/').get((req,res) =>{
    Product.find()
        .then(data => res.json(data))
        .catch(err => res.status(400).json(`Error : ${err}`));
});

router.route('/add').post((req,res) => {
    let { url, saving_timeframe} = req.body;
    let today = new Date()
    console.log(`URL :${url}`);

    let productScraper = new ProductDetails(url);
    productScraper.getDetails().then(data => {

        let {title,price,currency} = data;
        title = title.split(" ");
        let title_ = "", info_ = "" ;
        title.forEach((el,elnum) => {
            if(elnum<3){
                title_ += (el+' ');
            }
            else{
                info_ += (el+' ');
            }
        })
        let newProduct = new Product({'name':title_,'price':parseFloat(price),'info':info_,'prev_price':parseFloat(price),currency,saving_timeframe,"date":today.toDateString()});
    
        newProduct.save()
                .then(() => res.json(`Successfully added to the Product Log with details`))
                .catch(err => res.status(400).json(`Error : ${err} with details`))
    })
   
})

router.route('/delete/:id').delete((req,res) => {
    let { id } = req.params
    Product.findByIdAndDelete(id)
        .then(() => res.json(`Successfully deleted the record with id : ${id}`))
        .catch(err => res.status(400).json(`Error : ${err}`));
});

module.exports = router;
