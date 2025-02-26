// -----------------------------------------------------------------------------------------------------
// codigo para cargar la tabla y la funcionalidad de los botones editar y eliminar que se incluyen en las filas de la tabla
// -----------------------------------------------------------------------------------------------------
const cargarTablaVentas = () => {
    // url de la api para obtener todas las ventas
    const apiURL = 'http://localhost:8080/api/ventas/getAll';
    // se hace la petición a la api para obtener todas las ventas usando la url
    fetch(apiURL, {
        // se especifica el método de la petición GET
        method: 'GET'
    })
        // se convierte la respuesta a un objeto json
        .then(res => res.json())
        // se obtiene el objeto json y se recorre cada venta para mostrarla en la tabla
        .then(data => {
            // se obtiene la tabla de la vista usando el id tabla
            const tabla = document.getElementById('tabla');
            // se crea una variable filas para almacenar las filas de la tabla
            let filas = '';
            // se recorre cada venta y se crea una fila con los datos de la venta
            data.forEach(venta => {
                // se crea una plantilla para los botones de editar y eliminar
                const templateBotones = `
                    <div class="btn-group">
                        <button class="btn btn-outline-warning btn-sm btn-editar" data-idVenta="${venta.idVenta}" data-bs-toggle="modal" data-bs-target="#Agregar"><i class="bi bi-pencil-square"></i></button>
                        <button class="btn btn-outline-danger btn-sm btn-eliminar" data-idVenta="${venta.idVenta}"><i class="bi bi-trash""></i></button>
                    </div>
                `;
                // se agrega una fila a la variable filas con los datos de la venta
                filas += `
                <tr>
                    <td class="text-truncate">${venta.idVenta}</td>
                    <td class="text-truncate">${venta.codigoVenta}</td>
                    <td class="text-truncate">${venta.subtotal}</td>
                    <td class="text-truncate">${venta.iva}</td>
                    <td class="text-truncate">${venta.totalVenta}</td>
                    <td class="text-truncate">${venta.fechaVenta}</td>
                    <td class="text-truncate text-center align-middle">
                        <div class="alert ${venta.estatus ? "alert-success" : "alert-danger"} p-2 m-0">
                            ${venta.estatus ? "Activo" : "Inactivo"}
                        </div>
                    </td>
                    <td class="text-truncate text-center">
                    ${venta.estatus ? templateBotones : ""}
                    </td>
                </tr>
            `;
            });
            // se agrega las cabeceras de la tabla y las filas a la tabla
            tabla.innerHTML = `
            <thead>
                <tr>
                    <th class="text-truncate">ID venta</th>
                    <th class="text-truncate">Codigo</th>
                    <th class="text-truncate">Subtotal</th>
                    <th class="text-truncate">IVA</th>
                    <th class="text-truncate">Total</th>
                    <th class="text-truncate">Fecha</th>
                    <th class="text-truncate">Estatus</th>
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
            // se obtiene el boton de edita usando la clase btn-editar y querySelectorAll
            // se almacenan los botones de editar en la variable btnEditar
            const btnEditar = document.querySelectorAll('.btn-editar');
            // se obtiene el boton de eliminar usando la clase btn-eliminar y querySelectorAll
            // se almacenan los botones de eliminar en la variable btnEliminar
            const btnEliminar = document.querySelectorAll('.btn-eliminar');

            // se recorre cada boton de editar y se agrega un evento click para cargar el modal de editar
            btnEditar.forEach(btn=>{
                // se agrega un evento click al boton de editar
                btn.addEventListener('click', (event) => {
                    // el metodo getAttribute obtiene el valor de un atributo de un elemento html
                    // en este caso se obtiene el id de la venta del boton de editar usando el atributo data-idVenta del boton de editar
                    const idVenta = btn.getAttribute('data-idVenta');
                    // se busca la venta en el arreglo de ventas almacenado en data usando el id de la venta
                    const venta = data.find(v => v.idVenta == idVenta);
                    // se imprime en consola el id de la venta
                    // console.log(idVenta);
                    // usando el codigo de la venta se llama a la función cargarModalEditar para cargar el modal de editar
                    cargarModalEditar(venta.codigoVenta);
                })
            });
            // se recorre cada boton de eliminar almacenado en la constante btnElminar
            btnEliminar.forEach(btn=>{
                // se agrega un evento click al boton de eliminar para mostrar un mensaje de confirmación
                btn.addEventListener('click', (event) => {
                    // el metodo getAttribute obtiene el valor de un atributo de un elemento html
                    // en este caso se obtiene el id de la venta del boton de eliminar usando el atributo data-idVenta del boton de eliminar
                    const idVenta = btn.getAttribute('data-idVenta');
                    // se busca la venta en el arreglo de ventas almacenado en data usando el id de la venta
                    const venta = data.find(v => v.idVenta == idVenta);

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
                        title: "Desea eliminar esta venta?",
                        // pasamos el parametro del texto del mensaje
                        text: `Eliminara la venta con id ${idVenta} y codigo ${venta.codigoVenta}`,
                        // pasamos el parametro del icono del mensaje
                        icon: "warning",
                        // pasamos el parametro para mostrar el boton de cancelar
                        showCancelButton: true,
                        showDenyButton: true,
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
                            // aqui debe ir el codigo para eliminar la venta
                            // -----------------------------------------------
                            // -----------------------------------------------
                            // -----------------------------------------------
                            // -----------------------------------------------
                            // se muestra un mensaje de confirmación de la eliminación de la venta
                            const apiURL = 'http://localhost:8080/api/ventas/deleteFisico';

                            let queryString = {
                                datosVenta: JSON.stringify(venta)
                            };
                            fetch(apiURL, {
                                method: 'POST',
                                headers:{
                                    "Content-Type": "application/x-www-form-urlencoded"
                                },
                                body: new URLSearchParams(queryString)
                            })
                            .then(res => res.json())
                            .then(res => {
                                console.log(res);
                                cargarTablaVentas();
                            });
                            Swal.fire({
                                title: "Eliminado fisicamente!",
                                background: isDarkMode ? '#333' : '#fff',
                                color: isDarkMode ? '#fff' : '#000',
                                text: `Venta "${venta.codigoVenta}" fue eliminada.`,
                                icon: "success"
                            });
                        }
                        else if (result.isDenied){
                            const apiURL = 'http://localhost:8080/api/ventas/delete';

                            let queryString = {
                                datosVenta: JSON.stringify(venta)
                            };
                            fetch(apiURL, {
                                method: 'POST',
                                headers:{
                                    "Content-Type": "application/x-www-form-urlencoded"
                                },
                                body: new URLSearchParams(queryString)
                            })
                            .then(res => res.json())
                            .then(res => {
                                console.log(res);
                                cargarTablaVentas();
                            });
                            Swal.fire({
                                title: "Eliminado logicamente!",
                                background: isDarkMode ? '#333' : '#fff',
                                color: isDarkMode ? '#fff' : '#000',
                                text: `Venta "${venta.codigoVenta}" fue eliminada.`,
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
const cargarModalEditar = (codigoVenta) => {
    // se obtiene el boton de cerrar modal usando el id btnCerrarModal
    const btnCerrarModal = document.getElementById('btnCerrarModal');
    // se obtiene el titulo del modal usando el id exampleModalLabel
    const tituloModal = document.getElementById('exampleModalLabel');
    // se obtiene el contenido del modal usando el id contenido-modal
    const contenidoModal = document.getElementById('contenido-modal');

    // se cambia el titulo del modal a Editar Venta
    tituloModal.innerHTML = "Editar Venta";
    // se limpia el contenido del modal
    contenidoModal.innerHTML = "";
    // se crea una variable productosModal para almacenar los productos de la venta
    let productosModal = '';

    // se crea la url de la api para obtener los productos de la venta usando el codigo de la venta como filtro
    // en este caso se hara una peticion GET a la api para obtener los productos de la venta que coincidan con el codigo de la venta
    const url = `http://localhost:8080/api/producto_ventas/getByCode?filtro=${codigoVenta}`;

    // se hace la petición a la api para obtener los productos de la venta usando la url
    fetch(url, {
        // se especifica el método de la petición GET
        method: 'GET',
        // se especifica el tipo de contenido que se espera en la respuesta
        headers: {
            // se especifica que se espera un objeto json en la respuesta
            'Accept': 'application/json',
        },
        // se convierte la respuesta a un objeto json
    }).then(res => res.json())
        // se obtiene el objeto json y se recorre cada producto de la venta para mostrarlo en el modal
        .then(data => {
            // se verifica si la respuesta de la api no es nula y tiene al menos un producto
            if (data != null && data.length > 0) {
                // se crea un formulario para editar los productos de la venta
                let productosModal = '';
                // se imprime en consola los productos de la venta
                // console.log(data)
                let isProductoActivo = false;
                // se recorre cada producto de la venta almacenado en data para almacenarlo en una fila del formulario
                data.forEach((producto, index) => {
                    // se verifica el estatus del producto, si es activo se cambia a true isProductoActivo
                    if(producto.estatus){
                        isProductoActivo = true;
                    }
                    // se agrega un input para el codigo del producto
                    //el input de codigo del producto es de solo lectura y no se puede editar
                    // se agrega un input para la cantidad del producto
                    // el input de cantidad del producto es de tipo number y se puede editar
                    // el input de cantidad del producto tiene un atributo data-codigoProductoMod para almacenar el codigo del producto
                    // el input de cabtidad tiene una clase input-cantidad para poder seleccionar todos los inputs de cantidad
                    // se agrega un input para el precio del producto
                    // el input de precio del producto es de tipo number y se puede editar
                    // el input de precio del producto tiene un atributo data-codigoProductoMod para almacenar el codigo del producto
                    // el input de precio tiene una clase input-precio para poder seleccionar todos los inputs de precio
                    // se agrega un input para el total del producto
                    // el input de total del producto es de solo lectura y no se puede editar
                    // console.log(producto.estatus);
                    productosModal += `
                    <div class="form-floating">
                        <input type="text" class="form-control-plaintext form-control-sm" id="codigoProducto-${index}" data-idProductoVentas="${producto.idProducto_Ventas}" value="${producto.codigoProducto}" readonly>
                        <label for="codigoProducto-${index}">Codigo producto</label>
                    </div>
                    <div class="form-floating">
                        <input type="number" class="form-control${producto.estatus ? "" : "-plaintext"} form-control-sm input-cantidad" id="cantidad-${index}" data-idProductoVentas="${producto.idProducto_Ventas}" value="${producto.cantidad}" ${producto.estatus ? "" : "readonly"}>
                        <label for="cantidad-${index}">Cantidad</label>
                    </div>
                    <div class="form-floating">
                        <input type="number" class="form-control${producto.estatus ? "" : "-plaintext"} form-control-sm input-precio" id="precio-${index}" value="${producto.precio}" ${producto.estatus ? "" : "readonly"}>
                        <label for="precio-${index}">Precio</label>
                    </div>
                    <div class="form-floating">
                        <input type="text" class="form-control-plaintext form-control-sm" id="total-${index}" value="${producto.total}" readonly>
                        <label for="total-${index}">Total</label>
                    </div>
                    <hr>
                `;
                });
                // se verifica que un producto este activo
                if(isProductoActivo){
                    // se agrega un boton para guardar los cambios en los productos de la venta
                    productosModal += `
                            <button type="button" class="btn btn-primary" id="btnGuardarCambios">Guardar cambios</button>
                        `;
                }
                // se agregan los productos de la venta al contenido del modal
                contenidoModal.innerHTML = productosModal;

                const btnGuardarCambios = document.getElementById('btnGuardarCambios');
                // se agrega un evento click al boton de guardar cambios
                btnGuardarCambios.addEventListener('click', (event) => {

                    const inputsCantidad = document.querySelectorAll('.input-cantidad');
                    const inputsPrecio = document.querySelectorAll('.input-precio');

                    inputsCantidad.forEach((inputCantidad, index) => {
                        const idProductoVentas = inputCantidad.getAttribute('data-idProductoVentas');
                        const cantidad = inputCantidad.value;
                        const precio = inputsPrecio[index].value;

                        let ProductoVenta = {
                            idProducto_Ventas: idProductoVentas,
                            cantidad: cantidad,
                            precio: precio
                        }

                        let queryString = {
                            datosProductoVenta: JSON.stringify(ProductoVenta)
                        };

                        const url = 'http://localhost:8080/api/producto_ventas/guardar';

                        fetch(url, {
                            method: 'POST',
                            headers: {
                                "Content-Type": "application/x-www-form-urlencoded"
                            },
                            body: new URLSearchParams(queryString)
                        }).then(res => res.json())
                            .then(data => {
                                btnCerrarModal.click();
                                // se llama a la función controllerVentas para cargar la tabla de ventas
                                cargarTablaVentas();
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
                                    title: "Se actualizaron los productos!",
                                    text: "Los productos de la venta fueron actualizados correctamente.",
                                    // pasamos el parametro para el color de fondo del mensaje 
                                    // se usa una verificación si isDarkMode es true el color de fondo es #333 si no es #fff
                                    background: isDarkMode ? '#333' : '#fff',
                                    // pasamos el parametro para el color del texto del mensaje
                                    // se usa una verificación si isDarkMode es true el color del texto es #fff si no es #000
                                    color: isDarkMode ? '#fff' : '#000',
                                    icon: "success"
                                });
                            });
                    });
                });

                // en caso de que la respuesta de la api sea nula o no tenga productos
            }else {
                // se agrega un mensaje de alerta en el contenido del modal
                contenidoModal.innerHTML = `
                    <div class="alert alert-danger p-2 m-5 text-center">
                        No hay productos en esta compra.
                    </div>
                `;;
            }
        })
        // se captura el error si ocurre alguno
        .catch(error => {
            // se imprime el error en consola
            console.error('Error:', error);
        });
}

