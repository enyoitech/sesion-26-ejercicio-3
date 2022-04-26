/** 
Acontinuacion  declaramos e inicializamos un arreglo de numeros telefonicos
para despues ser consultado en busqueda de una cioncidencia, ya que en nustro ejercicio
tendremos que buscar un numero en un directorio o agentda telefonica
*/

let telefonos = [
  "3266514564",
  "3557867859",
  "3803127859",
  "3227867862",
  "3156709884",
  "3104567859",
  "3227819424",
  "3608151188",
];

/**
 *En esta seccion accederemos al nodo "myUL" utilizando el selector 'getElementById',
 *lo siguiente que haremos es agregar a nustra lista los telefonos contenidos en el arrelgo.
 */
const milista = document.getElementById("myUL");

/**
 *para agregar elementos recorreremos el arreglo utilizando un ciclo 'forEach', en cada iteracion crearemos un
 *nuevo elemento html usando 'createElement()' el cual recibira como parametro el tipo de elemento
 *html, en este caso un '("li")' para ser añadido a "myUL".
 */

telefonos.forEach(function (item) {
  let li = document.createElement("li");

  /**
   *añadiremos una clase a dicho
   *elemento con la funcion 'classList.add()', añadiremos esta clase para posteriormente modifical el estilo de los
   *elementos añadidos
   */

  li.classList.add("list-group-item");

  /**
   *lo siguiete sera añadir nuestro elemento "li" creado a la lista,
   *para ello usaremos el metodo "appendChild(li)" el cual añadira el elmento "li" a nuesta lista "milista".
   */

  /**
   *para terminar usaremos la propiedad "innerHTML" para modificar el texto del elemento "li",
   *el texto de este elemento sera el un numero telefonico denuestro arreglo
   */
  milista.appendChild(li);

  li.innerHTML += item;
});

/**
 * aqui accedemos al document.
 * utilizamos el selector 'getElementById' el cual recibe el id del nodo o elemento
 * del document que queremos accesar.
 * y  utilizamos el metodo addEventListener() el cual sirve para escuchar y recibe 2 argumentos
 * 1er argumento es el nombre del evento que pondremos a escuchar
 * 2do argumento es una expresion funcion anonima o tambien puede recibir una funcion arrow
 */

document
  .getElementById("telefonos-form")
  .addEventListener("submit", function (event) {
    /**
     * (event)  hace referencia al evento que se captura tambien es habitual usar (e)
     * event.preventDefault() se utiliza para evitar que el evento se ejecute por default
     *al cargar la pagina evitando que se envie el formulario vacio.
     */
    event.preventDefault();

    // hacemos el llamado a nuestra funcion buscarTelefono()
    buscarTelefono();
  });

