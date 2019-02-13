//Objeto global
window.WorldBank = {
  dataCountries: (data, countries) => { //Función para extraer la data por país. 
  let dataByCountries = data[countries].indicators //Obtener los objetos por país.
  return dataByCountries;
  },
  percentAndYear:(data, matchYear) =>{ // Función para integrar al select los indicadores educativos.
    let newData= {} //Crear objeto vacío para agregar la condición de búsqueda por palabra: educación.
    data.forEach(objeto => { //Recorre el objeto-data.
      if(objeto.indicatorName === matchYear){ //Entra al objeto, busca el indicador por nombre y extrae la coincidencia.
        newData = objeto.data //Incorpora a newData el nuevo objeto filtrado.
        return newData 
      }
    });
    return newData
  }
};




