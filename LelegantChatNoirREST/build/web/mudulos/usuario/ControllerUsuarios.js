// -----------------------------------------------------------------------------------------------------
// codigo para cargar la tabla y la funcionalidad de los botones editar y eliminar que se incluyen en las filas de la tabla
// -----------------------------------------------------------------------------------------------------
const cargarTablaProductos = () => {
    // url de la api para obtener todos los datos
    const apiURL = 'http://localhost:8080/LelegantV2REST/api/usuario/getAll';
    // se hace la petición a la api para obtener todos los datos usando la url
    fetch(apiURL, {
        // se especifica el método de la petición GET
        method: 'GET'
    })
    // se convierte la respuesta a un objeto json
    .then(res => res.json())
    // se obtiene el objeto json y se recorre cada dato para mostrarlo en la tabla
    .then(data => {
        // se obtiene la tabla de la vista usando el id tabla
        const tabla = document.getElementById('tabla');
        // se crea una variable filas para almacenar las filas de la tabla
        let filas = '';
        // se recorre cada dato y se crea una fila
        data.forEach(usuario => {
            // se crea una plantilla para los botones de editar y eliminar con el id
            let templateBotones = `
                <div class="btn-group">
                    <button class="btn btn-outline-warning btn-sm btn-editar" data-codigoProducto="${usuario.idUsuario}" data-bs-toggle="modal" data-bs-target="#Agregar"><i class="bi bi-pencil-square"></i></button>
                    <button class="btn btn-outline-danger btn-sm btn-eliminar" data-idProducto="${usuario.idUsuario}"><i class="bi bi-trash""></i></button>
                </div>
            `;
            // se agrega una fila a la variable filas con los datos
            filas += `
                <tr>
                    <td class="text-truncate">${usuario.idUsuario}</td>
                    <td class="text-truncate">${usuario.usuario}</td>
                    <td class="text-truncate">${usuario.rol}</td>
                    <td class="text-truncate">${usuario.correo}</td>
                    <td class="text-truncate text-center align-middle">
                        <div class="alert ${usuario.estatus ? "alert-success" : "alert-danger"} p-2 m-0">
                            ${usuario.estatus ? "Activo" : "Inactivo"}
                        </div>
                    </td>
                    <td class="text-truncate text-center">
                    ${usuario.estatus ? templateBotones : ""}
                    </td>
                </tr>
            `;
        });
        // se agrega las cabeceras de la tabla y las filas a la tabla
        tabla.innerHTML = `
            <thead>
                <tr>
                    <th class="text-truncate">ID</th>
                    <th class="text-truncate">usuario</th>
                    <th class="text-truncate">rol</th>
                    <th class="text-truncate">correo</th>
                    <th class="text-truncate">estatus</th>
                    <th class="text-truncate">Acciones</th>
                </tr>
            </thead>
            <tbody>
                ${filas}
            </tbody>
        `;
        // -----------------------------------------------------------------------------------------------------
        // codigo agregar la funcionalidad de los botones editar y eliminar que se incluyen en las filas de la tabla
        // -----------------------------------------------------------------------------------------------------
        // querySelectorAll sirve para obtener todos los elementos que tengan la clase especificada
        // querySelector sirve para obtener el primer elemento que tenga la clase especificada
        // querySelectorAll devuelve un arreglo de elementos
        // querySelector devuelve un solo elemento
        // en este caso se usa querySelectorAll para obtener todos los botones de editar
        // se obtiene el boton de editar usando la clase btn-editar y querySelectorAll
        // se almacenan los botones de editar en la variable btnEditar
        const btnEditar = document.querySelectorAll('.btn-editar');
        // se obtiene el boton de eliminar usando la clase btn-eliminar y querySelectorAll
        // se almacenan los botones de eliminar en la variable btnEliminar
        const btnEliminar = document.querySelectorAll('.btn-eliminar');

        // se recorre cada boton de editar y se le agrega un evento click para cargar el modal de editar
        btnEditar.forEach(btn => {
            btn.addEventListener('click', (event) => {
                // el metodo getAttribute obtiene el valor de un atributo de un elemento html
                // en este caso se obtiene el id de la venta del boton de editar usando el atributo data-idVenta del boton de editar
                const codigoProducto = btn.getAttribute('data-codigoProducto');
                // se llama a la función cargarModalEditar para cargar el modal de editar venta
                cargarModalEditar(codigoProducto);
            })
        });
        // se recorre cada boton de eliminar almacenado en la constante btnElminar
        btnEliminar.forEach(btn => {
            // se agrega un evento click al boton de eliminar para mostrar un mensaje de confirmación
            btn.addEventListener('click', (event) => {
                // el metodo getAttribute obtiene el valor de un atributo de un elemento html
                // en este caso se obtiene el id del producto del boton de eliminar usando el atributo data-idProducto del boton de eliminar
                const idProducto = btn.getAttribute('data-idProducto');
                // se busca el prducto en el arreglo de prooductos almacenado en data usando el id de la venta
                const producto = data.find(p => p.idProducto == idProducto);

                // se obtiene el tema de la página usando el atributo data-bs-theme del elemento html y el metodo getAttribute
                // se almacena el tema en la variable theme
                let theme = document.documentElement.getAttribute('data-bs-theme');
                // se crea una variable isDarkMode para almacenar si el tema es oscuro
                // si el tema es oscuro la variable isDarkMode es true
                // si el tema no es oscuro la variable isDarkMode es false
                // theme === dark es una comparación que devuelve true si el tema es oscuro
                let isDarkMode = theme === 'dark';

                // se utiliza la libreria SweetAlert2 para mostrar un mensaje de confirmación
                Swal.fire({
                    // paso de parametros al objeto de configuración de SweetAlert2
                    // pasamos el parametro del titulo del mensaje
                    title: "Desea eliminar esta compra?",
                    // pasamos el parametro del texto del mensaje
                    text: `Eliminara la compra con id ${idProducto} y codigo ${producto.codigoProducto}`,
                    // pasamos el parametro del icono del mensaje
                    icon: "warning",
                    // pasamos el parametro para mostrar el boton de cancelar
                    showDenyButton: true,
                    showCancelButton: true,
                    // pasamos el parametro para el color de fondo del mensaje
                    // se usa una verificación si isDarkMode es true el color de fondo es #333 si no es #fff
                    background: isDarkMode ? '#333' : '#fff',
                    // pasamos el parametro para el color del texto del mensaje
                    // se usa una verificación si isDarkMode es true el color del texto es #fff si no es #000
                    color: isDarkMode ? '#fff' : '#000',
                    // pasamos el parametro para el color del boton de confirmar
                    confirmButtonColor: "#DC3545",
                    // pasamos el parametro para el color del boton de cancelar
                    // pasamos el parametro para el texto del boton de confirmar
                    confirmButtonText: "Eliminacion fisica",
                    denyButtonText: "Eliminacion logica",
                    // pasamos el parametro para el texto del boton de cancelar
                    cancelButtonText: "Cancelar"
                }).then((result) => {
                    // se verifica si el resultado de la confirmación es true
                    if (result.isConfirmed) {
                        // se muestra un mensaje de confirmación de la eliminación de la venta
                        const apiURL = 'http://localhost:8080/api/producto/deleteFisico';

                        let queryString = {
                            datosProducto: JSON.stringify(producto)
                        };
                        fetch(apiURL, {
                            method: 'POST',
                            headers: {
                                "Content-Type": "application/x-www-form-urlencoded"
                            },
                            body: new URLSearchParams(queryString)
                        })
                                .then(res => res.json())
                                .then(res => {
                                    console.log(res);
                                    cargarTablaProductos();
                                });
                        Swal.fire({
                            title: "Eliminado fisicamente!",
                            background: isDarkMode ? '#333' : '#fff',
                            color: isDarkMode ? '#fff' : '#000',
                            text: `Compra "${producto.codigoProducto}" fue eliminada.`,
                            icon: "success"
                        });
                    } else if (result.isDenied) {
                        const apiURL = 'http://localhost:8080/api/producto/delete';

                        let queryString = {
                            datosProducto: JSON.stringify(producto)
                        };
                        fetch(apiURL, {
                            method: 'POST',
                            headers: {
                                "Content-Type": "application/x-www-form-urlencoded"
                            },
                            body: new URLSearchParams(queryString)
                        })
                                .then(res => res.json())
                                .then(res => {
                                    console.log(res);
                                    cargarTablaProductos();
                                });
                        Swal.fire({
                            title: "Eliminado logicamente!",
                            background: isDarkMode ? '#333' : '#fff',
                            color: isDarkMode ? '#fff' : '#000',
                            text: `Compra "${producto.codigoProducto}" fue eliminada.`,
                            icon: "success"
                        });
                    }
                });
            })
        })
    })
            // se captura el error si ocurre alguno
            .catch(error => {
                // se imprime el error en consola
                console.error('Error al cargar las ventas:', error);
            });
}