function buscarTelefono() {
  /**
   * usaremos las siguientes variables para almacenar los nodos y haces las respectivas operaciones
   * dichos nodos contendrán la información del teléfono,también un nodo donde vamos a mostrar el
   * resultado de nuestra búsqueda,tendremos también una variable con los elementos de la lista para posteriormente
   * buscar en esta lista la coincidencia del numero telefónico,del mismo modo tendremos nuestro mensaje de error
   * con su respectivo id='errorMsn' el cual modificaremos para mostrar mensaje de error en caso de presentarse
   */

  const nodoData = document.getElementById("data");
  const nodoEncontrado = document.getElementById("resultadobusqueda");

  let nodoErrorMsn = document.getElementById("errorMsn");

  /**
   * accedemos a la propiedad (.value) del nodo la cual guarda el valor en texto (string)
   * ingresado por el usuario y lo guaramos en una variable.
   */
  const data = nodoData.value;

  /**
   * usaremos el método "find()" de nuestro arreglo para buscar y encontrar nuestro numero telefónico,
   * este método retornara el elemento que cumpla con las condiciones de la función de prueba,
   * en este caso nuestra función esta probando que elemento es igual al la "data" proporcionada
   * por el usuario, esta data es el texto del input en el formulario.
   */
  const coincidencia = telefonos.find((element) => element === data);

  /**
   * por defecto cuando el método "find()" encuentra una coincidencia este retornara
   * "undefined" por defecto, usando este comportamiento crearemos una comprobación usando
   * el condicional "if" vamos a comprobar que exista una coincidencia y que lo encontrado
   * por el método "find()" no sea un undefined.
   */

  if (coincidencia != undefined) {
    /**
     * si la condición se cumple mostraremos en vista un mensaje de "Numero Encontrado", usaremos
     * nuestro "nodoEncontrado" y la propiedad "innerHTML" para cambiar el texto de dicho elemento,
     * en este caso un párrafo "<p></p>"
     */
    nodoEncontrado.innerHTML = `<strong>${"Numero Encontrado"}</strong>`;
  } else {
    /**
     * si no se cumple realizaremos el mismo procedimiento  pero el texto resultado sera, "numero
     * no coincide"
     */
    console.log("El numnero no se ecnuentra en la agenda");
    nodoEncontrado.innerHTML = "Numero no coincide";
  }

  /**
   * de manera opcional vamos a modificar el estilo de nuestro elemento en la lista para que el usuario
   * tenga una referencia visual del numero, en este caso cambiaremos el fondo del elemento "li"
   * por un color verde y así logramos que la coincidencia destaque.
   *
   * Esto lo haremos agrupando los elementos "li" en una variable, la cual recorreremos para encontrar
   * una coincidencia con el numero ingresado por el usurario, recordando que "data" es la variable que
   * contiene el texto ingresado por el usuario.
   *
   * Cambiaremos el estilo de nuestro elemento cambiando la propiedad "style.background = "green"y si no
   * existe coincidencia dejaremos el estilo por defecto.
   */
  const li = milista.getElementsByTagName("li");

  for (i = 0; i < li.length; i++) {
    a = li[i];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase() == data) {
      li[i].style.background = "green";
    } else {
      li[i].style.background = "";
    }
  }

  /**
   * validaremos que el input del texto no llegue vacio
   * en la expresion la expresion (===) se valida si las comparaciones son iguales
   * si se cumple la condicion sera suficiente para mostrar el mensaje de error
   */
  let mensaje;
  if (data === "") {
    mensaje = "No se permiten <strong>campos vacios</strong>";
    /**
     * hacemos el llamado a nuestra funcion showMsnError() que sera la encargada
     * de mostrar el mensaje de error
     * esta recibe como argumentos el mensaje de error que debera mostrar
     * y el nodo nodoErrorMsn donde se mostrara el mensaje que se envia
     */
    showMsnError(mensaje, nodoErrorMsn);
  }
}

function showMsnError(mensajeError, nodoErrorMsn) {
  /**
   * en nuestro nodoErrorMsn accedemos al metodo .setAttribute()
   * el cual recibe como primer argumento el nombre de la propiead html que desamos modificar
   * para este caso vamos modificar la propiedad 'class' y como segundo argumento
   * enviamos las clases de estilo que seran asignadas a la propiedad 'class' en este caso
   * asignaremos algunas clases de estilos pertenecientes al framework de estilos boostrap
   * bg-danger --> genera un fondo rojo
   * rounded-3 --> redondea las esquinas
   * mb-2 ---> margin-bottom agrega un margen en la parte inferior del nodoErrorMsn
   * p-2 ---> agrega un padding alrededor de todo el nodoErrorMsn
   *
   */

  nodoErrorMsn.setAttribute("class", "bg-danger rounded-3 mb-2 p-2");
  /**
   * modificamos el nodoErrorMsn accediendo a su propiedad .innerHTML
   * la cual nos permite utilizar la sintaxis html para crear etiquetas
   * desde javaScript en este caso crearemos una etiqueta 'strong'
   * para poner en negrita la palabra campos vacios
   */
  nodoErrorMsn.innerHTML = mensajeError;

  /**
   * utilizamos la instruccion de return para romper el flujo de nuestra aplicacion
   * y evitar que se continue ejecutando el codigo que pueda seguir
   */
  return;
}
