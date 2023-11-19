
import Servicio from '../models/ServicioModel.js';

 const crearServicio = async (req,res)=>{


  
 
	const {nombre} = req.body;

	

	const existeServicio =await  Servicio.findOne({nombre});

	

	if(existeServicio){

		const error = new Error("Ya existe un servicio con el mismo nombre");

		return res.status(400).json({msg:error.message});

	}

	try{

		const servicioNuevo = new Servicio(req.body);
		const nuevoServicio = await servicioNuevo.save();
		
		res.json({

			"msg":"¡Servicio Agregado correctamente!"

		});

	}catch(e){
		
		console.log(e);

	}

}


const obtenerServicios = async (req,res)=>{


	const servicios = await  Servicio.find();

	res.json(servicios);

}



const editarServicio = async (req,res)=>{





	const {id} = req.params;

   const {nombre,precio,numeroReservas,horasSeleccionadas} = req.body;

   
	
	const servicio= await Servicio.findById(id);

	const servicioExisteConNombreIgual = await Servicio.findOne({nombre});

	

    

	if(!servicio){

		const error = new Error("El servicio que desea actualizar no existe");
		

		return res.status(400).json({msg:error.message});


	}


    if(servicio.nombre!= nombre){//Si estoy editando el nombre , entonces verifico que ese nuevo nombre
                                // del servicio no lo tenga otro servicio


        if(servicioExisteConNombreIgual){

            const error = new Error("Ya Existe un servicio con el mismo nombre");
        

		    return res.status(400).json({msg:error.message});

        }


    }
	


	servicio.nombre = nombre;
    servicio.precio = precio;
    servicio.numeroReservas = numeroReservas;
    servicio.horasSeleccionadas = horasSeleccionadas;

	try{

		await servicio.save();

		res.json({"msg":"¡Servicio editado correctamente!"});

	}catch(error){

		console.log(error);

	}


}


const eliminarServicio = async (req,res)=>{

	const {id}=req.params;
 
	const servicio = await Servicio.findById(id);

	try{


		await servicio.deleteOne();

		res.json({

			"msg":"¡Servicio eliminado correctamente!"

		});


	}catch(e){

		console.log(e);

	}

}






export {

    crearServicio,
    obtenerServicios,
    editarServicio,
    eliminarServicio


}