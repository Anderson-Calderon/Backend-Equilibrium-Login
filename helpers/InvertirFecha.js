const invertirFecha = (fecha)=>{

    const elementosFecha = fecha.split("-");

    return elementosFecha[2]+"-"+elementosFecha[1]+"-"+elementosFecha[0];




}

export default invertirFecha;