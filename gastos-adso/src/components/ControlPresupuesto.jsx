import { useState, useEffect } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

const ControlPresupuesto = ({
  gastos, 
  setGastos, 
  presupuesto, 
  setPresupuesto,
  setValidPresupuesto
}) => {

  const[porcentaje, setPorcentaje] = useState (0)
  const[disponible, setDisponible] = useState (0)
  const[gastado, setGastado] = useState (0)

  useEffect(() =>{
    const totalGastado =gastos.reduce((total, gastado) => gastado.cantidad + total, 0)
    
    const totalDisponible = presupuesto - totalGastado

    //porcentaje

    const nuevoPresupuesto = (((presupuesto - totalDisponible)/presupuesto)*100).toFixed(2)

    setPorcentaje(nuevoPresupuesto)


    setDisponible(totalDisponible)
    setGastado(totalGastado)
    setTimeout(() =>{
      setPorcentaje(nuevoPresupuesto)
    }, 1500)
  }, [gastos])

  const formatearCantidad = (cantidad) =>{

    var formatter = new Intl.NumberFormat('es-CO',{  
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    })
    return formatter.format(cantidad)

  }
  const handleResetApp = () => {
    const resultado = confirm('¿Desea reiniciar el presupuesto y gastos?')

    if (resultado)
      setGastos([])
      setPresupuesto(0)
      setValidPresupuesto(false)
  }

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
        <div>
            <CircularProgressbar
// ``

            // color a la linea
            styles={buildStyles({

              pathColor:porcentaje > 100 ? '#DC2626' : '#3B82F6' ,
              trailColor:'#F5F5F5',
              textColor:porcentaje > 100 ? '#DC2626' : '#3B82F6' ,

            })}
              value={porcentaje}
              text={`${porcentaje}% Gastado`}
            />
        </div>

        <div className="contenido-presupuesto">
          <button 
            className="reset-app"
            type="button"
            onClick={handleResetApp}
          >
            Resetear App
          </button>
            <p>
                <span>Presupuesto: </span> {formatearCantidad(presupuesto)}
            </p>
            <p className={`${disponible < 0 ? 'negativo' : ''}`}>
                <span>Disponible: </span> {formatearCantidad(disponible)}
            </p>
            <p>
                <span>Gastodo: </span> {formatearCantidad(gastado)}
            </p>
        </div>

      
    </div>
  )
}

export default ControlPresupuesto 
