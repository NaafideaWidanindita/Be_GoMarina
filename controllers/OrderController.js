import OrderModel from "../models/OrderModel.js";
import Order_ItemModel from "../models/Order_ItemModel.js";
import Card_ItemModel from "../models/Card_ItemModel.js";
import PaymentModel from "../models/PaymentModel.js";
import DeliveryModel from "../models/DeliveryModel.js";

export const getOrderModel = async (req,res)=> {
    try {
        const order = await OrderModel.findAll();
        res.json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Failed to get Order Model"});
    }
}