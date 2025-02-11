// console.log("Este es el js de ventas");
const miCarrito =
    [{codigoProducto:"PRODUCTO0003"},
        {codigoProducto:"PROD001"}];
sessionStorage.setItem("carritoVenta", JSON.stringify(miCarrito));


const agregarProductoCompra = (producto) => {
    function crearCompra(){

        txtcodigoProducto = document.getElementById('txtCodigoProducto').value;
        txtcantidad = document.getElementById('txtCantidad').value;
        txtprecio = document.getElementById('txtPrecio').value;

        let Compra = {
            codigoProducto: txtcodigoProducto,
            cantidad: txtcantidad,
            precio: txtprecio
        };

        let queryString = {
            datosCompra: JSON.stringify(Compra)
        };

        const apiURL = 'http://localhost:8080/DemoLelegantREST/api/guardar/compra';

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
    }
    document.getElementById("btnGuardar").addEventListener("click", function (event){
        event.preventDefault();
        crearCompra();
    });
}

const cargarModalVenta = () => {
    const btnAgregar = document.getElementById('btnAgregar');
    const btnCerrarModal = document.getElementById('btnCerrarModal')
    btnAgregar.addEventListener('click', (event) => {
        const carritoVenta = JSON.parse(sessionStorage.getItem('carritoVenta'));
        const tituloModal = document.getElementById('exampleModalLabel');
        const contenidoModal = document.getElementById('contenido-modal');

        tituloModal.innerHTML = "Agregar Venta";
        contenidoModal.innerHTML = "";
        let productosModal = '';

        if (carritoVenta != null && carritoVenta.length > 0) {
            // console.log(carritoVenta);
            carritoVenta.forEach(producto => {
                productosModal += `
                        <div class="mb-2">
                            <label class="form-label">${producto.codigoProducto}</label>
                            <input type="number" class="form-control" placeholder="Cantidad" data-codigo="${producto.codigoProducto}" min="1" value="1">
                        </div>
                    `;
            });
            productosModal += `
                    <div class="text-center">
                        <button type="button" class="btn btn-success" id="btnGuardarVenta">Guardar Venta</button>
                    </div>
                `;
        } else {
            productosModal = '<p>No hay productos en el carrito.</p>';
        }
        contenidoModal.innerHTML = productosModal;

        const btnGuardarVenta = document.getElementById('btnGuardarVenta');
        btnGuardarVenta.addEventListener('click', (event) => {

        })
    });
    btnCerrarModal.addEventListener('click', (event) => {
        const tituloModal = document.getElementById('exampleModalLabel');
        const contenidoModal = document.getElementById('contenido-modal');

        tituloModal.innerHTML = "";
        contenidoModal.innerHTML = "";
    })

}