// -----------------------------------------------------------------------------------------------------
// codigo para cargar el modal de editar venta con los productos de la venta seleccionada en la tabla de ventas
// -----------------------------------------------------------------------------------------------------
// funcion para cargar el modal de editar venta con los productos de la venta seleccionada en la tabla de ventas
const cargarModalEditar = (codigoProducto) => {
    // se obtiene el boton de cerrar modal usando el id btnCerrarModal
    const btnCerrarModal = document.getElementById('btnCerrarModal');
    // se obtiene el titulo del modal usando el id exampleModalLabel
    const tituloModal = document.getElementById('exampleModalLabel');
    // se obtiene el contenido del modal usando el id contenido-modal
    const contenidoModal = document.getElementById('contenido-modal');
    // se crea una variable productosModal para almacenar los productos del carrito de ventas
    let productosModal = '';

    // se cambia el titulo del modal a Agregar Venta
    tituloModal.innerHTML = "Editar Producto";
    // se limpia el contenido del modal
    contenidoModal.innerHTML = "";
    
    console.log(codigoProducto);
    const apiURL = `http://localhost:8080/api/producto/getByCode?filtro=${codigoProducto}`;
    // se hace la petición a la api para obtener todos los productos usando la url
    fetch(apiURL, {
        // se especifica el método de la petición GET
        method: 'GET'
    })
    // se convierte la respuesta a un objeto json
    .then(res => res.json())
    // se obtiene el objeto json y se recorre cada producto para mostrarlo en la tabla
    .then(data => {    
        // console.log(data);
        // se agrega el codigo del producto y un input para la cantidad del producto
        data.forEach(producto => {
            productosModal += `
                            <div class="form-floating m-1">
                                <input type="text" class="form-control form-control-sm" id="nombreEd" value="${producto.nombre}">
                                <label for="nombreEd">Nombre</label>
                            </div>
                            <div class="form-floating m-1">
                                <input type="text" class="form-control form-control-sm" id="descripcionEd" value="${producto.descripcion}">
                                <label for="descripcionEd">Descripcion</label>
                            </div>
                            <div class="form-floating m-1">
                                <input type="date" class="form-control form-control-sm" id="fechaEd" value="${producto.fechaIngreso}">
                                <label for="fechaEd">Fecha de Ingreso</label>
                            </div>
                            <div class="form-floating m-1">
                                <input type="number" class="form-control form-control-sm" id="duracionEd" min="1" value="${producto.duracion}">
                                <label for="duracionEd">Duracion en inventario</label>
                            </div>
                            <div class="form-floating m-1">
                                <input type="number" class="form-control form-control-sm" id="precioCompraEd" min="1"  value="${producto.precioCompra}">
                                <label for="precioCompraEd">Precio Compra</label>
                            </div>
                            <div class="form-floating m-1">
                                <input type="number" class="form-control form-control-sm" id="precioVentaEd" min="1" value="${producto.precioVenta}">
                                <label for="precioVentaEd">Precio Venta</label>
                            </div>
                            <div class="text-center m-2">
                                <button type="button" class="btn btn-success" id="btnGuardar">Guardar</button>
                            </div>
                            `;
        
            // se agregan los productos del carrito de ventas al contenido del modal
            contenidoModal.innerHTML = productosModal;
            // se obtiene el boton de guardar venta usando el id btnGuardarVenta
            const btnGuardar = document.getElementById('btnGuardar');
            // se agrega un evento click al boton de guardar venta
            btnGuardar.addEventListener('click', (event) => {
                const inputNombre = document.getElementById('nombreEd');
                const inputDescripcion = document.getElementById('descripcionEd');
                const inputFechaIngreso = document.getElementById('fechaEd');
                const inputDuracion = document.getElementById('duracionEd');
                const inputPrecioCompra = document.getElementById('precioCompraEd');
                const inputPrecioVenta = document.getElementById('precioVentaEd');
                // se crea la url de la api para guardar la venta
                const apiURL = 'http://localhost:8080/api/producto/guardar';
                // se crea un objeto Venta vacio
                let dataproducto = {
                    idProducto: producto.idProducto,
                    nombre: inputNombre.value,
                    descripcion: inputDescripcion.value,
                    fechaIngreso: inputFechaIngreso.value,
                    duracion: inputDuracion.value,
                    precioCompra: inputPrecioCompra.value,
                    precioVenta: inputPrecioVenta.value
                };
                // se crea un queryString con los datos de la venta
                let queryString = {
                    datosProducto: JSON.stringify(dataproducto)
                };
                console.log(queryString)
                // se hace la petición a la api para guardar la venta
                fetch(apiURL, {
                    // se especifica el método de la petición POST
                    method: 'POST',
                    // se especifica el tipo de contenido que se espera en la respuesta
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    // se envia el queryString con los datos de la venta
                    body: new URLSearchParams(queryString)
                })
                        // se convierte la respuesta a un objeto json
                        .then(res => res.json())
                        // se obtiene el objeto json
                        .then(data => {
                            // se imprime en consola la respuesta de la api
                            // console.log(res);
                            // se limpia el contenido del modal
                            btnCerrarModal.click();
                            // se llama a la función controllerVentas para cargar la tabla de ventas
                            cargarTablaProductos();
                            // se obtiene el tema de la página usando el atributo data-bs-theme del elemento html y el metodo getAttribute
                            // se almacena el tema en la variable theme
                            let theme = document.documentElement.getAttribute('data-bs-theme');
                            // se crea una variable isDarkMode para almacenar si el tema es oscuro
                            // si el tema es oscuro la variable isDarkMode es true
                            // si el tema no es oscuro la variable isDarkMode es false
                            // theme === dark es una comparación que devuelve true si el tema es oscuro
                            let isDarkMode = theme === 'dark';
                            // se muestra un mensaje de confirmación de la venta
                            Swal.fire({
                                title: "Se edito correctamente!",
                                text: "El producto con codigo " + data.codigoProducto + " fue editado correctamente.",
                                // pasamos el parametro para el color de fondo del mensaje
                                // se usa una verificación si isDarkMode es true el color de fondo es #333 si no es #fff
                                background: isDarkMode ? '#333' : '#fff',
                                // pasamos el parametro para el color del texto del mensaje
                                // se usa una verificación si isDarkMode es true el color del texto es #fff si no es #000
                                color: isDarkMode ? '#fff' : '#000',
                                icon: "success"
                            });
                        });
            })
        });
    })
    // se captura el error si ocurre alguno
    .catch(error => {
        // se imprime el error en consola
        console.error('Error al cargar el producto:', error);
    });

};

