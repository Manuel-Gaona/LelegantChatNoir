package org.utl.dsm.lelegantchatnoir.model;

/**
 *
 * @author mgaon
 */
public class Ventas {
    private int idVenta;
    private String codigoVenta;
    private double subtotal;
    private double iva;
    private double totalVenta;
    private String fechaVenta;
    private boolean estatus;

    // Constructores
    public Ventas() {}

    public Ventas(int idVenta, String codigoVenta, double subtotal, double iva, double totalVenta, String fechaVenta, boolean estatus) {
        this.idVenta = idVenta;
        this.codigoVenta = codigoVenta;
        this.subtotal = subtotal;
        this.iva = iva;
        this.totalVenta = totalVenta;
        this.fechaVenta = fechaVenta;
        this.estatus = estatus;
    }
    
    public String generarCodigoVenta( String fecha){
        return "GNV-" + fecha.substring(2, 4) + fecha.substring(5, 7) + fecha.substring(8, 10);
    }

    // Getters y setters
    public int getIdVenta() {
        return idVenta;
    }

    public void setIdVenta(int idVenta) {
        this.idVenta = idVenta;
    }

    public String getCodigoVenta() {
        return codigoVenta;
    }

    public void setCodigoVenta(String codigoVenta) {
        this.codigoVenta = codigoVenta;
    }

    public double getSubtotal() {
        return subtotal;
    }

    public void setSubtotal(double subtotal) {
        this.subtotal = subtotal;
    }

    public double getIva() {
        return iva;
    }

    public void setIva(double iva) {
        this.iva = iva;
    }

    public double getTotalVenta() {
        return totalVenta;
    }

    public void setTotalVenta(double totalVenta) {
        this.totalVenta = totalVenta;
    }

    public String getFechaVenta() {
        return fechaVenta;
    }

    public void setFechaVenta(String fechaVenta) {
        this.fechaVenta = fechaVenta;
    }

    public boolean isEstatus() {
        return estatus;
    }

    public void setEstatus(boolean estatus) {
        this.estatus = estatus;
    }
}
