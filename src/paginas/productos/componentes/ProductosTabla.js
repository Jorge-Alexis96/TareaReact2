import React from 'react'
import ProductoFila from './ProductoFila'

const ProductoTabla = ({ productos,setObjProducto}) => {
 return (
  <table className="table table-hover table-bordered table-striped">
   <thead>
    <tr>
     <th><strong>#</strong></th>
     <th>Nombre</th>
     <th>Precio</th>
     <th>Estado</th>
     <th>IMG</th>
     <th>Acciones</th>
    </tr>
   </thead>
   <tbody>
    {
     productos.map((producto, i) => {
      return <ProductoFila numero={i}
       producto={producto}
       key={producto.id} 
       setObjProducto={setObjProducto}/>
     })
    }
   </tbody>
  </table>
 )
}

export default ProductoTabla