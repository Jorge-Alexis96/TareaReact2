import React, { useState, useEffect, Fragment } from 'react'
import Cargando from './../../componentes/Cargando';
import RepartidoresTabla from './componentes/RepartidoresTabla';
import RepartidorForm from './componentes/RepartidorForm';
import RepartidorFormV2 from './componentes/RepartidorFormV2';
const Repartidores = () => {

  const endpoint = "https://5ed2789e717d5f00165181dc.mockapi.io/repartidor";
  const [cargando, setCargando] = useState(true);
  const [repartidores, setRepartidores] = useState([]);

  //objRepartidor es una variable de estado, la cual va a contener
  // un objeto de tipo repartidor si y solo si, queremos editar
  // a un repartidor, en caso contrario su valor sera null

  const [objRepartidor, setObjRepartidor] = useState(null);

  const getRepartidores = () => {
    if (!cargando) {
      setCargando(true);
    }

    fetch(endpoint).then((response) => {
      response.json().then((data) => {
        setCargando(false);
        setRepartidores(data);
      })
    })
  }

  useEffect(() => {
    getRepartidores();
  }, [])

  return (
    <Fragment>
      <div className="row justify-content-center">
        <div className="col-md-8">
          {/* <RepartidorForm
            getRepartidores={getRepartidores}
            objRepartidor={objRepartidor}
            setObjRepartidor={setObjRepartidor}
          /> */}
          <RepartidorFormV2
            getRepartidores={getRepartidores}
            objRepartidor={objRepartidor}
            setObjRepartidor={setObjRepartidor}
          />
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-8">
          {
            cargando === true ?
              <Cargando tipo="info" texto="Cargando repartidores" /> :
              <RepartidoresTabla
                repartidores={repartidores}
                repartidores={repartidores}
                setObjRepartidor={setObjRepartidor}
              />
          }
        </div>
      </div>
    </Fragment>
  )
}

export default Repartidores