import express from 'express';
import {
    
        registrar,obtenerReservas,
        eliminarReserva,
        obtenerNumeroDeReservasPorFecha,
        obtenerReservasPorFecha,
        aceptarReserva,
        obtenerReservasAPartirDeHoy,
        registrarReservaSinCaptura
        
        } from '../controllers/ReservaControllers.js';


import multer from 'multer';

const upload = multer();
const reservaRouter = express.Router();

reservaRouter.post("/",upload.single("captura"), registrar);

reservaRouter.post("/reservaSinCaptura", registrarReservaSinCaptura);



reservaRouter.get("/", obtenerReservas);



reservaRouter.get("/obtenerNumeroDeReservasPorFecha", obtenerNumeroDeReservasPorFecha);
reservaRouter.get("/obtenerReservasPorFecha/:fechaSeleccionada", obtenerReservasPorFecha);
reservaRouter.get("/obtenerReservasAPartirDeHoy", obtenerReservasAPartirDeHoy);



reservaRouter.put("/", aceptarReserva);
reservaRouter.delete("/:idReserva",eliminarReserva);




export default reservaRouter;