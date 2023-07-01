const Product = require("../models/product")

const getAllProducts = async(req,res)=>{
    const {company,name,featured,sort,select} = req.query;
    const queryObject = {};
    if(company){
        queryObject.company = company;
        
    }
    if(featured){
        queryObject.featured = featured;
        
    }
    if(name){
        queryObject.name = {$regex: name,$options:"i"};
        // console.log(queryObject.company);
    }
    
    let apiData = Product.find(queryObject);

    if(sort){
        let sortFix = sort.split(',').join(' ');
        apiData = apiData.sort(sortFix);
    }

    if(select){
        let selectFix = select.split(',').join(' ');
        apiData = apiData.select(selectFix);
    }

    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 5;
    let skip = (page - 1) * limit;

    // console.log(queryObject);
    const Product = await apiData.skip(skip).limit(limit);

    res.status(200).json({Product,nbHits: Product.length})
};


const getAllProductsTesting = async(req,res)=>{
    const Product = await Product.find(req.query);
    console.log(req.query);
    res.status(200).json({Product})
};

module.exports = {getAllProducts,getAllProductsTesting};