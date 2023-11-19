import mongoose from 'mongoose';


const ReservaSchema = mongoose.Schema({

	nombre:{


				type:String,
				required:true,
				trim:true

			},

	apellidos:{


				type:String,
				required:true,
				trim:true

			},		
	telefono: {


				type:String,
				required:true,
				trim:true

			},
	servicio:{


				type:String,
				required:true,
				trim:true

			},
	fecha:  {


				type:String,
				required:true,
				trim:true

			},

	fechaSinFormato:{

				type:Date,
				required:true,
				trim:true

	},		
	hora:{


				type:String,
				required:true,
				trim:true

			},
	captura:{

		type:String,
		required:true,
		trim:true

	},
	aceptada:{

		type:Boolean,
		default:false,
		required:true,
		trim:true


	},
	precio:{

		type:Number,
		required:true,
		min:0

	},

	creador: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Usuario",
	  },

},

{

	timestamps:true

}
);

const Reserva = mongoose.model("Reserva",ReservaSchema);

export default Reserva;