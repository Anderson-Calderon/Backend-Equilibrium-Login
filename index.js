import express from 'express';
import conectarDB from './config/db.js';
import dotenv from 'dotenv';
import usuarioRouter from './routes/UsuarioRoutes.js';
import reservaRouter from './routes/ReservaRoutes.js';
import areaRouter from './routes/AreaRoutes.js';
import cors from 'cors';

const app = express();

app.use(express.json());

dotenv.config();

const whiteList = [process.env.FRONT_URL,"http://localhost:5173","https://equilibriumalternativas.pe","https://vocal-narwhal-88dba8.netlify.app"];

const corsOptions = {


						origin : function(origin,callback){

												if(whiteList.includes(origin)){

													callback(null,true);

												}else{

													callback(new Error("Error de Cors D:"));

												}


											}

					}

app.use(cors(corsOptions));


conectarDB();
const PORT = process.env.PORT || 4000;

app.use("/api/reservas",reservaRouter);
app.use("/api/usuarios",usuarioRouter);
app.use("/api/areas",areaRouter);


app.listen(PORT,()=>{

	console.log("CORRIENDO EL SERVIDOR",PORT);

})

//ACÁ HACE LOS CAMBIOS 