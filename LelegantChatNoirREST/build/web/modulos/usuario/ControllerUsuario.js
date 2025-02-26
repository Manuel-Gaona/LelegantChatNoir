// -----------------------------------------------------------------------------------------------------
// codigo para cargar la tabla y la funcionalidad de los botones editar y eliminar que se incluyen en las filas de la tabla
// -----------------------------------------------------------------------------------------------------
const templateTabla = (data) => {
    // se crea una variable filas para almacenar las filas de la tabla
    let filas = '';
    // se recorre cada dato y se crea una fila
    data.forEach(usuario => {
        // se crea una plantilla para los botones de editar y eliminar con el id
        let templateBotones = `
            <div class="btn-group">
                <button class="btn btn-outline-danger btn-sm btn-eliminar" data-id="${usuario.idUsuario}"><i class="bi bi-trash""></i></button>
            </div>
        `;
        // se agrega una fila a la variable filas con los datos
        filas += `
            <tr>
                <td class="text-truncate">${usuario.idUsuario}</td>
                <td class="text-truncate">${usuario.usuario}</td>
                <td class="text-truncate">${usuario.rol}</td>
                <td class="text-truncate text-center align-middle">
                    <div class="alert ${usuario.estatusUsuario ? "alert-success" : "alert-danger"} p-2 m-0">
                        ${usuario.estatusUsuario ? "Activo" : "Inactivo"}
                    </div>
                </td>
                <td class="text-truncate text-center">
                ${usuario.estatusUsuario ? templateBotones : ""}
                </td>
            </tr>
        `;
    });
    // se agrega las cabeceras de la tabla y las filas a la tabla
    return `
        <thead>
            <tr>
                <th class="text-truncate">ID</th>
                <th class="text-truncate">usuario</th>
                <th class="text-truncate">rol</th>
                <th class="text-truncate">estatus</th>
                <th class="text-truncate">Acciones</th>
            </tr>
        </thead>
        <tbody>
            ${filas}
        </tbody>
    `;
}
const eliminar = (id) => {
    let usuario = {
            idUsuario: id
        };
    const apiURL = 'http://localhost:8080/api/usuario/delete';
    let queryString = {
        datosUsuario: JSON.stringify(usuario)
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
        cargarTabla();
        let theme = document.documentElement.getAttribute('data-bs-theme');
        let isDarkMode = theme === 'dark';
        Swal.fire({
                title: "Eliminado!",
                background: isDarkMode ? '#333' : '#fff',
                color: isDarkMode ? '#fff' : '#000',
                text: `El usuario fue eliminado`,
                icon: "success"
            });
    });
}
const confirmacionEliminar = (id) => {
    // se obtiene el tema de la página usando el atributo data-bs-theme del elemento html y el metodo getAttribute
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
        title: "Desea eliminar este usuario?",
        // pasamos el parametro del texto del mensaje
        text: `Eliminara el usuario con id ${id} de forma permanente. Esta accion no se puede desacer.`,
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
        // pasamos el parametro para el texto del boton de confirmar
        confirmButtonText: "Eliminar",
        // pasamos el parametro para el texto del boton de cancelar
        cancelButtonText: "Cancelar"
    }).then((result) => {
        // se verifica si el resultado de la confirmación es true
        if (result.isConfirmed) {
            // se muestra un mensaje de confirmación de la eliminación de la venta
            eliminar(id);
        }
    });
}
const cargarTabla = () => {
    // url de la api para obtener todos los datos
    const apiURL = 'http://localhost:8080/api/usuario/getAll';
    // se hace la petición a la api para obtener todos los datos usando la url y el metodo get
    fetch(apiURL, {method: 'GET'})
    // se convierte la respuesta a un objeto json
    .then(res => res.json())
    // se obtiene el objeto json y se recorre cada dato para mostrarlo en la tabla
    .then(data => {
        // se obtiene la tabla de la vista usando el id tabla
        const tabla = document.getElementById('tabla');
        tabla.innerHTML = templateTabla(data);
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

        // se recorre cada boton de eliminar almacenado en la constante btnElminar
        btnEliminar.forEach(btn => {
            // se agrega un evento click al boton de eliminar para mostrar un mensaje de confirmación
            btn.addEventListener('click', (event) => {
                // el metodo getAttribute obtiene el valor de un atributo de un elemento html
                // se obtiene el id del boton de eliminar usando el atributo data-id del boton
                const id = btn.getAttribute('data-id');
                confirmacionEliminar(id);
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
// codigo para cargar el modal de agregar
// -----------------------------------------------------------------------------------------------------

const templateAgregar = () =>
    `<form id="registroUsuario">
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
        <div class="text-center m-2">
            <button type="submit" class="btn btn-success" id="btnGuardar">Guardar</button>
        </div>
    </form>`;
const cargarModalAgregar = () => {
    // se obtiene el boton de cerrar modal usando el id btnCerrarModal
    const btnCerrarModal = document.getElementById('btnCerrarModal');
    // se obtiene el titulo del modal usando el id exampleModalLabel
    const tituloModal = document.getElementById('exampleModalLabel');
    // se obtiene el contenido del modal usando el id contenido-modal
    const contenidoModal = document.getElementById('contenido-modal');
    // se cambia el titulo del modal a Agregar
    tituloModal.innerHTML = "Agregar Usuario";
    // se limpia el contenido del modal
    contenidoModal.innerHTML = "";
    // se agrega el template de agregar
    contenidoModal.innerHTML = templateAgregar();
    // se obtiene el boton de guardar venta usando el id btnGuardar
    const btnGuardar = document.getElementById('registroUsuario');
    // se agrega un evento click al boton de guardar venta
    btnGuardar.addEventListener('submit', function (e) {
        e.preventDefault();
        const inputRol = document.getElementById('rolAdd');
        const inputUsuario = document.getElementById('usuarioAdd');
        const inputContrasenia = document.getElementById('contraseniaAdd');
        const inputCorreo = document.getElementById('correoAdd');
        
        let usuarioValue = inputUsuario.value;
        let isUsuario = true;
        if(usuarioValue == ""){
            alert('El usuario no puede estar vacio')
            isUsuario = false;
        }
        if(usuarioValue.includes("!")){
            alert('El usuario no puede incluir "!"')
            isUsuario = false;
        }
        let nombrecito = usuarioValue.trim();
        if (usuarioValue !== nombrecito){
            alert("El usuario no puede tener espacios al incio o fin, ejemplo: " + nombrecito)
            isUsuario = false;
        }
        let nombreSinMayusculas = nombrecito.toLowerCase();
        if (usuarioValue !== nombreSinMayusculas){
            alert("El usuario no puede tener mayusculas, ejemplo: " + nombreSinMayusculas)
            isUsuario = false;
        }
        let nombreSinEspacios = nombreSinMayusculas.replace(/\s/g,"_");
        if (usuarioValue !== nombreSinEspacios){
            alert("El usuario no puede tener espacios, ejemplo: "+nombreSinEspacios);
            isUsuario = false;
        }
        if(!isUsuario){
            alert("Usuario Invalido")
            return
        }
        
        let clave = inputContrasenia.value;
        let isClave = true;
        const ochocaracteres = /.{8,}/.test(clave);
        if(ochocaracteres === false){
            alert("La contraseña debe contener almenos 8 caracteres");
            isClave = false;
        }
        const mayymin = /(?:[A-Z])/.test(clave) && /(?:[a-z])/.test(clave);
        if(!mayymin){
            alert("La contraseña debe tener al menos una letra mayuscula y una minuscula");
            isClave = false;
        }
        const numeros = /(?:\d)/.test(clave);
        if(!numeros){
            alert("La contraseña debe tener al menos un numero");
            isClave = false;
        }
        const noespecial = !/[^!?A-Za-z\d]/.test(clave);
        if (!noespecial){
            alert("La contraseña no debe contener caracteres especiales");
            isClave = false;
        }
        
        if(!isClave){
            alert("Contraseña invalida");
            return
        }
        // se crea la url de la api para guardar la venta
        const apiURL = 'http://localhost:8080/api/usuario/agregar';
        // se crea un objeto Venta vacio
        let usuario = {
            usuario: usuarioValue,
            contrasenia: clave,
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
            cargarTabla();
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
// funcion para cerrar sesión
const cerrarSesion = () => {
    event.preventDefault();

    const user = localStorage.getItem('usuario');   
    const usuario = {
        usuario: user
    };
    // convertir los datos a un formato valido para el servicio
    let queryString = {
        datosUsuario: JSON.stringify(usuario)
    }
    fetch('http://localhost:8080/api/usuario/logout', {
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
        localStorage.clear();
        window.location.href = '/';
    })
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
});
const cargarDatosUsuario = () => {
   const titulo = document.getElementById('titulo');
   const user = localStorage.getItem('usuario');
   const token = localStorage.getItem('token');
   const pass = localStorage.getItem('pass');
   
   titulo.innerHTML = 'Usuario:' + user + '<br>Contrasenia: ' + pass + '<br>Token: ' + token;
}
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
    // se llama a la función controllerVentas para cargar la tabla de ventas
    verificarToken();
    cargarTabla();
    cargarDatosUsuario();
    // se obtiene el boton agregar
    const btnAgregar = document.getElementById('btnAgregar');
    btnAgregar.addEventListener('click', (event) => {
        // se llama a la función cargarModalAgregar para cargar el modal de agregar venta
        cargarModalAgregar();
    });
    const btnCerrarSesion = document.getElementById('btnCerrarSesion');
    btnCerrarSesion.addEventListener('click', (e) =>{
        console.log('click en cerrarSesion?')
        cerrarSesion();
    });
    console.log('El DOM ha sido cargado');
});
