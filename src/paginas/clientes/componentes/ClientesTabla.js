import React from 'react'
import ClientesFila from './ClientesFila'

const ClientesTabla = ({ clientes,setObjClientes}) => {
 return (
  <table className="table table-hover table-bordered table-striped">
   <thead>
    <tr>
     <th><strong>#</strong></th>
     <th>Id</th>
     <th>Nombre</th>
     <th>Apellido</th>
     <th>Estado</th>
     <th>Dni</th>
     <th>Acciones</th>
    </tr>
   </thead>
   <tbody>
    {
     clientes.map((clientes, i) => {
      return <ClientesFila numero={i}
       clientes={clientes}
       key={clientes.id} 
       setObjClientes={setObjClientes}/>
     })
    }
   </tbody>
  </table>
 )
}

export default ClientesTabla