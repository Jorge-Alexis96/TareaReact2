import React, { useState, useEffect, Fragment } from 'react'
import Cargando from './../../componentes/Cargando';
import PedidosTabla from './componentes/PedidosTabla';
import PedidosForm from './componentes/PedidosForm';
const Pedidos = () => {

  const endpoint = "https://5ed2789e717d5f00165181dc.mockapi.io/pedido";
  const [cargando, setCargando] = useState(true);
  const [pedidos, setPedidos] = useState([]);

  //objRepartidor es una variable de estado, la cual va a contener
  // un objeto de tipo repartidor si y solo si, queremos editar
  // a un repartidor, en caso contrario su valor sera null

  const [objPedido, setObjPedido] = useState(null);

  const getPedidos = () => {
    if (!cargando) {
      setCargando(true);
    }

    fetch(endpoint).then((response) => {
      response.json().then((data) => {
        setCargando(false);
        setPedidos(data);
      })
    })
  }

  useEffect(() => {
    getPedidos();
  }, [])

  return (
    <Fragment>
      <div className="row justify-content-center">
        <div className="col-md-8">
        
          <PedidosForm
            getPedidos={getPedidos}
            objPedidor={objPedido}
            setObjPedido={setObjPedido}
          />
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-8">
          {
            cargando === true ?
              <Cargando tipo="info" texto="Cargando Pedidos" /> :
              <PedidosTabla
                pedidos={pedidos}
                pedidos={pedidos}
                setObjPedido={setObjPedido}
              />
          }
        </div>
      </div>
    </Fragment>
  )
}

export default Pedidos