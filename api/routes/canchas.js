import express from "express";
import Cancha from "../models/Cancha.js";
import { countByCity, countByType, createCancha, deleteCancha, getCancha, getCanchas, updateCancha } from "../controllers/cancha.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//CREATE
router.post("/", verifyAdmin, createCancha);

//UPDATE
router.put("/:id",verifyAdmin, updateCancha);

//DELETE
router.delete("/:id",verifyAdmin,deleteCancha);
//GET
router.get("/find/:id",getCancha);
//GET ALL
router.get("/",getCanchas);
router.get("/countByCity",countByCity);
router.get("/countByType",countByType);



export default router;