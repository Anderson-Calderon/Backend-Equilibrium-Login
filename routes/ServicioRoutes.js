import express from 'express';
import {crearServicio,obtenerServicios,editarServicio,eliminarServicio} from '../controllers/ServicioController.js';



const servicioRouter = express.Router();


servicioRouter.post("/", crearServicio);
servicioRouter.get("/", obtenerServicios);

servicioRouter.put("/:id",editarServicio);

servicioRouter.delete("/:id",eliminarServicio);




export default servicioRouter;