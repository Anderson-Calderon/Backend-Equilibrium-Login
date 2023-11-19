import mongoose from 'mongoose';


const ServicioSchema = mongoose.Schema({

	nombre:{


				type:String,
				required:true,
				trim:true,
                unique:true

			},

	precio:{

        type:Number,
        required:true,
        trim:true

    },
    numeroReservas:{

        type:Number,
        required:true,
        trim:true

    },
    horasSeleccionadas:{

        type:[String],
        required:true,
        trim:true

    }
	


},{

	timestamps:true

});




const Servicio = mongoose.model("Servicio",ServicioSchema);

export default Servicio;