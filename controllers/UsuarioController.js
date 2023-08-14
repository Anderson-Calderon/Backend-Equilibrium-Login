import Usuario from '../models/UsuarioModel.js';


import axios from 'axios';
import {darFechaHoyFormateada} from '../helpers/Usuario.js';


const registrar = async (req,res)=>{

	console.log("HOLA");
	const {nombre,apellido,area,dni} = req.body;


	

	 const existeUsuario = await Usuario.findOne({dni});

	

	 if(existeUsuario){

		const error = new Error("El N° DNI es único y ya hay otro usuario con el mismo número de DNI.");
    	return res.status(400).json({msg:error.message});

	}
	
	try{

		
			if(!req.body.password){

				req.body.password="asciende123";

			}
			

			req.body.fecha = darFechaHoyFormateada();
			
			const usuario = new Usuario(req.body);

			

	
			const nuevoUsuario = await  usuario.save();




		res.json(


					{

						"msg":"Usuario Registrado con exito "

					}			

				);

		

	}catch(error){

		console.log("este es un error",error);

		

	}


	
}



const obtenerUsuarios = async (req,res)=>{

	try{


		const usuarios = await Usuario.find();
		


		res.json(usuarios)

	}catch(error){

		console.log(error);

	}


}

const autenticarUsuario = async (req,res)=>{

	const {dni,password} = req.body;
	console.log("ESTE ES EL NÚMERO DE DNI : ",dni,dni.length);

	const existeUsuario = await Usuario.findOne({dni});

	

		if(!existeUsuario){
			
			const error = new Error("El usuario ingresado no existe");

			return res.status(404).json({msg:error.message})
		}

		
		if(!await existeUsuario.comprobarPassword(password)){

			const error = new Error("Password Incorrecto");

			return res.status(404).json({msg:error.message})

		}

		
	

	try{

		res.json(existeUsuario);



	}catch(error){

		console.log(error);


	}

}




const editarUsuario = async (req,res)=>{


		const {usuario:nuevoUsuario , nuevoPassword} = req.body;

		
		const existeUsuario = await Usuario.findById(nuevoUsuario._id);
		
		const existeUsuarioConMismoDNI = await Usuario.findOne({dni:nuevoUsuario.dni});

		if(existeUsuario){


			if(existeUsuarioConMismoDNI && existeUsuario.dni!= nuevoUsuario.dni ){

				const error = new Error("Ya existe un usuario con el mismo N° de DNI");

				return res.status(404).json({msg:error.message});

			}

			existeUsuario.nombre=nuevoUsuario.nombre;
			existeUsuario.apellido=nuevoUsuario.apellido;
			existeUsuario.area=nuevoUsuario.area;
			existeUsuario.dni=nuevoUsuario.dni;

			if(nuevoPassword){

				existeUsuario.password = nuevoPassword;
			}

				try{

		

			 
		
			

			

			 await existeUsuario.save();

			res.json({"msg":"TODO CORRECTO"});

			

		}catch(error){


			console.log("ERROR : ",error);


		}


		}else{

			const error = new Error("El usuario que intenta editar no existe");

			return res.status(404).json({msg:error.message});


		}




		
	

	}

const eliminarUsuario = async (req,res)=>{

	const {id} = req.params;

	const usuarioExiste = await Usuario.findById(id);

	if(!usuarioExiste){

		const error = new Error("Este usuario no existe");

		return res.status(404).json({msg:error.message});
	}


	try{

		await Usuario.deleteOne();

		res.json({"msg":"Usuario eliminado Correctamente"})

	}catch(error){

		console.log(error);

	}

}


export {


			registrar,
			obtenerUsuarios,
			autenticarUsuario,
			editarUsuario,
			eliminarUsuario

		}