import express from "express";
import {updateUser, deleteUser, getUser, getUsers} from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// router.get("/checkauthentication", verifyToken, (req,res,next)=>{
//     res.send ("Hola usuario, usted se ha logueado!")
// } )
// router.get("/checkuser/:id", verifyUser, (req,res,next)=>{
//     res.send ("Hola usuario, usted se ha logueado y puede eliminar su cuenta!")
// } )
// router.get("/checkadmin/:id", verifyAdmin, (req,res,next)=>{
//     res.send ("Hola admin, usted se ha logueado y puede eliminar todas las cuentas!")
// } )
//UPDATE
router.put("/:id",verifyUser,updateUser);

//DELETE
router.delete("/:id",verifyUser,deleteUser);
//GET
router.get("/:id",verifyUser,getUser);
//GET ALL
router.get("/",verifyAdmin,getUsers);

export default router;