// -----------------------------------------------------------------------------------------------------
// codigo para cargar el modal de agregar venta con los productos del carrito de ventas
// -----------------------------------------------------------------------------------------------------

// en este caso se cargaran los productos por defecto en el carrito de ventas
// se creara un arreglo de productos con los codigos de los productos
// esto se hace para simular que se agregaron productos al carrito de ventas

// funcion para cargar el modal de agregar venta con los productos del carrito de ventas
const cargarModalAgregar = () => {
    // se obtiene el boton de cerrar modal usando el id btnCerrarModal
    const btnCerrarModal = document.getElementById('btnCerrarModal');
    // se obtiene el titulo del modal usando el id exampleModalLabel
    const tituloModal = document.getElementById('exampleModalLabel');
    // se obtiene el contenido del modal usando el id contenido-modal
    const contenidoModal = document.getElementById('contenido-modal');
    // se crea una variable productosModal para almacenar los productos del carrito de ventas
    let usuarioModal = '';

    // se cambia el titulo del modal a Agregar Venta
    tituloModal.innerHTML = "Agregar Usuario";
    // se limpia el contenido del modal
    contenidoModal.innerHTML = "";
    // se agrega el codigo del producto y un input para la cantidad del producto
    usuarioModal += `
                <form id="registroUsuario">
                    <div class="form-floating m-1">
                        <select class="form-control form-control-sm" id="rolAdd">
                            <option value="ADMS">ADMS</option>
                            <option value="EMPS">EMPS</option>
                        </select>
                        <label for="rolAdd">Rol</label>
                    </div>
                    <div class="form-floating m-1">
                        <input type="text" class="form-control form-control-sm" id="usuarioAdd" required>
                        <label for="usuarioAdd">Usuario</label>
                    </div>
                    <div class="form-floating m-1">
                        <input type="password" class="form-control form-control-sm" id="contraseniaAdd" required>
                        <label for="contraseniaAdd">contraseña</label>
                    </div>
                    <div class="form-floating m-1">
                        <input type="email" class="form-control form-control-sm" id="correoAdd" required>
                        <label for="correoAdd">correo</label>
                    </div>
                    <div class="text-center m-2">
                        <button type="submit" class="btn btn-success" id="btnGuardar">Guardar</button>
                    </div>
                </form>
                    `;
    // se agregan los productos del carrito de ventas al contenido del modal
    contenidoModal.innerHTML = usuarioModal;

    // se obtiene el boton de guardar venta usando el id btnGuardarVenta
    const btnGuardar = document.getElementById('registroUsuario');
    // se agrega un evento click al boton de guardar venta
    btnGuardar.addEventListener('submit', function (e) {
        e.preventDefault();
        const inputRol = document.getElementById('rolAdd');
        const inputUsuario = document.getElementById('usuarioAdd');
        const inputContrasenia = document.getElementById('contraseniaAdd');
        const inputCorreo = document.getElementById('correoAdd');
        
        let usuarioValue = inputUsuario.value;
        if(usuarioValue == ""){
            alert('El usuario no puede estar vacio')
            return
        }
        if(usuarioValue.includes("!")){
            alert('El usuario no puede incluir "!"')
            return
        }
        let nombrecito = usuarioValue.trim();
        alert(nombrecito);
        let nombreSinMayusculas = nombrecito.toLowerCase();
        alert(nombreSinMayusculas);
        let nombreSinEspacios = nombreSinMayusculas.replace(/\s/g,"_");
        alert(nombreSinEspacios);
        let elName = nombreSinEspacios.toUpperCase();
        alert(elName);
        
        let clave = inputContrasenia.value;
        
        const ochocaracteres = /.{8,}/.test(clave);
        if( ochocaracteres === false){
            alert("La contraseña debe contener almenos 8 caracteres");
            return
        }
        const mayymin = /(?:[A-Z])/.test(clave) && /(?:[a-z])/.test(clave);
        console.log("Mayusculas y minusculas:", mayymin);
        const numeros = /(?:\d)/.test(clave);
        console.log("numeros:",numeros);
        const noespecial = !/[^!?A-Za-z\d]/.test(clave);
        console.log("contiene ! 0 ?, pero no otro caracter especial", noespecial);
        const valida=ochocaracteres && mayymin && numeros && noespecial;
        console.log("contraseña valida:",valida,"\n\n");
        
        // se crea la url de la api para guardar la venta
        const apiURL = 'http://localhost:8080/LelegantV2REST/api/usuario/agregar';
        // se crea un objeto Venta vacio
        let usuario = {
            usuario: elName,
            contrasenia: inputContrasenia.value,
            correo: inputCorreo.value,
            rol: inputRol.value
        };
        // se crea un queryString con los datos de la venta
        let queryString = {
            datosUsuario : JSON.stringify(usuario)
        };
        console.log(queryString)
        // se hace la petición a la api para guardar la venta
        fetch(apiURL, {
            // se especifica el método de la petición POST
            method: 'POST',
            // se especifica el tipo de contenido que se espera en la respuesta
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            // se envia el queryString con los datos de la venta
            body: new URLSearchParams(queryString)
        })
                // se convierte la respuesta a un objeto json
                .then(res => res.json())
                // se obtiene el objeto json
                .then(data => {
                    // se imprime en consola la respuesta de la api
                    // console.log(res);
                    // se limpia el contenido del modal
                    btnCerrarModal.click();
                    // se llama a la función controllerVentas para cargar la tabla de ventas
                    cargarTablaProductos();
                    // se obtiene el tema de la página usando el atributo data-bs-theme del elemento html y el metodo getAttribute
                    // se almacena el tema en la variable theme
                    let theme = document.documentElement.getAttribute('data-bs-theme');
                    // se crea una variable isDarkMode para almacenar si el tema es oscuro
                    // si el tema es oscuro la variable isDarkMode es true
                    // si el tema no es oscuro la variable isDarkMode es false
                    // theme === dark es una comparación que devuelve true si el tema es oscuro
                    let isDarkMode = theme === 'dark';
                    // se muestra un mensaje de confirmación de la venta
                    Swal.fire({
                        title: "Se agrego correctamente!",
                        text: "El usuario con id: " + data.idUsuario + " fue agregada correctamente.",
                        // pasamos el parametro para el color de fondo del mensaje
                        // se usa una verificación si isDarkMode es true el color de fondo es #333 si no es #fff
                        background: isDarkMode ? '#333' : '#fff',
                        // pasamos el parametro para el color del texto del mensaje
                        // se usa una verificación si isDarkMode es true el color del texto es #fff si no es #000
                        color: isDarkMode ? '#fff' : '#000',
                        icon: "success"
                    });
                });
    })
};

