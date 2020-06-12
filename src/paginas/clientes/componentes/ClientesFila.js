import React, { useState, useEffect } from 'react'
import Switch from 'react-switch'
import { URL_BACKEND } from '../../../variables/variables';


const ClientesFila = ({ clientes, numero, setObjClientes }) => {

  const [checked, setChecked] = useState(false);
  const putCliente = () => {
    let nuevoCliente = {...clientes};
    nuevoCliente.cli_est = !checked + "";
    
    const endpoint = `${URL_BACKEND}/cliente/${clientes.id}`;
    fetch(endpoint, {
      method:'PUT',
      headers: {
        "content-type":"application/json"
      },
      body:JSON.stringify(nuevoCliente)
    }).then((response) =>{
      response.json().then((data)=> {
        console.log(data);
        //Aqui nos aseguramos que el repartidor, ha cambiado su
        // estado
        setChecked(!checked)
      })
    })
  }

  useEffect(() => {
    if (clientes.cli_est === "true") {
      setChecked(true);
    }
  }, [])

  return (
    <tr>
      <td>{numero}</td>
      <td>{clientes.id}</td>
      <td>{clientes.cli_nom}</td>
      <td>{clientes.cli_ape}</td>
      <td>
        {
          checked ?
            <span className="badge badge-success">Habilitado</span> :
            <span className="badge badge-danger">Inhabilitado</span>
        }
        <Switch
          checked={checked}
          onChange={putCliente} />

      </td>
      <td>{clientes.cli_dni}</td>
      <td>
        <button className="btn btn-info" onClick={() => {
          setObjClientes(clientes);
        }}>
          Editar
     </button>
      </td>
    </tr>
  )
}

export default ClientesFila