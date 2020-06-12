import React, { useState, useEffect } from 'react'
import Switch from 'react-switch'
import { URL_BACKEND } from '../../../variables/variables';


const ProductoFila = ({ producto, numero, setObjProducto }) => {

  const [checked, setChecked] = useState(false);
  const putProducto = () => {
    let nuevoProducto = {...producto};
    nuevoProducto.pro_est = !checked + "";
    // al nuevo repartidor le colocamos el estado contrario
    // al que tiene el componente actualmente,
    // esto se da por que si no es true es false(dicotomico)
    const endpoint = `${URL_BACKEND}/producto/${producto.id}`;
    fetch(endpoint, {
      method:'PUT',
      headers: {
        "content-type":"application/json"
      },
      body:JSON.stringify(nuevoProducto)
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
    if (producto.pro_est === "true") {
      setChecked(true);
    }
  }, [])

  return (
    <tr>
      <td>{numero}</td>
      <td>{producto.pro_nom}</td>
      <td>{producto.pro_prec}</td>
      <td>
        {
          checked ?
            <span className="badge badge-success">Habilitado</span> :
            <span className="badge badge-danger">Inhabilitado</span>
        }
        <Switch
          checked={checked}
          onChange={putProducto} />

      </td>
      <td>{producto.pro_img}</td>
      <td>
        <button className="btn btn-info" onClick={() => {
          setObjProducto(producto);
        }}>
          Editar
     </button>
      </td>
    </tr>
  )
}

export default ProductoFila