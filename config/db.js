import mongoose from 'mongoose';


const conectarDB = async ()=>{

	try{

		const connection = await mongoose.connect(process.env.MONGO_URI,{

			useNewUrlParser : true,
			useUnifiedTopology : true,

		});

	

	}catch(error){
		console.log("ERROR :");
		console.log(error);
		process.exit(1);

	}


}


export default conectarDB;

//acá se HACEN LOS CAMBIOS