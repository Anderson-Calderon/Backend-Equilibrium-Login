import Reserva from '../models/ReservaModel.js';
//import generarId from '../helpers/generarId.js';
//import {emailRegistro} from '../helpers/email.js';
import axios from 'axios';
import { v2 as cloudinary } from 'cloudinary';

          
cloudinary.config({ 
  cloud_name: 'dvjmc7yvw', 
  api_key: '264174669442966', 
  api_secret: 'wVPTwV9ZCbAijNiBttEGKctls2I' 
});

const registrar = async (req,res)=>{

	
	const fileBuffer = req.file.buffer;
	let urlImagenSubida ;

	const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream({ resource_type: 'auto', crop: 'limit' }, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    }).end(fileBuffer);
  });
};






	const {nombre,apellidos,correo,servicio,fecha,hora} = req.body;



	const existeReserva = await Reserva.find({fecha,hora});


	if(existeReserva.length==4){

		const error = new Error("No hay cupo para la hora y fecha seleccionada. Por favor vuelva a seleccionar otra,Gracias.");
    	return res.status(400).json({msg:error.message});

	}
	
	try{

		
			const result = await uploadToCloudinary(fileBuffer);

		
			req.body.captura=result.url;
			
		
			const reserva = new Reserva(req.body);

			
			const nuevaReserva = await  reserva.save();




		res.json(


					{

						"msg":"Te esperamos el "

					}			

				);

		

	}catch(error){

		console.log("este es un error",error);

		

	}


	
}

const obtenerReservas = async (req,res)=>{

	let fechaActualizada = new Date();
      
    const options = {year:"numeric",month:"2-digit",day:"2-digit"} ;

    let fechaHoyFormateada = fechaActualizada.toLocaleDateString("es-ES",options);
   
     fechaHoyFormateada = fechaHoyFormateada.replace(/\//g,"-");
   


	//{fecha:{ $gte:fechaHoyFormateada}}
	const reservas = await Reserva.find();

	console.log(reservas);

	res.json(reservas);


}


const eliminarReserva = async (req,res)=>{

	const {idReserva} = req.params;



	const reserva =  await Reserva.findById(idReserva);

	const urlCaptura = reserva.captura,
		  partesUrlCaptura = urlCaptura.split("/"),
		   idCaptura = partesUrlCaptura[partesUrlCaptura.length - 1].split(".")[0];
		 

		await cloudinary.uploader.destroy(idCaptura);

	

	try{

			await reserva.deleteOne();


			res.json({

							msg:"Reserva Eliminada Con Éxito!"

					  });


		}catch(error){


			console.log(error);

		}
	

}




export {


			registrar,
			obtenerReservas,
			eliminarReserva


		}