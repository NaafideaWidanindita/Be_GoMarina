import FeedbackModel from "../models/FeedbackModel.js"

export const getFeedbackModel = async (req,res)=> {
    try {
        const feedback = await FeedbackModel.findAll();
        res.json(feedback);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Failed to get Feedback Model"});
    }
}