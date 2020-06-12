import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2';
import { URL_BACKEND } from '../../../variables/variables';

const ProductoForm = ({ getProductos, objProducto, setObjProducto }) => {

  let formVacio = {
    pro_nom: '',
    pro_prec: '',
    pro_est: '',
    pro_img: ''
  };


////////////////
  
  
  const [formulario, setFormulario] = useState({});

  useEffect(() => {
    console.log("efecto objProducto");
    if (objProducto) {
      setFormulario(objProducto);
    } else {
      setFormulario(formVacio)
    }
  }, [objProducto])

  console.log("state form", formulario);



  const handleChange = (e) => {
    setFormulario({ ...formulario,
       [e.target.name]: e.target.value })
  }

  const postProducto = (nuevoProducto) => {
    const endpoint = `${URL_BACKEND}/producto`;
    fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify(nuevoProducto),
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
        getProductos();
      })
    })
  }
  // Funcion que actualiza un repartidor en la BD
  const putProducto = (nuevoProducto) => {
    const endpoint = `${URL_BACKEND}/producto/${objProducto.id}`;
    fetch(endpoint, {
      method: 'PUT',
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(nuevoProducto)
    }).then((response) => {
      response.json().then((data) => {
        Swal.fire({
          title: "Actualizado!",
          text: "Registro actualizado correctamente",
          icon: "success",
          timer: 5000
        });
        // limpiar el form
        getProductos();
        setObjProducto(null);
      })
    })
  }
  const enviarFormulario = (e) => {
    e.preventDefault()

    if (formulario.pro_nom.trim() === "" ||
      formulario.pro_prec.trim() === "" ||
      formulario.pro_img.trim() === "" ||
      formulario.pro_est.trim() === "") {
      Swal.fire({
        icon: "error",
        title: "Cuidado!",
        text: "Todos los campos deben estar llenos"
      });
    } else {
      if (objProducto) {
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
            putProducto(formulario);
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
            postProducto(formulario);
          }
        })
      }
    }


  }

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Registrar Producto</h3>
      </div>
      <div className="card-body">
        <form className="row" onSubmit={enviarFormulario}>
          <div className="form-group col-md-3">
            <label htmlFor="">Nombre:</label>
            <input type="text" name="pro_nom"
              className="form-control"
              onChange={handleChange}
              value={formulario.pro_nom} />
          </div>
          <div className="form-group col-md-3">
            <label htmlFor="">Precio:</label>
            <input type="number" name="pro_prec"
              className="form-control" onChange={handleChange}
              value={formulario.pro_prec} />

          </div>
          <div className="form-group col-md-3">
            <label htmlFor="">Estado:</label>
            <select className="form-control" name="pro_est"
              onChange={handleChange}
              value={formulario.pro_est}>
              <option value="">-Seleccione-</option>
              <option value="true">Habilitado</option>
              <option value="false">Inhabilitado</option>
            </select>
          </div>
          <div className="form-group col-md-3">
            <label htmlFor="">IMG:</label>
            <input type="text" name="pro_img"
              className="form-control"
              value={formulario.pro_img}
              onChange={handleChange} />

          </div>
          <div className="form-group col-md-6">
            {
              objProducto ?
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

export default ProductoForm 
