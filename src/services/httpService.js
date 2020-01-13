import axios from "axios"; //Importamos la libreria para hacer request de htttp version 0.18

//si el usuario no esta conectado entonces va estar indefinido y no podra

//LLamamos la accion de axios interceptors la cual intercepta request y response para manejar errores
//Request = going out , Response = going in, metodo use toma dos parametros que son funciones que pueden ser llamadas
//El primero que se llama es si el response es succesful, la segunda si el response incluye un error
//No interceptamos succesful, por eso pasamos null response aca por que no queremos dar mensajes de que se logro hacer bien
//Con este interceptor manejamos errores globalmente

axios.interceptors.response.use(null, error => {
  //Error da una funcion codeblock
  //Creamos una constante que pregunta si esas 3 condicionales son truthy y se almacenan en un error esperado
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  //Si tenemos un unexpected error vamos a loguear el error y hacer display de un generic message
  if (!expectedError) {
    //Todo error que pase despues se conocera como unexpected error, falla en la base de datos, de internet etc
    console.log("Logging the error", error);
    window.open("error");
  }

  return Promise.reject(error); //Si tenemos un expected error devolvemos un rejected promise
});

function setJwt(jwt) {
  //Cada vez que hacemos un http request este token va a ser incluido, si el usuario no esta logueado token sera undefined
  axios.defaults.headers.common["Authorization"] = jwt;
}

//Exportamos un default object con 4 metodos
export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt
};
