package org.utl.dsm.lelegantchatnoir.model;

import java.time.LocalDate;
import java.time.Period;
import java.time.format.DateTimeFormatter;

public class Producto {
    private int idProducto;
    private String codigoProducto;
    private String nombre;
    private String descripcion;
    private String fechaIngreso;
    private int duracion;
    private String fechaCaducidad;
    private double precioCompra;
    private double precioVenta;
    private int stock;
    private boolean estatus;

    // Constructores
    public Producto() {}

    public Producto(int idProducto, String codigoProducto, String nombre, String descripcion, String fechaIngreso, int duracion, String fechaCaducidad, double precioCompra, double precioVenta, int stock, boolean estatus) {
        this.idProducto = idProducto;
        this.codigoProducto = codigoProducto;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.fechaIngreso = fechaIngreso;
        this.duracion = duracion;
        this.fechaCaducidad = fechaCaducidad;
        this.precioCompra = precioCompra;
        this.precioVenta = precioVenta;
        this.stock = stock;
        this.estatus = estatus;
    }
    
    public String generarCodigoProducto(String nombre, String fecha){
        return "GNP-" + nombre.substring(0, 3).toUpperCase() + fecha.substring(2, 4) + fecha.substring(5, 7) + fecha.substring(8, 10);
    }

    public LocalDate generarFechaVida(String fecha, int tiempoInventario){
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate fechaLocalDate = LocalDate.parse(fecha, formatter);
        return fechaLocalDate.plus(Period.ofMonths(tiempoInventario));
    }

    // Getters y setters
    public int getIdProducto() {
        return idProducto;
    }

    public void setIdProducto(int idProducto) {
        this.idProducto = idProducto;
    }

    public String getCodigoProducto() {
        return codigoProducto;
    }

    public void setCodigoProducto(String codigoProducto) {
        this.codigoProducto = codigoProducto;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getFechaIngreso() {
        return fechaIngreso;
    }

    public void setFechaIngreso(String fechaIngreso) {
        this.fechaIngreso = fechaIngreso;
    }

    public int getDuracion() {
        return duracion;
    }

    public void setDuracion(int duracion) {
        this.duracion = duracion;
    }

    public String getFechaCaducidad() {
        return fechaCaducidad;
    }

    public void setFechaCaducidad(String fechaCaducidad) {
        this.fechaCaducidad = fechaCaducidad;
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

    public int getStock() {
        return stock;
    }

    public void setStock(int stock) {
        this.stock = stock;
    }

    public boolean isEstatus() {
        return estatus;
    }
    
     public boolean getEstatus() {
        return estatus;
    }

    public void setEstatus(boolean estatus) {
        this.estatus = estatus;
    }
}
