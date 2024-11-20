import ProductModel from "../models/ProductModel.js";
import ReviewModel from "../models/ReviewModel.js";

export const getProductModel = async (req,res)=> {
    try {
        const product = await ProductModel.findAll();
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Failed to get Product Model"});
    }
}