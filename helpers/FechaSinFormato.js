const fechaSinFormato = (fecha)=>{

    const partesFecha  = fecha.split("-");

    const dia = parseInt(partesFecha[0], 10);
    const mes = parseInt(partesFecha[1], 10) - 1; // Restar 1 al mes
    const año = parseInt(partesFecha[2], 10);

    

    const fechaObjeto = new Date(año, mes, dia);

   
       return fechaObjeto;

}


export default fechaSinFormato;