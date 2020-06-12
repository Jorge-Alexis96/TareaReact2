import React, { useState, useEffect, Fragment } from 'react'
import Cargando from './../../componentes/Cargando';
import ProductosTabla from './componentes/ProductosTabla';
import ProductosForm from './componentes/ProductosForm';
const Productos = () => {

  const endpoint = "https://5ed2789e717d5f00165181dc.mockapi.io/producto";
  const [cargando, setCargando] = useState(true);
  const [productos, setProductos] = useState([]);

  //objRepartidor es una variable de estado, la cual va a contener
  // un objeto de tipo repartidor si y solo si, queremos editar
  // a un repartidor, en caso contrario su valor sera null

  const [objProducto, setObjProducto] = useState(null);

  const getProductos = () => {
    if (!cargando) {
      setCargando(true);
    }

    fetch(endpoint).then((response) => {
      response.json().then((data) => {
        setCargando(false);
        setProductos(data);
      })
    })
  }

  useEffect(() => {
    getProductos();
  }, [])

  return (
    <Fragment>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <ProductosForm
            getProductos={getProductos}
            objProducto={objProducto}
            setObjProducto={setObjProducto}
          />
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-8">
          {
            cargando === true ?
              <Cargando tipo="info" texto="Cargando repartidores" /> :
              <ProductosTabla
                productos={productos}
                productos={productos}
                setObjProducto={setObjProducto}
              />
          }
        </div>
      </div>
    </Fragment>
  )
}

export default Productos
