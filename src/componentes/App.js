import React, {Component} from 'react';
import Header from './Header'
import Formulario from './Formulario';
import Resumen from './Resumen';
import {obtenerDiferenciaAnio, calcularMarca, obtenerPlan} from './Helper';
import Resultado from './Resultado';

class App extends Component {

  //Aqui crearemos el state, state es la variable que comparten todos los componentes
  state = {
    resultado: '',
    datos: {}
  }

  cotizarSeguro = (datos) =>{
    //hacemos un destructuring
    const {marca, plan, year} = datos;

    //Agregar una base de 2000
    let resultado = 2000;

    //Obtener la diferencia de años y
    const diferencia = obtenerDiferenciaAnio(year);

    //por cada año restar el 3% al valor del seguro
    resultado -= ((diferencia * 3) * resultado) / 100;

    //Americano 15%, asiatico 5% y europeo 30% de incremento al valor actual
    resultado = calcularMarca(marca) * resultado;

    //el plan del auto, el basico incrementa el valor 20% y el completo 50%
    let incrementoPlan = obtenerPlan(plan);

    //dependiendo del plan incrementar
    resultado = parseFloat(incrementoPlan * resultado).toFixed(2);

    //creamos el objeto para el resumen
    const datosAuto = {
      marca: marca,
      plan: plan,
      year: year
    }

    //ya tenemos el costo
    //console.log(resultado);
    this.setState({
      resultado: resultado,
      datos: datosAuto
    });

  }
  render () {
    return (    
      <div className="contenedor">
        <Header 
          titulo='Cotizador de seguro de auto'
        />
        
        <div className='contenedor-formulario'>
          <Formulario 
             cotizarSeguro={this.cotizarSeguro}
          />
          <Resumen 
            datos={this.state.datos}          
          />
          <Resultado 
            resultado={this.state.resultado}
          />
        </div>
  
      </div>
    );
  }
  
  
}

export default App;
