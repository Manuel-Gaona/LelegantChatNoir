// -----------------------------------------------------------------------------------------------------
// codigo para cargar la tabla y la funcionalidad de los botones editar y eliminar que se incluyen en las filas de la tabla
// -----------------------------------------------------------------------------------------------------

const templateTabla = (data) => {
    let filas = '';
    data.forEach(empleado => {
        const templateBotones = `
        <div class="btn-group">
            <button class="btn btn-outline-warning btn-sm btn-editar" data-idEmpleado="${empleado.codigoEmpleado}" data-bs-toggle="modal" data-bs-target="#Agregar"><i class="bi bi-pencil-square"></i></button>
            <button class="btn btn-outline-danger btn-sm btn-eliminar" data-idEmpleado="${empleado.codigoEmpleado}"><i class="bi bi-trash""></i></button>
        </div>
        `;
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
    return `<thead>
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
}
const cargarTablaEmpleados = () => {
    const apiURL = 'http://localhost:8080/api/empleado/getAll';
    fetch(apiURL, {
        method: 'GET'
    })
    .then(res => res.json())
    .then(data => {
        const tabla = document.getElementById('tabla');
        tabla.innerHTML = templateTabla(data);
// -----------------------------------------------------------------------------------------------------
// codigo agregar la funcionalidad de los botones editar y eliminar que se incluyen en las filas de la tabla
// -----------------------------------------------------------------------------------------------------
        const btnEditar = document.querySelectorAll('.btn-editar');
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
        console.error('Error al cargar los datos:', error);
    });
}

// -----------------------------------------------------------------------------------------------------
// código para cargar el modal de editar empleado con los datos del empleado seleccionado en la tabla
// -----------------------------------------------------------------------------------------------------
const cargarModalEditar = (codigoEmpleado) => {
    const btnCerrarModal = document.getElementById('btnCerrarModal');
    const tituloModal = document.getElementById('exampleModalLabel');
    const contenidoModal = document.getElementById('contenido-modal');

    tituloModal.innerHTML = "Editar Empleado";
    contenidoModal.innerHTML = "";

    const url = `http://localhost:8080/api/empleado/getByCode?filtro=${codigoEmpleado}`;

    fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        }
    })
    .then(res => res.json())
    .then(empleado => {
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
                            <button type="button" class="btn btn-success" id="btnEditarEmpleado">Guardar Empleado</button>
                        </div>
                    `;    })
    .catch(error => {
        console.error('Error al cargar el empleado:', error);
    });
}
// -----------------------------------------------------------------------------------------------------
// código para cargar el modal de agregar empleado
// -----------------------------------------------------------------------------------------------------
const templateAgregar = () => {
    const estados = [
        "AGUASCALIENTES", "BAJA CALIFORNIA", "BAJA CALIFORNIA SUR", "CAMPECHE", "COAHUILA",
        "COLIMA", "CHIAPAS", "CHIHUAHUA", "DISTRITO FEDERAL", "DURANGO",
        "GUANAJUATO", "GUERRERO", "HIDALGO", "JALISCO", "MEXICO",
        "MICHOACAN", "MORELOS", "NAYARIT", "NUEVO LEON", "OAXACA",
        "PUEBLA", "QUERETARO", "QUINTANA ROO", "SAN LUIS POTOSI", "SINALOA",
        "SONORA", "TABASCO", "TAMAULIPAS", "TLAXCALA", "VERACRUZ",
        "YUCATAN", "ZACATECAS", "NACIDO EN EL EXTRANJERO"
    ];
    let opcionEstados = "";
    estados.forEach(estado => {
        opcionEstados += `<option value="${estado}">${estado}</option>`
    });
    return `<form id="registroEmpleado">
        <div class="form-floating m-2">
            <input type="text" class="form-control form-control-sm" id="nombreEmpleado" required>
            <label for="nombreEmpleado">Nombre</label>
        </div>
        <div class="form-floating m-2">
            <input type="text" class="form-control form-control-sm" id="apellidoPaterno" required>
            <label for="apellidoPaterno">Apellido Paterno</label>
        </div>
        <div class="form-floating m-2">
            <input type="text" class="form-control form-control-sm" id="apellidoMaterno" required>
            <label for="apellidoMaterno">Apellido Materno</label>
        </div>
        <div class="form-floating m-2">
            <select class="form-control form-control-sm" id="genero" required>
                <option value="HOMBRE">Hombre</option>
                <option value="MUJER">Mujer</option>
            </select>
            <label for="genero">Genero</label>
        </div>
        <div class="form-floating m-2">
            <input type="date" class="form-control form-control-sm" id="fechaNacimiento" required>
            <label for="fechaNacimiento">Fecha de Nacimiento</label>
        </div>
        <div class="form-floating m-2">
            <select class="form-control form-control-sm" id="estado" reqeuired>
                ${opcionEstados}
            </select>
            <label for="estado">Estado</label>
        </div>
        <div class="form-floating m-2">
            <select class="form-control form-control-sm" id="rol" reqeuired>
                <option value="ADMS">ADMS</option>
                <option value="EMPS">EMPS</option>
            </select>
            <label for="rol">Rol</label>
        </div>
        <div class="text-center mt-3">
            <button type="submit" class="btn btn-success" id="btnGuardar">Guardar Empleado</button>
        </div>
    </form>`;
}
const validarDato = (dato, nombre) => {
    let isDato = true;
    if(dato === ""){
        alert(`El ${nombre}no puede estar vacio`);
        isDato = false;
    }
    if(dato.includes("!")){
        alert(`El ${nombre} no puede incluir "!"`)
        isDato = false;
    }
    const num = /^[^\d]+$/.test(dato);
    if (!num){
        alert(`El ${nombre} no puede tener numeros`);
        isDato = false;
    }
    if (dato !== dato.trim()){
        alert(`El ${nombre} no puede tener espacios al incio o fin`);
        isDato = false;
    }
    const doscaracteres = /.{2,}/.test(dato);
    if(doscaracteres === false){
        alert(`El ${nombre} debe contener almenos 2 caracteres`);
        isDato = false;
    }
    return isDato;
}
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
    contenidoModal.innerHTML = templateAgregar();

    // se obtiene el botón de guardar empleado usando el id btnGuardarEmpleado
    const btnGuardar = document.getElementById('registroEmpleado');
    // se agrega un evento click al botón de guardar empleado
    btnGuardar.addEventListener('submit',function (e) {
        e.preventDefault();
        const inputnombre = document.getElementById('nombreEmpleado');
        const inputapellidoP = document.getElementById('apellidoPaterno');
        const inputapellidoM = document.getElementById('apellidoMaterno');
        const inputgenero = document.getElementById('genero');
        const inputfechaNacimiento = document.getElementById('fechaNacimiento');
        const inputestado = document.getElementById('estado');
        const inputrol = document.getElementById('rol');
        
        let nombreValue = inputnombre.value;
        if(!validarDato(nombreValue, "nombre")){
            alert("Nombre Invalido")
            return
        }
        let apellidoPValue = inputapellidoP.value;
        if(!validarDato(apellidoPValue, "apellido paterno")){
            alert("Apellido paterno Invalido")
            return
        }
        let apellidoMValue = inputapellidoM.value;
        if(!validarDato(nombreValue, "apellido materno")){
            alert("Apellido materno Invalido")
            return
        }
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
document.addEventListener('DOMContentLoaded', () => {
    verificarToken();
    // se llama a la función para cargar la tabla de empleados
    cargarTablaEmpleados();
    // se obtiene el botón agregar
    const btnAgregar = document.getElementById('btnAgregar');
    btnAgregar.addEventListener('click', () => {
        // se llama a la función para cargar el modal de agregar empleado
        cargarModalAgregar();
    });
});