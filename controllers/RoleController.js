import RoleModel from "../models/RoleModel.js";
import AddressModel from "../models/AddressModel.js";

export const getRoleModel = async (req,res)=> {
    try {
        const role = await RoleModel.findAll();
        res.json(role);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Failed to get Role Model"});
    }
}