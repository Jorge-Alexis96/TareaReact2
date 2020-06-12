import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2';
import { URL_BACKEND } from '../../../variables/variables';

const PedidoForm = ({ getPedidos, objPedido, setObjPedido }) => {

  let formVacio = {
    id_pro: '',
    id_cli: '',
    ped_est: '',
    id_rep: ''
  };


////////////////
  
  
  const [formulario, setFormulario] = useState({});

  useEffect(() => {
    console.log("efecto objPedido");
    if (objPedido) {
      setFormulario(objPedido);
    } else {
      setFormulario(formVacio)
    }
  }, [objPedido])

  console.log("state form", formulario);



  const handleChange = (e) => {
    setFormulario({ ...formulario,
       [e.target.name]: e.target.value })
  }

  const postPedido = (nuevoPedido) => {
    const endpoint = `${URL_BACKEND}/pedido`;
    fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify(nuevoPedido),
      headers: {
        "Content-type": "application/json"
      }
    }).then((response) => {
      response.json().then((data) => {
        Swal.fire({
          title: 'Éxito!',
          icon: 'success',
          text: 'El Repartidor ha sido creado con éxito en la base de datos',
          timer: 5000,
        });
        getPedidos();
      })
    })
  }
  // Funcion que actualiza un repartidor en la BD
  const putPedido = (nuevoPedido) => {
    const endpoint = `${URL_BACKEND}/pedido/${objPedido.id}`;
    fetch(endpoint, {
      method: 'PUT',
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(nuevoPedido)
    }).then((response) => {
      response.json().then((data) => {
        Swal.fire({
          title: "Actualizado!",
          text: "Registro actualizado correctamente",
          icon: "success",
          timer: 5000
        });
        // limpiar el form
        getPedidos();
        setObjPedido(null);
      })
    })
  }
  const enviarFormulario = (e) => {
    e.preventDefault()

    if (formulario.id_pro.trim() === "" ||
      formulario.id_cli.trim() === "" ||
      formulario.id_rep.trim() === "" ||
      formulario.ped_est.trim() === "") {
      Swal.fire({
        icon: "error",
        title: "Cuidado!",
        text: "Todos los campos deben estar llenos"
      });
    } else {
      if (objPedido) {
        // tengo editar el registro
        // LLAMADA A LA API CON EL VERBO PUT (fetch)
        Swal.fire({
          title: '¿Seguro que desea editar el registro?',
          icon: 'info',
          text: 'Los cambios harán efecto de inmediato en la base de datos',
          showCancelButton: true
        }).then((result) => {
          if (result.value) {
            console.log("OK PODEMOS EDITAR AL REPARTIDOR");
            putPedido(formulario);
          }
        })
      } else {
        // tengo crear el registro
        Swal.fire({
          title: '¿Seguro que desea crear el registro?',
          icon: 'info',
          text: 'Los cambios harán efecto de inmediato en la base de datos',
          showCancelButton: true
        }).then((result) => {
          if (result.value) {
            console.log("OK PODEMOS CREAR AL USUARIO");
            // stuff PARA CREAR AL USUARIO
            // aqui hacemos un POST  a mockapi
            postPedido(formulario);
          }
        })
      }
    }


  }

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Registrar Pedido</h3>
      </div>
      <div className="card-body">
        <form className="row" onSubmit={enviarFormulario}>
          <div className="form-group col-md-3">
            <label htmlFor="">Producto:</label>
            <input type="text" name="id_pro"
              className="form-control"
              onChange={handleChange}
              value={formulario.id_pro} />
          </div>
          <div className="form-group col-md-3">
            <label htmlFor="">Cliente:</label>
            <input type="text" name="id_cli"
              className="form-control" onChange={handleChange}
              value={formulario.id_cli} />

          </div>
          <div className="form-group col-md-3">
            <label htmlFor="">Estado:</label>
            <select className="form-control" name="ped_est"
              onChange={handleChange}
              value={formulario.ped_est}>
              <option value="">-Seleccione-</option>
              <option value="true">Habilitado</option>
              <option value="false">Inhabilitado</option>
            </select>
          </div>
          <div className="form-group col-md-3">
            <label htmlFor="">AEA:</label>
            <input type="text" name="id_rep"
              className="form-control"
              value={formulario.id_rep}
              onChange={handleChange} />

          </div>
          <div className="form-group col-md-6">
            {
              objPedido ?
                <button className="btn btn-success btn-block" type="submit">
                  Actualizar ProbjProducto
                </button> :
                <button className="btn btn-primary btn-block" type="submit">
                  Crear Producto
                </button>
            }
          </div>
          <div className="form-group col-md-6">
            <button className="btn btn-danger btn-block" type="button">
              Cancelar
      </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PedidoForm 
