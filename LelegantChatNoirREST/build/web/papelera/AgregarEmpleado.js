const apiURL = 'http://localhost:8080/api/empleado/guardar';

const agregarEmpleado = () => {
    function crearEmpleado() {
        const formData = {
            p_nombre: document.getElementById('txtNombre').value,
            p_apellidoP: document.getElementById('txtApellidoP').value,
            p_apellidoM: document.getElementById('txtApellidoM').value,
            p_genero: document.getElementById('txtGenero').value,
            p_fechaNac: document.getElementById('txtFechaNac').value,
            p_curp: document.getElementById('txtCurp').value,
            p_estado: document.getElementById('txtEstado').value,
            p_edad: document.getElementById('txtEdad').value,
            u_usuario: document.getElementById('txtUsuario').value,
            u_contrasenia: document.getElementById('txtContrasenia').value,
            u_rol: document.getElementById('txtRol').value,
            e_codigoEmpleado: document.getElementById('txtCodigoEmpleado').value,
            e_email: document.getElementById('txtEmail').value,
            e_fechaIngreso: document.getElementById('txtFechaIngreso').value,
            e_antiguedad: document.getElementById('txtAntiguedad').value
        };

        fetch(apiURL, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if (data.error) {
                console.error('Error:', data.error);
                Swal.fire('Error', data.error, 'error');
            } else {
                Swal.fire('Éxito', 'Empleado guardado correctamente.', 'success');
                cargarTablaEmpleados(); // Refresh table data
            }
        })
        .catch(error => {
            console.error('Error al guardar el empleado:', error);
            Swal.fire('Error', 'Error al guardar el empleado. Intenta nuevamente.', 'error');
        });
    }

    const btnGuardarEmpleado = document.getElementById("btnGuardarEmpleado");
    if (btnGuardarEmpleado) {
        btnGuardarEmpleado.addEventListener("click", function (event) {
            event.preventDefault();
            crearEmpleado();
        });
    } else {
        console.error('No se encontró el botón con ID "btnGuardarEmpleado"');
    }
};

document.addEventListener("DOMContentLoaded", function () {
    agregarEmpleado();
});