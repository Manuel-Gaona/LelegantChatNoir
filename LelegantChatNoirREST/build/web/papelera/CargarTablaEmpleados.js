const cargarTablaEmpleados = () => {
    const apiURL = 'http://localhost:8080/api/empleados/getAll';

    fetch(apiURL, {
        method: 'GET'
    })
    .then(res => {
        if (!res.ok) {
            throw new Error('Error en la respuesta del servidor: ' + res.status);
        }
        return res.json();
    })
    .then(data => {
        console.log('Datos recibidos:', data); // Depuración para ver los datos recibidos

        // Verifica si `data` es un array, si no, ajusta para obtener el array
        const empleados = Array.isArray(data) ? data : data.empleados;

        if (Array.isArray(empleados)) {
            const tabla = document.getElementById('tablaEmpleados');
            let filas = '';
            empleados.forEach(empleado => {
                filas += `
                    <tr>
                        <td class="text-truncate">${empleado.idEmpleado}</td>
                        <td class="text-truncate">${empleado.codigoEmpleado}</td>
                        <td class="text-truncate">${empleado.email}</td>
                        <td class="text-truncate">${empleado.fechaIngreso}</td>
                        <td class="text-truncate">${empleado.antiguedad}</td>
                        <td class="text-truncate text-center align-middle">
                            <div class="alert ${empleado.estatusEmpleado ? "alert-success" : "alert-danger"} p-2">
                                ${empleado.estatusEmpleado ? "Activo" : "Inactivo"}
                            </div>
                        </td>
                        <td class="text-truncate">${empleado.idUsuario}</td>
                        <td class="text-truncate text-center">
                            <div class="btn-group">
                                <button class="btn btn-outline-warning btn-sm btn-editar" data-idEmpleado="${empleado.idEmpleado}" data-bs-toggle="modal" data-bs-target="#AgregarEmpleado">
                                    <i class="bi bi-pencil-square"></i>
                                </button>
                                <button class="btn btn-outline-danger btn-sm btn-eliminar" data-idEmpleado="${empleado.idEmpleado}">
                                    <i class="bi bi-trash"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                `;
            });

            tabla.innerHTML = `
                <thead>
                    <tr>
                        <th class="text-truncate">ID Empleado</th>
                        <th class="text-truncate">Código</th>
                        <th class="text-truncate">Email</th>
                        <th class="text-truncate">Fecha de Ingreso</th>
                        <th class="text-truncate">Antigüedad</th>
                        <th class="text-truncate">Estatus</th>
                        <th class="text-truncate">ID Usuario</th>
                        <th class="text-truncate">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    ${filas}
                </tbody>
            `;
        } else {
            console.error('Los datos recibidos no son un array:', data);
        }
    })
    .catch(error => {
        console.error('Error al cargar los empleados:', error);
        Swal.fire('Error', 'No se pudo cargar la tabla de empleados. Intenta nuevamente.', 'error');
    });
}

// Llama a la función para cargar la tabla al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    cargarTablaEmpleados();
});