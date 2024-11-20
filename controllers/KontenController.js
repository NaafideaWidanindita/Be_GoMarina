import KontenModel from "../models/KontenModel.js";
import AgendaModel from "../models/AgendaModel.js";
import GaleriModel from "../models/GaleriModel.js";
import MitraModel from "../models/MitraModel.js";

export const getKontenModel = async (req,res)=> {
    try {
        const konten = await KontenModel.findAll();
        res.json(konten);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Failed to get Konten Model"});
    }
}