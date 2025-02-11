// -----------------------------------------------------------------------------------------------------
// codigo para cargar la tabla y la funcionalidad de los botones editar y eliminar que se incluyen en las filas de la tabla
// -----------------------------------------------------------------------------------------------------
const cargarTablaEmpleados = () => {
    // url de la api para obtener todas las Compras
    const apiURL = 'http://localhost:8080/api/empleado/getAll';
    // se hace la petición a la api para obtener todas las compras usando la url
    fetch(apiURL, {
        // se especifica el método de la petición GET
        method: 'GET'
    })
            // se convierte la respuesta a un objeto json
            .then(res => res.json())
            // se obtiene el objeto json y se recorre cada compra para mostrarla en la tabla
            .then(data => {
                // se obtiene la tabla de la vista usando el id tabla
                const tabla = document.getElementById('tabla');
                // se crea una variable filas para almacenar las filas de la tabla
                let filas = '';
                // se recorre cada compra y se crea una fila con los datos de la compra
                data.forEach(empleado => {
                    // se crea una plantilla para los botones de editar y eliminar
                    const templateBotones = `
                    <div class="btn-group">
                        <button class="btn btn-outline-warning btn-sm btn-editar" data-idEmpleado="${empleado.codigoEmpleado}" data-bs-toggle="modal" data-bs-target="#Agregar"><i class="bi bi-pencil-square"></i></button>
                        <button class="btn btn-outline-danger btn-sm btn-eliminar" data-idEmpleado="${empleado.codigoEmpleado}"><i class="bi bi-trash""></i></button>
                    </div>
                `;
                    // se agrega una fila a la variable filas con los datos de la venta
                    filas += `
                <tr>
                    <td class="text-truncate">${empleado.idEmpleado}</td>
                    <td class="text-truncate">${empleado.codigoEmpleado}</td>
                    <td class="text-truncate">${empleado.email}</td>
                    <td class="text-truncate">${empleado.fechaIngreso}</td>
                    <td class="text-truncate">${empleado.antiguedad}</td>
                    <td class="text-truncate text-center align-middle">
                        <div class="alert ${empleado.estatusEmpleado ? "alert-success" : "alert-danger"} p-2 m-0">
                            ${empleado.estatusEmpleado ? "Activo" : "Inactivo"}
                        </div>
                    </td>
                    <td class="text-truncate text-center">
                    ${empleado.estatusEmpleado ? templateBotones : ""}
                    </td>
                </tr>
            `;
                });
                // se agrega las cabeceras de la tabla y las filas a la tabla
                tabla.innerHTML = `
            <thead>
                <tr>
                    <th class="text-truncate">ID Empleado</th>
                    <th class="text-truncate">Codigo</th>
                    <th class="text-truncate">Email</th>
                    <th class="text-truncate">Fecha de Ingreso</th>
                    <th class="text-truncate">Antiguedad</th>
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
                btnEditar.forEach(btn => {
                    // se agrega un evento click al boton de editar
                    btn.addEventListener('click', (event) => {
                        // el metodo getAttribute obtiene el valor de un atributo de un elemento html
                        // en este caso se obtiene el id de la venta del boton de editar usando el atributo data-idVenta del boton de editar
                        const codigoEmpleado = btn.getAttribute('data-idEmpleado');
                        // se busca la venta en el arreglo de ventas almacenado en data usando el id de la venta
                        const empleado = data.find(c => c.codigoEmpleado == codigoEmpleado);
                        // se imprime en consola el id de la venta
                        console.log(codigoEmpleado);
                        // usando el codigo de la venta se llama a la función cargarModalEditar para cargar el modal de editar
                        cargarModalEditar(empleado.codigoEmpleado);
                    })
                });
                // se recorre cada boton de eliminar almacenado en la constante btnElminar
                btnEliminar.forEach(btn => {
                    // se agrega un evento click al boton de eliminar para mostrar un mensaje de confirmación
                    btn.addEventListener('click', (event) => {
                        // el metodo getAttribute obtiene el valor de un atributo de un elemento html
                        // en este caso se obtiene el id de la venta del boton de eliminar usando el atributo data-idVenta del boton de eliminar
                        const idCompra = btn.getAttribute('data-idEmpleado');
                        // se busca la venta en el arreglo de ventas almacenado en data usando el id de la venta
                        const compra = data.find(c => c.idEmpleado == idEmpleado);

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
                            title: "Desea eliminar este empleado?",
                            // pasamos el parametro del texto del mensaje
                            text: `Eliminara la compra con id ${idEmpleado} y codigo ${empleado.codigoEmpleado}`,
                            // pasamos el parametro del icono del mensaje
                            icon: "warning",
                            // pasamos el parametro para mostrar el boton de cancelar
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
                            cancelButtonColor: "#3085d6",
                            // pasamos el parametro para el texto del boton de confirmar
                            confirmButtonText: "Eliminar",
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
                                Swal.fire({
                                    title: "Eliminado!",
                                    background: isDarkMode ? '#333' : '#fff',
                                    color: isDarkMode ? '#fff' : '#000',
                                    text: `Empleado "${empleado.codigoEmpleado}" fue eliminado.`,
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
                console.error('Error al cargar los empleados:', error);
            });
}

// -----------------------------------------------------------------------------------------------------
// código para cargar el modal de editar empleado con los datos del empleado seleccionado en la tabla
// -----------------------------------------------------------------------------------------------------
const cargarModalEditar = (codigoEmpleado) => {
    // se obtiene el boton de cerrar modal usando el id btnCerrarModal
    const btnCerrarModal = document.getElementById('btnCerrarModal');
    // se obtiene el titulo del modal usando el id exampleModalLabel
    const tituloModal = document.getElementById('exampleModalLabel');
    // se obtiene el contenido del modal usando el id contenido-modal
    const contenidoModal = document.getElementById('contenido-modal');

    // se cambia el titulo del modal a Editar Empleado
    tituloModal.innerHTML = "Editar Empleado";
    // se limpia el contenido del modal
    contenidoModal.innerHTML = "";
    // se crea una variable productosModal para almacenar los productos de la venta
    let EmpleadoModal = '';

    // se crea la url de la api para obtener los productos de la venta usando el codigo de la venta como filtro
    // en este caso se hara una peticion GET a la api para obtener los productos de la venta que coincidan con el codigo de la venta
    const url = `http://localhost:8080/api/empleado/getByCode?filtro=${codigoEmpleado}`;

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
            console.log(data);
            // se verifica si la respuesta de la api no es nula y tiene al menos un producto
            if (data != null && data.length > 0) {
                data.forEach((e, index) => {
                    console.log(e);
                    // se crea un formulario para editar los productos de la venta
                    EmpleadoModal = '';
                    // se imprime en consola los productos de la venta
                    // console.log(data)
                    // se recorre cada producto de la venta almacenado en data para almacenarlo en una fila del formulario
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
                    contenidoModal.innerHTML = `
                        <div class="form-floating">
                            <input type="text" class="form-control form-control-sm" id="nombreEmpleado" placeholder="Nombre">
                            <label for="nombreEmpleado">Nombre</label>
                        </div>
                        <div class="form-floating">
                            <input type="text" class="form-control form-control-sm" id="apellidoPaterno" placeholder="Apellido Paterno">
                            <label for="apellidoPaterno">Apellido Paterno</label>
                        </div>
                        <div class="form-floating">
                            <input type="text" class="form-control form-control-sm" id="apellidoMaterno" placeholder="Apellido Materno">
                            <label for="apellidoMaterno">Apellido Materno</label>
                        </div>
                        <div class="form-floating">
                            <input type="text" class="form-control form-control-sm" id="genero" placeholder="Género">
                            <label for="genero">Género</label>
                        </div>
                        <div class="form-floating">
                            <input type="date" class="form-control form-control-sm" id="fechaNacimiento">
                            <label for="fechaNacimiento">Fecha de Nacimiento</label>
                        </div>
                        <div class="form-floating">
                            <input type="text" class="form-control form-control-sm" id="estado" placeholder="Estado">
                            <label for="estado">Estado</label>
                        </div>
                        <div class="form-floating">
                            <input type="text" class="form-control form-control-sm" id="rol" placeholder="Rol">
                            <label for="rol">Rol</label>
                        </div>
                        <div class="text-center mt-3">
                            <button type="button" class="btn btn-success" id="btnGuardarEmpleado">Guardar Empleado</button>
                        </div>
                    `;

                    const btnGuardarCambios = document.getElementById('btnGuardarEmpleado');
                    // se agrega un evento click al boton de guardar cambios
                    btnGuardarCambios.addEventListener('click', (event) => {
                        const inputnombre = document.getElementById('nombreEmpleado');
                        const inputapellidoP = document.getElementById('apellidoPaterno');
                        const inputapellidoM = document.getElementById('apellidoMaterno');
                        const inputgenero = document.getElementById('genero');
                        const inputfechaNacimiento = document.getElementById('fechaNacimiento');
                        const inputestado = document.getElementById('estado');
                        const inputrol = document.getElementById('rol');

                        let Empleado = {
                            idEmpleado: e.idEmpleado,
                            nombre: inputnombre.value,
                            apellidoP: inputapellidoP.value,
                            apellidoM: inputapellidoM.value,
                            genero: inputgenero.value,
                            fechaNac: inputfechaNacimiento.value,
                            estado: inputestado.value,
                            usuario: { rol: inputrol.value }
                        };

                        let queryString = {
                            datosEmpleado: JSON.stringify(Empleado)
                        };
                        console.log(queryString);
                        const url = 'http://localhost:8080/api/empleado/guardar';

                        fetch(url, {
                            method: 'POST',
                            headers: {
                                "Content-Type": "application/x-www-form-urlencoded"
                            },
                            body: new URLSearchParams(queryString)
                        }).then(res => res.json())
                            .then(data => {
                                btnCerrarModal.click();
                                // se llama a la función cargarTablaEmpleados para cargar la tabla de empleados
                                cargarTablaEmpleados();
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
                                    title: "Se actualizaron los empleados!",
                                    text: "Los empleados fueron actualizados correctamente.",
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
                } else {
                // en caso de que la respuesta de la api sea nula o no tenga productos
                // se agrega un mensaje de alerta en el contenido del modal
                contenidoModal.innerHTML = `
                    <div class="alert alert-danger p-2 m-5 text-center">
                        No hay productos en esta compra.
                    </div>
                `;
            }
        })
        // se captura el error si ocurre alguno
        .catch(error => {
            // se imprime el error en consola
            console.error('Error:', error);
        });
}

// Llamar a la función inicial para cargar la tabla al inicio
cargarTablaEmpleados();

// -----------------------------------------------------------------------------------------------------
// código para cargar el modal de agregar empleado
// -----------------------------------------------------------------------------------------------------

// función para cargar el modal de agregar empleado
const cargarModalAgregar = () => {
    // se obtiene el botón de cerrar modal usando el id btnCerrarModal
    const btnCerrarModal = document.getElementById('btnCerrarModal');
    // se obtiene el título del modal usando el id exampleModalLabel
    const tituloModal = document.getElementById('exampleModalLabel');
    // se obtiene el contenido del modal usando el id contenido-modal
    const contenidoModal = document.getElementById('contenido-modal');

    // se cambia el título del modal a Agregar Empleado
    tituloModal.innerHTML = "Agregar Empleado";
    // se limpia el contenido del modal
    contenidoModal.innerHTML = `
        <div class="form-floating">
            <input type="text" class="form-control form-control-sm" id="nombreEmpleado" placeholder="Nombre">
            <label for="nombreEmpleado">Nombre</label>
        </div>
        <div class="form-floating">
            <input type="text" class="form-control form-control-sm" id="apellidoPaterno" placeholder="Apellido Paterno">
            <label for="apellidoPaterno">Apellido Paterno</label>
        </div>
        <div class="form-floating">
            <input type="text" class="form-control form-control-sm" id="apellidoMaterno" placeholder="Apellido Materno">
            <label for="apellidoMaterno">Apellido Materno</label>
        </div>
        <div class="form-floating">
            <input type="text" class="form-control form-control-sm" id="genero" placeholder="Género">
            <label for="genero">Género</label>
        </div>
        <div class="form-floating">
            <input type="date" class="form-control form-control-sm" id="fechaNacimiento">
            <label for="fechaNacimiento">Fecha de Nacimiento</label>
        </div>
        <div class="form-floating">
            <input type="text" class="form-control form-control-sm" id="estado" placeholder="Estado">
            <label for="estado">Estado</label>
        </div>
        <div class="form-floating">
            <input type="text" class="form-control form-control-sm" id="rol" placeholder="Rol">
            <label for="rol">Rol</label>
        </div>
        <div class="text-center mt-3">
            <button type="button" class="btn btn-success" id="btnGuardarEmpleado">Guardar Empleado</button>
        </div>
    `;

    // se obtiene el botón de guardar empleado usando el id btnGuardarEmpleado
    const btnGuardarEmpleado = document.getElementById('btnGuardarEmpleado');
    // se agrega un evento click al botón de guardar empleado
    btnGuardarEmpleado.addEventListener('click', (event) => {
        const inputnombre = document.getElementById('nombreEmpleado');
        const inputapellidoP = document.getElementById('apellidoPaterno');
        const inputapellidoM = document.getElementById('apellidoMaterno');
        const inputgenero = document.getElementById('genero');
        const inputfechaNacimiento = document.getElementById('fechaNacimiento');
        const inputestado = document.getElementById('estado');
        const inputrol = document.getElementById('rol');
        const apiURL = 'http://localhost:8080/api/empleado/guardar';

        let Empleado = {
            nombre: inputnombre.value,
            apellidoP: inputapellidoP.value,
            apellidoM: inputapellidoM.value,
            genero: inputgenero.value,
            fechaNac: inputfechaNacimiento.value,
            estado: inputestado.value,
            usuario: {rol: inputrol.value}
        };

        // se crea un objeto Empleado con los datos ingresados
        let queryString = {
            datosEmpleado: JSON.stringify(Empleado)

        };
        console.log(queryString);
        fetch(apiURL, {
            // se especifica el método de la petición POST
            method: 'POST',
            // se especifica el tipo de contenido que se espera en la respuesta
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            // se envía el objeto empleado en formato
            body: new URLSearchParams(queryString)
        })
                .then(res => res.json())
                .then(data => {
                    // se imprime en consola la respuesta de la API
                    console.log(data);
                    // se limpia el contenido del modal
                    btnCerrarModal.click();
                    // se llama a la función para cargar la tabla de empleados
                    cargarTablaEmpleados();
                    // se obtiene el tema de la página usando el atributo data-bs-theme del elemento html
                    let theme = document.documentElement.getAttribute('data-bs-theme');
                    let isDarkMode = theme === 'dark';
                    // se muestra un mensaje de confirmación del empleado agregado
                    Swal.fire({
                        title: "Empleado agregado correctamente!",
                        text: "El empleado con código " + data.codigoEmpleado + " fue agregado correctamente.",
                        background: isDarkMode ? '#333' : '#fff',
                        color: isDarkMode ? '#fff' : '#000',
                        icon: "success"
                    });
                });
    });
};

// se obtiene el botón de cerrar modal usando el id btnCerrarModal
const btnCerrarModal = document.getElementById('btnCerrarModal');
// se agrega un evento click al botón de cerrar modal
btnCerrarModal.addEventListener('click', () => {
    // se obtiene el título del modal usando el id exampleModalLabel
    const tituloModal = document.getElementById('exampleModalLabel');
    // se obtiene el contenido del modal usando el id contenido-modal
    const contenidoModal = document.getElementById('contenido-modal');
    // se limpia el título del modal
    tituloModal.innerHTML = "";
    // se limpia el contenido del modal
    contenidoModal.innerHTML = "";
});

// se espera a que el contenido del documento se haya cargado
document.addEventListener('DOMContentLoaded', () => {
    // se llama a la función para cargar la tabla de empleados
    cargarTablaEmpleados();
    // se obtiene el botón agregar
    const btnAgregar = document.getElementById('btnAgregar');
    btnAgregar.addEventListener('click', () => {
        // se llama a la función para cargar el modal de agregar empleado
        cargarModalAgregar();
    });
});