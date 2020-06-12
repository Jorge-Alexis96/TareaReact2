import React, { useState, useEffect } from 'react'
import Switch from 'react-switch'
import { URL_BACKEND } from '../../../variables/variables';


const RepartidorFila = ({ repartidor, numero, setObjRepartidor }) => {

  const [checked, setChecked] = useState(false);
  const putRepartidor = () => {
    let nuevoRepartidor = {...repartidor};
    nuevoRepartidor.rep_est = !checked + "";
    // al nuevo repartidor le colocamos el estado contrario
    // al que tiene el componente actualmente,
    // esto se da por que si no es true es false(dicotomico)
    const endpoint = `${URL_BACKEND}/repartidor/${repartidor.id}`;
    fetch(endpoint, {
      method:'PUT',
      headers: {
        "content-type":"application/json"
      },
      body:JSON.stringify(nuevoRepartidor)
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
    if (repartidor.rep_est === "true") {
      setChecked(true);
    }
  }, [])

  return (
    <tr>
      <td>{numero}</td>
      <td>{repartidor.id}</td>
      <td>{repartidor.rep_nom}</td>
      <td>{repartidor.rep_ape}</td>
      <td>
        {
          checked ?
            <span className="badge badge-success">Habilitado</span> :
            <span className="badge badge-danger">Inhabilitado</span>
        }
        <Switch
          checked={checked}
          onChange={putRepartidor} />

      </td>
      <td>{repartidor.rep_dni}</td>
      <td>
        <button className="btn btn-info" onClick={() => {
          setObjRepartidor(repartidor);
        }}>
          Editar
     </button>
      </td>
    </tr>
  )
}

export default RepartidorFila