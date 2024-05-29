import { useState, useEffect } from 'react'
import Header from './components/Header'
import Filtros from './components/Filtros'
import IconoNuevoGasto from './img/nuevo-gasto.svg'
import Modal from './components/Modal'
import { generarId } from './helpers'
import ListadoGastos from './components/ListadoGastos'


function App() {
  // Inicializar estado presupuesto y validez
  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto')) ?? 0
  )
  const [isValidPresupuesto, setValidPresupuesto] = useState(false)

  const[modal, setModal] = useState(false)
  const[animarModal, setAnimarModal] = useState(false)
  const[gastos, setGastos] = useState(
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
  )

  const [gastoEditar, setGastoEditar] = useState({})

  const [filtro, setFiltro] = useState ('')
  const [gastosFiltrados, setGastosFiltrados] = useState([])

  useEffect(() => {
    if( Object.keys(gastoEditar).length > 0){
      setModal(true)

      setTimeout(() =>{
        setAnimarModal(true)
      }, 500);
    }
  },[ gastoEditar ])
// se uriliza cuando el presupuesto cambia
useEffect(() => {
  localStorage.setItem('presupuesto', presupuesto ?? 0 )
}, [presupuesto])

//cuando cambia el gasto
useEffect(() => {
  localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])
}, [gastos])
//cuando cambia el filtro
useEffect(() =>{
  if (filtro){
    //filtros gastados por categoria
    const gastosFiltrados = gastos.filter(gasto => gasto.categoria === filtro)

    setGastosFiltrados(gastosFiltrados)
  }
}, [filtro])

//se ejecuta cuando inicia la aplicacion
useEffect(() =>{
  const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0
  
  if(presupuestoLS > 0) {  
    setValidPresupuesto(true)
  }
}, [])



// animacion del modal 
  const handleNuevoGasto = () => {
    setModal(true)
    setGastoEditar({})

    setTimeout(() =>{
      setAnimarModal(true)
    },500);
  }
  const guardarGasto = gasto =>{
    if (gasto.id){
      // actualizar
      const gastosActualizados = gastos.map(gastoState => gastoState.id ===
        gasto.id ? gasto : gastoState)
        setGastos(gastosActualizados)
        setGastoEditar({})
        
    }else{
      gasto.id = generarId()
      gasto.fecha = Date.now()
      setGastos([...gastos, gasto])
    }

    

    setAnimarModal(false)
    setTimeout(() =>{
      setModal(false)
    },500)
  }

  const eliminarGasto = id => {
    const gastosActualizados = gastos.filter( gasto => gasto.id !== id)
    setGastos(gastosActualizados)
  }
  // Renderizar componente Header con props necesarias
  return (
    <div className={modal ? 'fijar' : '' }>
      <Header

        gastos={gastos}
        setGastos={setGastos}
        // Pasar estado presupuesto y setter como props
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        // Pasar estado validez presupuesto y setter como props
        isValidPresupuesto={isValidPresupuesto}
        setValidPresupuesto={setValidPresupuesto}
      />

      {isValidPresupuesto && ( 
        <>
        <main>
          <Filtros 
            filtro={filtro}
            setFiltro={setFiltro}
          />
          <ListadoGastos 
            gastos={gastos}
            setGastoEditar={setGastoEditar}
            eliminarGasto={eliminarGasto}  
            filtro={filtro}
            gastosFiltrados={gastosFiltrados}
          />
        </main>
          <div className="nuevo-gasto"> 
            <img 
              src={IconoNuevoGasto} 
              alt="icono nuevo gasto" 
              onClick={handleNuevoGasto}
            /> 

          </div>
        </>
      )}

      {modal && <Modal
                  setModal={setModal}
                  animarModal={animarModal}
                  setAnimarModal={setAnimarModal}
                  guardarGasto={guardarGasto}
                  gastoEditar={gastoEditar}
                  setGastoEditar={setGastoEditar}

                />}
        
    </div>
  )
}

export default App
