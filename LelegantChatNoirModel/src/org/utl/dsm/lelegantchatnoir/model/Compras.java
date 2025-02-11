package org.utl.dsm.lelegantchatnoir.model;

public class Compras {
    private int idCompra;
    private String codigoCompra;
    private double subtotal;
    private double iva;
    private double totalCompra;
    private String fechaCompra;
    private boolean estatus;

    // Constructores
    public Compras() {}

    public Compras(int idCompra, String codigoCompra, double subtotal, double iva, double totalCompra, String fechaCompra, boolean estatus) {
        this.idCompra = idCompra;
        this.codigoCompra = codigoCompra;
        this.subtotal = subtotal;
        this.iva = iva;
        this.totalCompra = totalCompra;
        this.fechaCompra = fechaCompra;
        this.estatus = estatus;
    }
    
    public String generarCodigoCompra( String fecha){
        return "GNC-" + fecha.substring(2, 4) + fecha.substring(5, 7) + fecha.substring(8, 10);
    }

    // Getters y setters
    public int getIdCompra() {
        return idCompra;
    }

    public void setIdCompra(int idCompra) {
        this.idCompra = idCompra;
    }

    public String getCodigoCompra() {
        return codigoCompra;
    }

    public void setCodigoCompra(String codigoCompra) {
        this.codigoCompra = codigoCompra;
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

    public double getTotalCompra() {
        return totalCompra;
    }

    public void setTotalCompra(double totalCompra) {
        this.totalCompra = totalCompra;
    }

    public String getFechaCompra() {
        return fechaCompra;
    }

    public void setFechaCompra(String fechaCompra) {
        this.fechaCompra = fechaCompra;
    }

    public boolean isEstatus() {
        return estatus;
    }

    public void setEstatus(boolean estatus) {
        this.estatus = estatus;
    }
}
