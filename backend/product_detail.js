let axios = require('axios')
let cheerio = require('cheerio')

class ProductDetails{

    constructor(url){
        this.url = url;
        this.different_tags = ['#priceblock_ourprice','#priceblock_dealprice']
    }

    async getDetails(){
        await this.getHTML().then( data => {
            this.data = data;
            this.getAmazonTitle(data).then(title => {
                // console.log(`Title : ${title}`)
                this.title = title
            })
            let price = this.getAmazonPrice(data)
            console.log(`Price : ${price} ${price.split(";")}`)
            let [currency,price_] = price.split(";");
            this.price = price_.split(",").reduce((a,b) => a+b);
            console.log(`this.price:${this.price}`); 
            this.currency = currency.split("&")[0]
            console.log(`this.currency:${this.currency}`);
        });
        return {"title":this.title,"price":this.price,"currency":this.currency}
    }

    async getHTML(){
        const htmlData = await axios.get(this.url,{
            headers: {
                'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.90 Safari/537.36'
            }
        })
        .catch(error => {
            console.log(error);
        });

        let {data: html} = htmlData;
        return html
    }

    async getAmazonTitle(data){
        const htmltitle = cheerio.load(data);
        let title = String(htmltitle('#title').text().trim());
        console.log(title);
        return title

    }

    getAmazonPrice(data,id=0){
        let price = String(cheerio.load(data)(this.different_tags[id]).html());
        console.log(`Price of the product is ${price}`);
        if (price !== undefined){
            return(price);
        }
        else if(id <= this.different_tags.length && price === undefined){
            return this.getAmazonPrice(data,id+1);
        }
        
    }

}

module.exports = ProductDetails