// -----------------------------------------------------------------------------------------------------
// codigo para cargar el modal de agregar venta con los productos del carrito de ventas
// -----------------------------------------------------------------------------------------------------
const validarDato = (dato, nombre) => {
    let isDato = true;
    if(dato === ""){
        alert(`El ${nombre}no puede estar vacio`);
        isDato = false;
    }
    if(typeof dato === "number"){
        alert(`El ${nombre} tiene que ser numero`);
        isDato = false;
    }
    if(dato > 0){
        isDato = false;
    }
    return isDato;
}
// funcion para cargar el modal de agregar venta con los productos del carrito de ventas
const cargarModalAgregar = () => {
    // se obtiene el boton de cerrar modal usando el id btnCerrarModal
    const btnCerrarModal = document.getElementById('btnCerrarModal');
    // se obtiene el titulo del modal usando el id exampleModalLabel
    const tituloModal = document.getElementById('exampleModalLabel');
    // se obtiene el contenido del modal usando el id contenido-modal
    const contenidoModal = document.getElementById('contenido-modal');
    // se obtiene el carrito de ventas del sessionStorage
    const carritoVenta = JSON.parse(sessionStorage.getItem('carritoVenta'));
    // se crea una variable productosModal para almacenar los productos del carrito de ventas
    let productosModal = '';

    // se cambia el titulo del modal a Agregar Venta
    tituloModal.innerHTML = "Agregar Venta";
    // se limpia el contenido del modal
    contenidoModal.innerHTML = "";

    // se verifica si el carrito de ventas no es nulo y tiene al menos un producto
    if (carritoVenta != null && carritoVenta.length > 0) {
        // se imprime en consola los productos del carrito de ventas
        // console.log(carritoVenta);
        // se recorre cada producto del carrito de ventas 
        carritoVenta.forEach(producto => {
            // se agrega el codigo del producto y un input para la cantidad del producto
            productosModal += `
                        <div class="mb-2">
                            <!--<p class="text-center mb-0 mt-2">Nombre del producto</p>-->
                            <label class="form-label">${producto.codigoProducto}</label>
                            <input type="number" class="form-control" placeholder="Cantidad" data-codigoProductoAdd="${producto.codigoProducto}" min="1" value="1">
                        </div>
                    `;
        });
        // al terminar de recorrer los productos del carrito de ventas se agrega un boton para guardar la venta
        productosModal += `
                    <div class="text-center mt-3">
                        <button type="button" class="btn btn-success" id="btnGuardarVenta">Guardar Venta</button>
                    </div>
                `;
    } else {
        // en caso de que el carrito de ventas sea nulo o no tenga productos se agrega un mensaje de alerta
        productosModal = `
            <div class="alert alert-danger p-2 m-5 text-center">
                No hay productos en el carrito de ventas. Vaya a <a>productos</a> para agregar.
            </div>
        `;
    }
    // se agregan los productos del carrito de ventas al contenido del modal
    contenidoModal.innerHTML = productosModal;

    // se obtiene el boton de guardar venta usando el id btnGuardarVenta
    const btnGuardarVenta = document.getElementById('btnGuardarVenta');
    // se agrega un evento click al boton de guardar venta
    btnGuardarVenta.addEventListener('click', (event) => {
        
         const inputs = document.querySelectorAll('input[data-codigoProductoAdd]');
        // se recorre cada input de cantidad
        inputs.forEach(input => {
            console.log(input.value)
            if(!validarDato(input.value)){
                alert("El dato tiene que ser un numero mayor a 0")
                return
            }
        });
        // se crea la url de la api para guardar la venta
        const apiURL = 'http://localhost:8080/api/ventas/guardar';
        // se crea un objeto Venta vacio
        let Venta = {};
        // se crea un queryString con los datos de la venta
        let queryString = {
            datosVenta: JSON.stringify(Venta)
        };
        // se hace la petición a la api para guardar la venta
        fetch(apiURL, {
            // se especifica el método de la petición POST
            method: 'POST',
            // se especifica el tipo de contenido que se espera en la respuesta
            headers:{
                "Content-Type": "application/x-www-form-urlencoded"
            },
            // se envia el queryString con los datos de la venta
            body: new URLSearchParams(queryString)
        })
            // se convierte la respuesta a un objeto json
            .then(res => res.json())
            // se obtiene el objeto json
            .then(data => {
                // querySelectorAll sirve para obtener todos los elementos que tengan la clase especificada
                // retorna un arreglo de elementos
                // se obtienen los inputs de cantidad usando el atributo data-codigoProductoAdd
                const inputs = document.querySelectorAll('input[data-codigoProductoAdd]');
                // se recorre cada input de cantidad
                inputs.forEach(input => {
                    // se imprime en consola el codigo del producto del input
                    // console.log(input.getAttribute('data-codigoProductoAdd'));
                    // se crea un objeto ProductoVenta con los datos de la venta
                    let ProductoVenta = {
                        // se obtiene el codigo de la venta del objeto data
                        codigoVenta: data.codigoVenta,
                        // se obtiene el codigo del producto del input usando el atributo data-codigoProductoAdd
                        codigoProducto: input.getAttribute('data-codigoProductoAdd'),
                        // se obtiene la cantidad del producto del valor del input
                        cantidad: input.value
                    };
                    // se crea un queryString con los datos del ProductoVenta
                    let queryString = {
                        datosProductoVenta: JSON.stringify(ProductoVenta)
                    };
                    // se imprime en consola el queryString
                    // console.log(queryString);

                    // se crea la url de la api para guardar el producto de la venta
                    const apiURL = 'http://localhost:8080/api/producto_ventas/guardar';
                    // se hace la petición a la api para guardar el producto de la venta
                    fetch(apiURL, {
                        // se especifica el método de la petición POST
                        method: 'POST',
                        // se especifica el tipo de contenido que se espera en la respuesta
                        headers:{
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                        // se envia el queryString con los datos del ProductoVenta
                        body: new URLSearchParams(queryString)
                    })
                        // se convierte la respuesta a un objeto json
                        .then(res => res.json())
                        // se obtiene el objeto json
                        .then(res => {
                            // se imprime en consola la respuesta de la api
                            // console.log(res);
                            // se limpia el contenido del modal
                            btnCerrarModal.click();
                            // se llama a la función controllerVentas para cargar la tabla de ventas
                            cargarTablaVentas();
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
                                text: "La venta con codigo "+data.codigoVenta+" fue agregada correctamente.",
                                // pasamos el parametro para el color de fondo del mensaje 
                                // se usa una verificación si isDarkMode es true el color de fondo es #333 si no es #fff
                                background: isDarkMode ? '#333' : '#fff',
                                // pasamos el parametro para el color del texto del mensaje
                                // se usa una verificación si isDarkMode es true el color del texto es #fff si no es #000
                                color: isDarkMode ? '#fff' : '#000',
                                icon: "success"
                            });
                        });
                });
            });
    })
};
// se obtiene el boton de cerrar modal usando el id btnCerrarModal
btnCerrarModal = document.getElementById('btnCerrarModal');
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
const verificarToken = () => {
    event.preventDefault();

    const user = localStorage.getItem('usuario');   
    const token = localStorage.getItem('token')
    const usuario = {
        usuario: user,
        token: token
    };
    // convertir los datos a un formato valido para el servicio
    let queryString = {
        datosUsuario: JSON.stringify(usuario)
    }
    fetch('http://localhost:8080/api/usuario/checkToken', {
        method: 'POST',
        headers: {
            // se especifica el tipo de contenido en la peticion
            "Content-Type": "application/x-www-form-urlencoded"
        },
        // se envia la variable con el formato valido
        body: new URLSearchParams(queryString)
    })
    .then(response => response.json())
    .then(data => {
        // se imprimo la respuesta del servicio
        console.log(data);
        if(!data.isToken){
           localStorage.clear();
           window.location.href = '/';
        }
        
    })
}
// se espera a que el contenido del documento se haya cargado
document.addEventListener('DOMContentLoaded', () =>{
    verificarToken();
    // se llama a la función controllerVentas para cargar la tabla de ventas
    cargarTablaVentas();
    // se llama a la función cargarModalAgregar para cargar el modal de agregar venta
    const btnAgregar = document.getElementById('btnAgregar');
    btnAgregar.addEventListener('click', (event) => {
        // se llama a la función cargarModalAgregar para cargar el modal de agregar venta
        cargarModalAgregar();
    })
});
