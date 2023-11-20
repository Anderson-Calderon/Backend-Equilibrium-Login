import Reserva from '../models/ReservaModel.js';
import Servicio from '../models/ServicioModel.js';
import Usuario from '../models/UsuarioModel.js';
//import generarId from '../helpers/generarId.js';
//import {emailRegistro} from '../helpers/email.js';
import axios from 'axios';
import { v2 as cloudinary } from 'cloudinary';
import invertirFecha from '../helpers/InvertirFecha.js';
import fechaSinFormato from '../helpers/FechaSinFormato.js';
          
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

	
	
	const existeReserva = await Reserva.find({fecha,hora,servicio});

	

	const existeServicio = await Servicio.findOne({nombre:servicio});

	if(existeReserva.length>=existeServicio.numeroReservas){

		const error = new Error("No hay cupo para la hora y fecha seleccionada. Por favor vuelva a seleccionar otra,Gracias.");
    	return res.status(400).json({msg:error.message});

	}



	
	try{

		
			const result = await uploadToCloudinary(fileBuffer);

		
			req.body.captura=result.url;
			req.body.fechaSinFormato= fechaSinFormato(fecha);
			req.body.precio = existeServicio.precio;
			if(!req.body.creador){//LA RESERVA LA REALIZÓ UN CLIENTE DE LA WEB

			
				
				const cliente = await Usuario.findOne({nombre:"Cliente"});
				req.body.creador = cliente._id;
			

			}else{//LA RESERVA LA REALIZÓ UN TRABAJADOR

				req.body.aceptada=true;

			}
			

			console.log(req.body);
		
		
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


const registrarReservaSinCaptura = async (req,res)=>{

	
	const {nombre,apellidos,correo,servicio,fecha,hora} = req.body;

	
	const existeReserva = await Reserva.find({fecha,hora,servicio});


	const existeServicio = await Servicio.findOne({nombre:servicio});

	if(existeReserva.length>=existeServicio.numeroReservas){

		const error = new Error("No hay cupo para la hora y fecha seleccionada. Por favor vuelva a seleccionar otra,Gracias.");
    	return res.status(400).json({msg:error.message});

	}
	
	try{

		
		

		
			req.body.captura="https://img.freepik.com/vector-premium/ilustracion-aislada-vector-2d-oficina-correos-local_151150-12341.jpg?w=2000";
			req.body.fechaSinFormato= fechaSinFormato(fecha);
			
		
			
			
			req.body.precio = existeServicio.precio;

			
			
			const reserva = new Reserva(req.body);

			
			const nuevaReserva = await  reserva.save();




		res.json(


					{

						"msg":"¡Reserva realizada con éxito!"

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
   


	
	const reservas = await Reserva.find();



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

const obtenerNumeroDeReservasPorFecha = async (req,res)=>{


	let fechaHoy = new Date();

	// Restar 1 día a la fecha actual
	fechaHoy.setDate(miFecha.getDate() - 1);

	console.log(fechaHoy);
	Reserva.aggregate([


		{
			$match: {
			  fechaSinFormato: { $gte: fechaHoy }  // Filtra las fechas mayores o iguales a la fecha actual
			}
		  },
		{
		  $group: {
			_id: {

				fecha: '$fecha',
       			aceptada: '$aceptada'

			},
			count: { $sum: 1 }
		  }
		}
	  ])
	  .then(results => {
		
	

	
		const fechasAPintar = results.map((result)=>{

			let textoReservaOReservas = "";
			let textoAceptada = "";
			let color = "";


			
			if(result.count==1){

				textoReservaOReservas="Reserva"

				if (result._id.aceptada) {
					textoAceptada = "Aceptada";
					color="#6A6BEF";

				  } else {
					textoAceptada = "Sin Aceptar";
					color="#B91C1C";
				  }

			}else{

				textoReservaOReservas="Reservas"

				if (result._id.aceptada) {
					textoAceptada = "Aceptadas";
					color="#6A6BEF";
				  } else {
					textoAceptada = "Sin Aceptar";
					color="#B91C1C";
				  }

			}


		

		


			return{

					title : result.count+" "+textoReservaOReservas+ " "+textoAceptada,
					start : invertirFecha(result._id.fecha),
					description: 'Reservas en la fecha seleccionada',
					color,
					
					

				}

		});

	

		
		res.json(fechasAPintar);
	  })
	  .catch(error => {
		console.error(error);
	  });


}

const obtenerReservasPorFecha = async (req,res)=>{

	const {fechaSeleccionada} = req.params;

	const reservas =  await Reserva.find({fecha:invertirFecha(fechaSeleccionada)});


	
	res.json(reservas);
	

}


const aceptarReserva= async (req,res)=>{


	


	
	const {_id} = req.body;

	
	const existeReserva = await Reserva.findById(_id);
	

	
	
	

	if(existeReserva){


	

		try{

	

		
			existeReserva.aceptada = true;
		 	await existeReserva.save();

			res.json({"msg":"TODO CORRECTO"});

		

		}catch(error){


			console.log("ERROR : ",error);


		}


	}else{

		const error = new Error("El usuario que intenta editar no existe");

		return res.status(404).json({msg:error.message});


	}




	


}


const obtenerReservasAPartirDeHoy = async (req,res)=>{

	let fechaActual = new Date() ;

	fechaActual.setDate(  fechaActual.getDate() - 5 );

	

	const reservas =  await Reserva.find({ fechaSinFormato: { $gte: fechaActual } });

	
	
	res.json(reservas);




}







export {


			registrar,
			obtenerReservas,
			eliminarReserva,
			obtenerNumeroDeReservasPorFecha,
			obtenerReservasPorFecha,
			aceptarReserva,
			obtenerReservasAPartirDeHoy,
			registrarReservaSinCaptura


		}