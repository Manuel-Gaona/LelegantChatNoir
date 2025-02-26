document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();
    
    const user = document.getElementById('usuario').value;
    const contrasenia = document.getElementById('contrasenia').value;
    
    // cambiar nombre por dataUsuario para no confundirse con la variable data que devuelve el fetch
    let usuario = {
        usuario: user,
        contrasenia: contrasenia
    };
    let queryString = {
        datosUsuario: JSON.stringify(usuario)
    };
    console.log(new URLSearchParams(queryString));
    const url = 'http://localhost:8080/api/usuario/login';
    // peticion al servicio
    fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"           
        },
        body: new URLSearchParams(queryString)
    })
    .then(response => response.json())
    .then(data => {
        // se imprimo la respuesta del servicio
        console.log(data);
        if (data.token) {
            //sessionStorage.setItem('token', data.token);
            localStorage.setItem('token', data.token);            
            //sessionStorage.setItem('usuario', user);
            localStorage.setItem('usuario', user);
            localStorage.setItem('pass', data.contrasenia);
            window.location.href = 'modulos/usuario';
        } else {
            Swal.fire({
                title: "Error!",
                text: "datos incorrectos",
                icon: "danger"
            });
        }
    })
});