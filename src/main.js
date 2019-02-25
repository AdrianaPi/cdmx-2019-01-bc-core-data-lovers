var WORLDBANK; //variable que nos permite validar el test 
const dataWorldbank = WORLDBANK; //variable que nos permite enlazar la data y utlizarla
const buttonCountries = document.getElementsByClassName("btnCountry");
const selectIndicator = document.getElementById("indicator");
const dataYear = document.getElementById("data-year");
const sortSelect = document.getElementById("sort");
const buttonAverage = document.getElementById("average");
const printAverage = document.getElementById("print-average");

let dataFilter = {}; 

let resultYear= {}; //objeto con indicador filtro

let arrYear = []; // Convertir en array los años de ResultYear

let arrData = []; // Convertir en array los datos de Resultyear

//Constante para el evento y puntualizar mediante id, el resultado de la función
const buttonClick = () => { 
  let countries = event.target.id;
  let result = window.WorldBank.dataCountries(dataWorldbank, countries);
  printOption(result);
}

for (let i = 0; i < buttonCountries.length; i++) {
  buttonCountries[i].addEventListener("click", buttonClick); //Agregar evento a cada uno de los botones
}

const printOption = (result) => { // Filtrar los indicadores del select por palabra "educación"
  selectIndicator.innerHTML = ""; //Evita la acumulación de los indicadores cada vez que se da click
  dataYear.innerHTML = "";
  dataFilter = result.filter(indicator => {
    let printIndicatorName = indicator.indicatorName;
    let education = /educación/i; // Se usa la expresión regular -educación- para incorporar los indicadores al select
    let matchs = printIndicatorName.match(education);
    if (matchs !== null) {  // Retirar indicadores con valores vacíos
      let indicatorOption = `<option value="${printIndicatorName}" >${printIndicatorName}</option>`;
      selectIndicator.insertAdjacentHTML("beforeend", indicatorOption);
      return matchs
    }
  })
};

const catchObject = () => { // Capturar objeto con los datos filtrados
  let data = dataFilter;
  let matchYear = event.target.value;
  resultYear = window.WorldBank.percentAndYear(data, matchYear);
printYears (resultYear);
};

selectIndicator.addEventListener("change", catchObject); // Asignar evento al select 

const printYears = (resultYear) => {  // Imprimir los datos(año-porcentaje) del indicador-original
  dataYear.innerHTML = "";
  for (const key in resultYear) {
    if (resultYear.hasOwnProperty(key)) {
      let element = resultYear[key];
      const year = key;
      if (element !== "") {
       let indicatorDataYear = `<p><span>${year}   </span> <span>${parseFloat(element).toFixed(2)}%</span></p>`;
       for(let i in resultYear){
         arrYear.push(i)
       }
       for(let j in resultYear){
         if(resultYear[j] === ""){
          arrData.push(0)
         }else {
          arrData.push(parseInt(resultYear[j]))
         }
        }
         dataYear.insertAdjacentHTML("beforeend", indicatorDataYear);
      }
    }
  }
};

sortSelect.addEventListener('change',() => { // Asignar evento al select que ordena
  let sortValue = sortSelect.value;
  let objOrder = resultYear;
  let sortFinal = window.WorldBank.sortPercentAndYear(objOrder, sortValue);
  printPercents(sortFinal);
});

const printPercents = (sortFinal) => { // Imprimir los porcentajes ordenados, sea ascendente o descendente
  dataYear.innerHTML = " ";
      for(let value of sortFinal){
      if (value[1] !== ""){
        let indicatorDataYear = `<p><span>${value[0]}   </span> <span>${parseFloat(value[1]).toFixed(2)}%</span></p>`;  
        dataYear.insertAdjacentHTML("beforeend", indicatorDataYear);
      }}
    };

const calculateAverage = () => { //
  let arrValuesAverage = arrData;
  let averageResult = window.WorldBank.averageFunction(arrValuesAverage);
  printAverage(averageResult); 
};

buttonAverage.addEventListener("click",calculateAverage);

const printAverage = (averageResult) => {

}

 



