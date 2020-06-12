import React from 'react'
import PedidosFila from './PedidosFila'

const PedidosTabla = ({ pedidos,setObjPedido}) => {
 return (
  <table className="table table-hover table-bordered table-striped">
   <thead>
    <tr>
     <th><strong>#</strong></th>
     <th>Producto</th>
     <th>Cliente</th>
     <th>Estado</th>
     <th>Fecha</th>
     <th>Acciones</th>
    </tr>
   </thead>
   <tbody>
    {
     pedidos.map((pedido, i) => {
      return <PedidosFila numero={i}
       pedido={pedido}
       key={pedido.id} 
       setObjPedido={setObjPedido}/>
     })
    }
   </tbody>
  </table>
 )
}

export default PedidosTabla