function validaUsuario(inputUsuario){
    if(inputUsuario.includes("!")){
        return false
    }
    let nombrecito = inputUsuario.trim();
    alert(nombrecito);
    let nombreSinMayusculas = nombrecito.toLowerCase();
    alert(nombreSinMayusculas);
    let nombreSinEspacios = nombreSinMayusculas.replace(/\s/g,"_");
    alert(nombreSinEspacios);
    let elName = nombreSinEspacios.toUpperCase();
    alert(elName);
}

function validaPass(clave){
   
    
}


// se obtiene el boton de cerrar modal usando el id btnCerrarModal
const btnCerrarModal = document.getElementById('btnCerrarModal');
// se agrega un evento click al boton de cerrar modal
btnCerrarModal.addEventListener('click', (event) => {
    // se obtiene el titulo del modal usando el id exampleModalLabel
    const tituloModal = document.getElementById('exampleModalLabel');
    // se obtiene el contenido del modal usando el id contenido-modal
    const contenidoModal = document.getElementById('contenido-modal');
    // se limpia el titulo del modal
    tituloModal.innerHTML = "";
    // se limpia el contenido del modal
    contenidoModal.innerHTML = "";
})
// se espera a que el contenido del documento se haya cargado
document.addEventListener('DOMContentLoaded', () => {
    // se llama a la función controllerVentas para cargar la tabla de ventas
    cargarTablaProductos();
    // se obtiene el boton agregar
    const btnAgregar = document.getElementById('btnAgregar');
    btnAgregar.addEventListener('click', (event) => {
        // se llama a la función cargarModalAgregar para cargar el modal de agregar venta
        cargarModalAgregar();
    })
    console.log('El DOM ha sido cargado');
});
