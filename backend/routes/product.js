const router = require('express').Router();
let Product = require('../models/product.models');
let ProductDetails = require('../product_detail');
let moment = require('moment')
router.route('/').get((req,res) =>{
    Product.find()
        .then(data => res.json(data))
        .catch(err => res.status(400).json(`Error : ${err}`));
});

router.route('/add').post((req,res) => {
    let { url, saving_timeframe} = req.body;
    let today = new Date()
    // console.log(`URL :${url}`);

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
        let newProduct = new Product({'url':url,'name':title_,'price':parseFloat(price),'info':info_,'prev_price':parseFloat(price),currency,saving_timeframe,"date":today.toISOString()});
    
        newProduct.save()
                .then(() => res.json(`Successfully added to the Product Log with details`))
                .catch(err => res.status(400).json(`Error : ${err} with details`))
    })
   
})

router.route('/delete/:id').delete((req,res) => {
    let { id } = req.params;
    console.log(`Deleting the record with ID ${id}`);
    Product.findByIdAndDelete(id)
        .then(() => res.json(`Successfully deleted the record with id : ${id}`))
        .catch(err => res.status(400).json(`Error : ${err}`));
});


router.route('/updateprice').post((req,res)=>{
    Product.find()
        .then(products => {
            var time = moment();
            var diff_time = time.subtract(parseInt(1),'minutes').toISOString();
            products.forEach(product => {
                let { id, url, name, currency, info, price, prev_price, saving_timeframe , date}  = product;
                date = new Date(date).toISOString();
                // console.log(date,JSON.stringify(diff_time));
                if(date < diff_time){
                    console.log(`Updating the product log details`);
                    let productDetails = new ProductDetails(url);
                    productDetails.getDetails().then(data => {
                        let {price:newPrice} = data;
                        console.log(price,newPrice);
                        if(newPrice != parseFloat(price)){
                            product.price = newPrice;
                            product.prev_price = price;
                        // console.log(`\nUpdated product log : ${JSON.stringify(product)}`)
                            product.save()
                            .then(() => console.log(`Sucessfully updated the product`))
                            .catch(err => res.status(400).json(`Error : ${err}`))
                        }            
                    });
                    
                } 
            });
            return res.json(`Successfully Updated`);

        })
        .catch(err => res.status(400).json(`Error : ${err}`));
})

module.exports = router;
