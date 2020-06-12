import { URL_BACKEND } from "../variables/variables"

export class RepartidorService {

  endpoint = "/repartidor"

  getAllRepartidores() {

    return new Promise((resolve, reject) => {
      fetch(`${URL_BACKEND}${this.endpoint}`)
        .then((response) => {
          response.json().then((repartidores) => {
            resolve(repartidores)
          })
        })
    })
  }
}