const miCarrito =
    [
        {codigoProducto:"PROD0001"},
        {codigoProducto:"PROD0004"}
    ];

sessionStorage.setItem("carritoVenta", JSON.stringify(miCarrito));

const cargarModalAgregar = () => {
    const btnCerrarModal = document.getElementById('btnCerrarModal');
    const tituloModal = document.getElementById('exampleModalLabel');
    const contenidoModal = document.getElementById('contenido-modal');
    const carritoVenta = JSON.parse(sessionStorage.getItem('carritoVenta'));
    let productosModal = '';

    tituloModal.innerHTML = "Agregar Venta";
    contenidoModal.innerHTML = "";

    if (carritoVenta != null && carritoVenta.length > 0) {
        // console.log(carritoVenta);
        carritoVenta.forEach(producto => {
            productosModal += `
                        <div class="mb-2">
                            <!--<p class="text-center mb-0 mt-2">Nombre del producto</p>-->
                            <label class="form-label">${producto.codigoProducto}</label>
                            <input type="number" class="form-control" placeholder="Cantidad" data-codigoProductoAdd="${producto.codigoProducto}" min="1" value="1">
                        </div>
                    `;
        });
        productosModal += `
                    <div class="text-center mt-3">
                        <button type="button" class="btn btn-success" id="btnGuardarVenta">Guardar Venta</button>
                    </div>
                `;
    } else {
        productosModal = `
            <div class="alert alert-danger p-2 m-5 text-center">
                No hay productos en el carrito de ventas. Vaya a <a>productos</a> para agregar.
            </div>
        `;
    }
    contenidoModal.innerHTML = productosModal;

    const btnGuardarVenta = document.getElementById('btnGuardarVenta');
    btnGuardarVenta.addEventListener('click', (event) => {
        const apiURL = 'http://localhost:8080/api/ventas/guardar';
        let Venta = {};
        let queryString = {
            datosVenta: JSON.stringify(Venta)
        };
        fetch(apiURL, {
            method: 'POST',
            headers:{
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams(queryString)
        })
            .then(res => res.json())
            .then(data => {
                const inputs = document.querySelectorAll('input[data-codigoProductoAdd]');
                inputs.forEach(input => {
                    // console.log(input.getAttribute('data-codigoProductoAdd'));
                    let ProductoVenta = {
                        codigoVenta: data.codigoVenta,
                        codigoProducto: input.getAttribute('data-codigoProductoAdd'),
                        cantidad: input.value
                    };

                    let queryString = {
                        datosProductoVenta: JSON.stringify(ProductoVenta)
                    };

                    console.log(queryString);

                    const apiURL = 'http://localhost:8080/api/producto_ventas/guardar';

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

                        });
                });
            });
    })
};
btnCerrarModal.addEventListener('click', (event) => {
    const tituloModal = document.getElementById('exampleModalLabel');
    const contenidoModal = document.getElementById('contenido-modal');

    tituloModal.innerHTML = "";
    contenidoModal.innerHTML = "";
})

document.addEventListener('DOMContentLoaded', () =>{
    cargarModalAgregar();
});