import React from 'react'
import Gasto from './Gasto'

const ListadoGastos = ({
  gastos, 
  setGastoEditar, 
  eliminarGasto, 
  filtro, 
  gastosFiltrados
}) => {
  return (
    <div className="listado-gastos contenedor">


      {
        filtro ? (
          <>
            <h2>{gastosFiltrados.length ? 'Gastos' : 'No Hay Gastos Aún'}</h2>
              {gastosFiltrados.map(gasto => (
                <Gasto
                  key={gasto.id}
                  gasto={gasto}
                  setGastoEditar={setGastoEditar}
                  eliminarGasto = {eliminarGasto}
                />
            ))}
          </>
        ) : (
          <>
            <h2>{gastos.length ? 'Gastos' : 'Aún No Hay Gastos '}</h2>
              {gastos.map(gasto => (
                <Gasto 
                    key={gasto.id}
                    gasto={gasto}
                    setGastoEditar={setGastoEditar}
                    eliminarGasto = {eliminarGasto}
                />
            ))}
          </>
        )
      }

    
    </div>
  )
}
// 101 terminar 
export default ListadoGastos
