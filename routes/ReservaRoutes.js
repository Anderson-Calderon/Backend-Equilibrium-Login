import express from 'express';
import {registrar,obtenerReservas,eliminarReserva} from '../controllers/ReservaControllers.js';
import multer from 'multer';

const upload = multer();
const reservaRouter = express.Router();

reservaRouter.post("/",upload.single("captura"), registrar);
reservaRouter.get("/", obtenerReservas);
reservaRouter.delete("/:idReserva",eliminarReserva);




export default reservaRouter;