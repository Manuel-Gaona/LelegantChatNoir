document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const usuario = document.getElementById('usuario').value;
    const contrasenia = document.getElementById('contrasenia').value;
    // cambiar nombre por dataUsuario para no confundirse con la variable data que devuelve el fetch
    const dataUsuario = {
        usuario: usuario,
        contrasenia: contrasenia
    };
    // convertir los datos a un formato valido para el servicio
    let queryString = {
        jsonDatos: JSON.stringify(dataUsuario)
    }
    // imprimir los datos
    console.log(queryString);
    // peticion al servicio
    fetch('http://localhost:8080/api/login', {
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
                if (data.status) {
                    window.location.href = 'modulos/usuario';
                } else {
                    Swal.fire({
                        title: "Error!",
                        text: "datos incorrectos",
                        icon: "danger"
                    });
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error interno del servidor, Intente de nuevo');
            });
});