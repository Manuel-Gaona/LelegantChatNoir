package org.utl.dsm.lelegantchatnoir.model;

/**
 *
 * @author mgaon
 */
public class Producto_Ventas {
    private int idProducto_Ventas;
    private String codigoVenta;
    private String codigoProducto;
    private int cantidad;
    private double precio;
    private double total;
    private boolean estatus;

    // Constructores
    public Producto_Ventas() {}

    public Producto_Ventas(int idProducto_Ventas, String codigoVenta, String codigoProducto, int cantidad, double precio, double total, boolean estatus) {
        this.idProducto_Ventas = idProducto_Ventas;
        this.codigoVenta = codigoVenta;
        this.codigoProducto = codigoProducto;
        this.cantidad = cantidad;
        this.precio = precio;
        this.total = total;
        this.estatus = estatus;
    }

    // Getters y setters
    public int getIdProducto_Ventas() {
        return idProducto_Ventas;
    }

    public void setIdProducto_Ventas(int idProducto_Ventas) {
        this.idProducto_Ventas = idProducto_Ventas;
    }

    public String getCodigoVenta() {
        return codigoVenta;
    }

    public void setCodigoVenta(String codigoVenta) {
        this.codigoVenta = codigoVenta;
    }

    public String getCodigoProducto() {
        return codigoProducto;
    }

    public void setCodigoProducto(String codigoProducto) {
        this.codigoProducto = codigoProducto;
    }

    public int getCantidad() {
        return cantidad;
    }

    public void setCantidad(int cantidad) {
        this.cantidad = cantidad;
    }

    public double getPrecio() {
        return precio;
    }

    public void setPrecio(double precio) {
        this.precio = precio;
    }

    public double getTotal() {
        return total;
    }

    public void setTotal(double total) {
        this.total = total;
    }

    public boolean isEstatus() {
        return estatus;
    }

    public void setEstatus(boolean estatus) {
        this.estatus = estatus;
    }
}

