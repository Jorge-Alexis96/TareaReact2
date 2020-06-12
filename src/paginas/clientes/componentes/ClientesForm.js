import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2';
import { URL_BACKEND } from '../../../variables/variables';

const ClienteForm = ({ getClientes, objCliente, setObjCliente }) => {

  let formVacio = {
    cli_nom: '',
    cli_ape: '',
    cli_est: '',
    cli_dni: ''
  };


////////////////
  
  
  const [formulario, setFormulario] = useState({});

  useEffect(() => {
    console.log("efecto objRepartidor");
    if (objCliente) {
      setFormulario(objCliente);
    } else {
      setFormulario(formVacio)
    }
  }, [objCliente])

  console.log("state form", formulario);



  const handleChange = (e) => {
    setFormulario({ ...formulario,
       [e.target.name]: e.target.value })
  }

  const postCliente = (nuevoCliente) => {
    const endpoint = `${URL_BACKEND}/cliente`;
    fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify(nuevoCliente),
      headers: {
        "Content-type": "application/json"
      }
    }).then((response) => {
      response.json().then((data) => {
        Swal.fire({
          title: 'Éxito!',
          icon: 'success',
          text: 'El Cliente ha sido creado con éxito en la base de datos',
          timer: 2000,
        });
        getClientes();
      })
    })
  }
  // Funcion que actualiza un repartidor en la BD
  const putCliente = (nuevoCliente) => {
    const endpoint = `${URL_BACKEND}/cliente/${objCliente.id}`;
    fetch(endpoint, {
      method: 'PUT',
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(nuevoCliente)
    }).then((response) => {
      response.json().then((data) => {
        Swal.fire({
          title: "Actualizado!",
          text: "Registro actualizado correctamente",
          icon: "success",
          timer: 5000
        });
        // limpiar el form
        getClientes();
        setObjCliente(null);
      })
    })
  }
  const enviarFormulario = (e) => {
    e.preventDefault()

    if (formulario.cli_nom.trim() === "" ||
      formulario.cli_ape.trim() === "" ||
      formulario.cli_dni.trim() === "" ||
      formulario.cli_est.trim() === "") {
      Swal.fire({
        icon: "error",
        title: "Cuidado!",
        text: "Todos los campos deben estar llenos"
      });
    } else {
      if (objCliente) {
        // tengo editar el registro
        // LLAMADA A LA API CON EL VERBO PUT (fetch)
        Swal.fire({
          title: '¿Seguro que desea editar el registro?',
          icon: 'info',
          text: 'Los cambios harán efecto de inmediato en la base de datos',
          showCancelButton: true
        }).then((result) => {
          if (result.value) {
            console.log("OK PODEMOS EDITAR AL Cliente");
            putCliente(formulario);
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
            postCliente(formulario);
          }
        })
      }
    }


  }

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title text-center">Registrar Cliente </h3>
      </div>
      <div className="card-body">
        <form className="row" onSubmit={enviarFormulario}>
          <div className="form-group col-md-3">
            <label htmlFor="">Nombre:</label>
            <input type="text" name="cli_nom"
              className="form-control"
              onChange={handleChange}
              value={formulario.cli_nom} />
          </div>
          <div className="form-group col-md-3">
            <label htmlFor="">Apellido:</label>
            <input type="text" name="cli_ape"
              className="form-control" onChange={handleChange}
              value={formulario.cli_ape} />

          </div>
          <div className="form-group col-md-3">
            <label htmlFor="">Estado:</label>
            <select className="form-control" name="cli_est"
              onChange={handleChange}
              value={formulario.cli_est}>
              <option value="">-Seleccione-</option>
              <option value="true">Habilitado</option>
              <option value="false">Inhabilitado</option>
            </select>
          </div>
          <div className="form-group col-md-3">
            <label htmlFor="">Dni:</label>
            <input type="text" name="cli_dni"
              className="form-control"
              value={formulario.cli_dni}
              onChange={handleChange} />

          </div>
          <div className="form-group col-md-6">
            {
              objCliente ?
                <button className="btn btn-success btn-block" type="submit">
                  Actualizar Cliente
                </button> :
                <button className="btn btn-primary btn-block" type="submit">
                  Crear Cliente
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

export default ClienteForm 
