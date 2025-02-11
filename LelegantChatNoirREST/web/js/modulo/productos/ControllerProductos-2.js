// -----------------------------------------------------------------------------------------------------
// codigo para cargar la tabla y la funcionalidad de los botones editar y eliminar que se incluyen en las filas de la tabla
// -----------------------------------------------------------------------------------------------------
const cargarTablaProductos = () => {
    // url de la api para obtener todos los productos
    const apiURL = 'http://localhost:8080/api/producto/getAll';
    // se hace la petición a la api para obtener todos los productos usando la url
    fetch(apiURL, {
        // se especifica el método de la petición GET
        method: 'GET'
    })
            // se convierte la respuesta a un objeto json
            .then(res => res.json())
            // se obtiene el objeto json y se recorre cada producto para mostrarlo en la tabla
            .then(data => {
                // se obtiene la tabla de la vista usando el id tabla
                const tabla = document.getElementById('tabla');
                // se crea una variable filas para almacenar las filas de la tabla
                let filas = '';
                // se recorre cada producto y se crea una fila con los datos de la producto
                data.forEach(producto => {
                    // se crea una plantilla para los botones de editar y eliminar
                    const templateBotones = `
                    <div class="btn-group">
                        <button class="btn btn-outline-secondary btn-sm btn-carritoCompra" data-codigoProducto="${producto.codigoProducto}"><i class="bi bi-building-down"></i></button>
                        <button class="btn btn-outline-success btn-sm btn-carritoVenta" data-codigoProducto="${producto.codigoProducto}"><i class="bi bi-cart"></i></button>
                        <button class="btn btn-outline-warning btn-sm btn-editar" data-idProducto="${producto.idProducto}" data-bs-toggle="modal" data-bs-target="#Agregar"><i class="bi bi-pencil-square"></i></button>
                        <button class="btn btn-outline-danger btn-sm btn-eliminar" data-idProducto="${producto.idProducto}"><i class="bi bi-trash""></i></button>
                    </div>
                `;
                    // se agrega una fila a la variable filas con los datos del producto
                    filas += `
                <tr>
                    <td class="text-truncate">${producto.idProducto}</td>
                    <td class="text-truncate">${producto.codigoProducto}</td>
                    <td class="text-truncate">${producto.nombre}</td>
                    <td class="text-truncate">${producto.descripcion}</td>
                    <td class="text-truncate">${producto.fechaIngreso}</td>
                    <td class="text-truncate">${producto.duracion}</td>
                    <td class="text-truncate">${producto.fechaCaducidad}</td>
                    <td class="text-truncate">${producto.precioCompra}</td>
                    <td class="text-truncate">${producto.precioVenta}</td>
                    <td class="text-truncate">${producto.stock}</td>
                    <td class="text-truncate text-center align-middle">
                        <div class="alert ${producto.estatus ? "alert-success" : "alert-danger"} p-2 m-0">
                            ${producto.estatus ? "Activo" : "Inactivo"}
                        </div>
                    </td>
                    <td class="text-truncate text-center">
                    ${producto.estatus ? templateBotones : ""}
                    </td>
                </tr>
            `;
                });
                // se agrega las cabeceras de la tabla y las filas a la tabla
                tabla.innerHTML = `
            <thead>
                <tr>
                    <th class="text-truncate">ID</th>
                    <th class="text-truncate">Codigo</th>
                    <th class="text-truncate">nombre</th>
                    <th class="text-truncate">descripcion</th>
                    <th class="text-truncate">fechaIngreso</th>
                    <th class="text-truncate">duracion</th>
                    <th class="text-truncate">fechaCaducidad</th>
                    <th class="text-truncate">precioCompra</th>
                    <th class="text-truncate">precioVenta</th>
                    <th class="text-truncate">stock</th>
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
                // se obtiene el boton de carritoCompra usando la clase btn-carritoCompra y querySelectorAll
                // se almacenan los botones de carritoCompra en la variable btnCarritoCompra
                const btnCarritoCompra = document.querySelectorAll('.btn-carritoCompra');
                // se obtiene el boton de carritoVenta usando la clase btn-carritoVenta y querySelectorAll
                // se almacenan los botones de carritoVenta en la variable btnCarritoVenta
                const btnCarritoVenta = document.querySelectorAll('.btn-carritoVenta');
                // se obtiene el boton de edita usando la clase btn-editar y querySelectorAll
                // se almacenan los botones de editar en la variable btnEditar
                const btnEditar = document.querySelectorAll('.btn-editar');
                // se obtiene el boton de eliminar usando la clase btn-eliminar y querySelectorAll
                // se almacenan los botones de eliminar en la variable btnEliminar
                const btnEliminar = document.querySelectorAll('.btn-eliminar');

                // se recorre cada boton de carritoCompra almacenado en la constante btnCarritoCompra
                btnCarritoCompra.forEach(btn => {
                    // se agrega un evento click al boton de carritoCompra
                    btn.addEventListener('click', (event) => {
                        // el metodo getAttribute obtiene el valor de un atributo de un elemento html
                        // en este caso se obtiene el codigo del producto del boton de carritoCompra usando el atributo data-codigoProducto del boton de carritoCompra
                        const codigoProducto = btn.getAttribute('data-codigoProducto');
                        // console.log(codigoProducto);
                        // se busca el carritoCompra en sessionStorage
                        let carritoCompra = JSON.parse(sessionStorage.getItem('carritoCompra'));
                        // se verifica si el carritoCompra es nulo
                        if (carritoCompra === null) {
                            // si el carritoCompra es nulo se crea un arreglo vacio
                            carritoCompra = [];
                        }
                        // se verifica si el carritoCompra ya tiene el codigo del producto
                        // se busca el producto en el carritoCompra usando el codigo del producto
                        const isProducto = carritoCompra.find(p => p.codigoProducto == codigoProducto);
                        let theme = document.documentElement.getAttribute('data-bs-theme');
                        let isDarkMode = theme === 'dark';
                        // se verifica si el producto ya esta en el carritoCompra
                        if (isProducto !== undefined) {
                            // si el producto ya esta en el carritoCompra se muestra un mensaje de error
                            Swal.fire({
                                title: "Producto ya en el carrito de compra!",
                                background: isDarkMode ? '#333' : '#fff',
                                color: isDarkMode ? '#fff' : '#000',
                                text: "El producto con codigo " + codigoProducto + " ya esta en el carrito de compra.",
                                icon: "error"
                            });
                            // se imprime el carritoCompra en consola
                            // console.log(carritoCompra);
                            // se retorna para salir de la función
                            return;
                        }
                        // se agrega el codigo del producto al carritoCompra como un objeto con el codigo del producto
                        let producto = {codigoProducto: codigoProducto};
                        carritoCompra.push(producto);
                        // se almacena el carritoCompra en sessionStorage
                        sessionStorage.setItem('carritoCompra', JSON.stringify(carritoCompra));
                        // se muestra un mensaje de confirmación de la venta
                        Swal.fire({
                            title: "Se agrego al carrito de compra!",
                            background: isDarkMode ? '#333' : '#fff',
                            color: isDarkMode ? '#fff' : '#000',
                            text: "El producto con codigo " + codigoProducto + " fue agregado al carrito de compra.",
                            icon: "success"
                        });
                        // se imprime el carritoCompra en consola
                        // console.log(sessionStorage.getItem('carritoCompra'));   
                    })
                });

                // se recorre cada boton de carritoVenta almacenado en la constante btnCarritoVenta
                btnCarritoVenta.forEach(btn => {
                    // se agrega un evento click al boton de carritoVenta
                    btn.addEventListener('click', (event) => {
                        // el metodo getAttribute obtiene el valor de un atributo de un elemento html
                        // en este caso se obtiene el codigo del producto del boton de carritoVenta usando el atributo data-codigoProducto del boton de carritoVenta
                        const codigoProducto = btn.getAttribute('data-codigoProducto');
                        // console.log(codigoProducto);
                        // se busca el carritoVenta en sessionStorage
                        let carritoVenta = JSON.parse(sessionStorage.getItem('carritoVenta'));
                        // se verifica si el carritoVenta es nulo
                        if (carritoVenta === null) {
                            // si el carritoVenta es nulo se crea un arreglo vacio
                            carritoVenta = [];
                        }
                        // se verifica si el carritoVenta ya tiene el codigo del producto
                        // se busca el producto en el carritoVenta usando el codigo del producto
                        const isProducto = carritoVenta.find(p => p.codigoProducto == codigoProducto);
                        let theme = document.documentElement.getAttribute('data-bs-theme');
                        let isDarkMode = theme === 'dark';
                        // se verifica si el producto ya esta en el carritoVenta
                        if (isProducto !== undefined) {
                            // si el producto ya esta en el carritoVenta se muestra un mensaje de error
                            Swal.fire({
                                title: "Producto ya en el carrito de venta!",
                                background: isDarkMode ? '#333' : '#fff',
                                color: isDarkMode ? '#fff' : '#000',
                                text: "El producto con codigo " + codigoProducto + " ya esta en el carrito de venta.",
                                icon: "error"
                            });
                            // se imprime el carritoVenta en consola
                            // console.log(carritoVenta);
                            // se retorna para salir de la función
                            return;
                        }
                        // se agrega el codigo del producto al carritoVenta como un objeto con el codigo del producto
                        let producto = {codigoProducto: codigoProducto};
                        carritoVenta.push(producto);
                        // se almacena el carritoVenta en sessionStorage
                        sessionStorage.setItem('carritoVenta', JSON.stringify(carritoVenta));
                        // se muestra un mensaje de confirmación de la venta
                        Swal.fire({
                            title: "Se agrego al carrito de venta!",
                            background: isDarkMode ? '#333' : '#fff',
                            color: isDarkMode ? '#fff' : '#000',
                            text: "El producto con codigo " + codigoProducto + " fue agregado al carrito de venta.",
                            icon: "success"
                        });
                        // se imprime el carritoVenta en consola
                        console.log(sessionStorage.getItem('carritoVenta'));
                    })
                });

                // se recorre cada boton de editar y se agrega un evento click para cargar el modal de editar
                btnEditar.forEach(btn => {
                    // se agrega un evento click al boton de editar
                    btn.addEventListener('click', (event) => {
                        // el metodo getAttribute obtiene el valor de un atributo de un elemento html
                        // en este caso se obtiene el id de la venta del boton de editar usando el atributo data-idVenta del boton de editar
                        const idProducto = btn.getAttribute('data-idProducto');
                        // se llama a la función cargarModalEditar para cargar el modal de editar venta
                        cargarModalEditar(idProducto);
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
const cargarModalEditar = (idProducto) => {
    const btnCerrarModal = document.getElementById('btnCerrarModal');
    const tituloModal = document.getElementById('exampleModalLabel');
    const contenidoModal = document.getElementById('contenido-modal');

    tituloModal.innerHTML = "Editar Producto";
    contenidoModal.innerHTML = "";

    fetch(`http://localhost:8080/api/producto/getById/${idProducto}`)
            .then(res => res.json())
            .then(producto => {
                contenidoModal.innerHTML = `
                <form id="formEditarProducto">
                    <div class="mb-3">
                        <label for="inputCodigoProducto" class="form-label">Código</label>
                        <input type="text" class="form-control" id="inputCodigoProducto" value="${producto.codigoProducto}">
                    </div>
                    <div class="mb-3">
                        <label for="inputNombre" class="form-label">Nombre</label>
                        <input type="text" class="form-control" id="inputNombre" value="${producto.nombre}">
                    </div>
                    <div class="mb-3">
                        <label for="inputDescripcion" class="form-label">Descripción</label>
                        <input type="text" class="form-control" id="inputDescripcion" value="${producto.descripcion}">
                    </div>
                    <div class="mb-3">
                        <label for="inputFechaIngreso" class="form-label">Fecha Ingreso</label>
                        <input type="text" class="form-control" id="inputFechaIngreso" value="${producto.fechaIngreso}">
                    </div>
                    <div class="mb-3">
                        <label for="inputDuracion" class="form-label">Duración</label>
                        <input type="text" class="form-control" id="inputDuracion" value="${producto.duracion}">
                    </div>
                    <div class="mb-3">
                        <label for="inputPrecioCompra" class="form-label">Precio Compra</label>
                        <input type="text" class="form-control" id="inputPrecioCompra" value="${producto.precioCompra}">
                    </div>
                    <div class="mb-3">
                        <label for="inputPrecioVenta" class="form-label">Precio Venta</label>
                        <input type="text" class="form-control" id="inputPrecioVenta" value="${producto.precioVenta}">
                    </div>
                    <div class="mb-3">
                        <label for="inputEstatus" class="form-label">Estatus</label>
                        <input type="text" class="form-control" id="inputEstatus" value="${producto.estatus}">
                    </div>
                    <div class="mb-3">
                        <label for="inputStock" class="form-label">Stock</label>
                        <input type="text" class="form-control" id="inputStock" value="${producto.stock}">
                    </div>
                    <button type="submit" class="btn btn-primary">Guardar cambios</button>
                </form>
            `;

                document.getElementById('formEditarProducto').addEventListener('submit', (event) => {
                    event.preventDefault();
                    const updatedProducto = {
                        idProducto: idProducto,
                        codigoProducto: document.getElementById('inputCodigoProducto').value,
                        nombre: document.getElementById('inputNombre').value,
                        descripcion: document.getElementById('inputDescripcion').value,
                        fechaIngreso: document.getElementById('inputFechaIngreso').value,
                        duracion: document.getElementById('inputDuracion').value,
                        precioCompra: document.getElementById('inputPrecioCompra').value,
                        precioVenta: document.getElementById('inputPrecioVenta').value,
                        estatus: document.getElementById('inputEstatus').value,
                        stock: document.getElementById('inputStock').value
                    };

                    let queryString = {
                        datosProducto: JSON.stringify(updatedProducto)
                    };

                    console.log(queryString);

                    fetch('http://localhost:8080/api/producto/guardar', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
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
                                    title: "Se actualizo correctamente!",
                                    text: "El producto con codigo " + data.codigoProducto + " fue actualizado correctamente.",
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
            })
            .catch(error => {
                console.error('Error al actualizar el producto:', error);
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
    let productosModal = '';

    // se cambia el titulo del modal a Agregar Venta
    tituloModal.innerHTML = "Agregar Producto";
    // se limpia el contenido del modal
    contenidoModal.innerHTML = "";
    // se agrega el codigo del producto y un input para la cantidad del producto
    productosModal += `
                    <div class="form-floating m-1">
                        <input type="text" class="form-control form-control-sm" id="nombreAdd">
                        <label for="nombreAdd">Nombre</label>
                    </div>
                    <div class="form-floating m-1">
                        <input type="text" class="form-control form-control-sm" id="descripcionAdd">
                        <label for="descripcionAdd">Descripcion</label>
                    </div>
                    <div class="form-floating m-1">
                        <input type="number" class="form-control form-control-sm" id="duracionAdd" min="1" value="1">
                        <label for="duracionAdd">Duracion en inventario</label>
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
        const inputNombre = document.getElementById('nombreAdd');
        const inputDescripcion = document.getElementById('descripcionAdd');
        const inputDuracion = document.getElementById('duracionAdd');
        // se crea la url de la api para guardar la venta
        const apiURL = 'http://localhost:8080/api/producto/guardar';
        // se crea un objeto Venta vacio
        let producto = {
            nombre: inputNombre.value,
            descripcion: inputDescripcion.value,
            duracion: inputDuracion.value
        };
        // se crea un queryString con los datos de la venta
        let queryString = {
            datosProducto: JSON.stringify(producto)
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
                        text: "El producto con codigo " + data.codigoProducto + " fue agregada correctamente.",
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
