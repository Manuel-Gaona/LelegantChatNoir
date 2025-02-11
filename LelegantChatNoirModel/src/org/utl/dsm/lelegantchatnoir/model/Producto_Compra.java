package org.utl.dsm.lelegantchatnoir.model;

/**
 *
 * @author mgaon
 */

public class Producto_Compra {
    private int idProducto_Compra;
    private String codigoCompra;
    private String codigoProducto;
    private int cantidad;
    private double precioCompra;
    private double precioVenta;
    private double total;
    private boolean estatus;

    // Constructores
    public Producto_Compra() {}

    public Producto_Compra(int idProducto_Compra, String codigoCompra, String codigoProducto, int cantidad, double precioCompra, double precioVenta, double total, boolean estatus) {
        this.idProducto_Compra = idProducto_Compra;
        this.codigoCompra = codigoCompra;
        this.codigoProducto = codigoProducto;
        this.cantidad = cantidad;
        this.precioCompra = precioCompra;
        this.precioVenta = precioVenta;
        this.total = total;
        this.estatus = estatus;
    }

    

    // Getters y setters
    public int getIdProducto_Compra() {
        return idProducto_Compra;
    }

    public void setIdProducto_Compra(int idProducto_Compra) {
        this.idProducto_Compra = idProducto_Compra;
    }

    public String getCodigoCompra() {
        return codigoCompra;
    }

    public void setCodigoCompra(String codigoCompra) {
        this.codigoCompra = codigoCompra;
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

    public double getPrecioCompra() {
        return precioCompra;
    }

    public void setPrecioCompra(double precioCompra) {
        this.precioCompra = precioCompra;
    }

    public double getPrecioVenta() {
        return precioVenta;
    }

    public void setPrecioVenta(double precioVenta) {
        this.precioVenta = precioVenta;
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

