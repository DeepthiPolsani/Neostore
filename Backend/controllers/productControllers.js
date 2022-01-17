const productModel = require('../models/productSchema')
const colorModel = require('../models/colorSchema')

const productCtrl = {
    getProducts: (req, res) =>{
        productModel.find().populate(["category_id","color_id"])
        .then((product,err)=>{
           
                if (err) {
                    throw err;
                }
          
            //console.log(product);
            else{
            res.json({ products: product})
            }
          
        })
    }    
}


module.exports = productCtrl