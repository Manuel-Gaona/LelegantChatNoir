package org.utl.dsm.lelegantchatnoir.model;

/**
 *
 * @author mgaon
 */
public class Inmueble {
    private int idInmueble;
    private String nombrePropietario;
    private double medidaFrente;
    private double medidaFondo;
    private double superficie;
    private String telefono;
    private String calle;
    private String numeroExt;
    private String numeroInt;
    private String codigoPostal;
    private String colonia;
    
    public Inmueble(){}

    public Inmueble(int idInmueble, String nombrePropietario, double medidaFrente, double medidaFondo, double superficie, String telefono, String calle, String numeroExt, String numeroInt, String codigoPostal, String colonia) {
        this.idInmueble = idInmueble;
        this.nombrePropietario = nombrePropietario;
        this.medidaFrente = medidaFrente;
        this.medidaFondo = medidaFondo;
        this.superficie = superficie;
        this.telefono = telefono;
        this.calle = calle;
        this.numeroExt = numeroExt;
        this.numeroInt = numeroInt;
        this.codigoPostal = codigoPostal;
        this.colonia = colonia;
    }
    
    public double calcularSuperficie(double mfr, double mfo){
        return mfr *mfo;
    }

    public int getIdInmueble() {
        return idInmueble;
    }

    public void setIdInmueble(int idInmueble) {
        this.idInmueble = idInmueble;
    }

    public String getNombrePropietario() {
        return nombrePropietario;
    }

    public void setNombrePropietario(String nombrePropietario) {
        this.nombrePropietario = nombrePropietario;
    }

    public double getMedidaFrente() {
        return medidaFrente;
    }

    public void setMedidaFrente(double medidaFrente) {
        this.medidaFrente = medidaFrente;
    }

    public double getMedidaFondo() {
        return medidaFondo;
    }

    public void setMedidaFondo(double medidaFondo) {
        this.medidaFondo = medidaFondo;
    }

    public double getSuperficie() {
        return superficie;
    }

    public void setSuperficie(double superficie) {
        this.superficie = superficie;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getCalle() {
        return calle;
    }

    public void setCalle(String calle) {
        this.calle = calle;
    }

    public String getNumeroExt() {
        return numeroExt;
    }

    public void setNumeroExt(String numeroExt) {
        this.numeroExt = numeroExt;
    }

    public String getNumeroInt() {
        return numeroInt;
    }

    public void setNumeroInt(String numeroInt) {
        this.numeroInt = numeroInt;
    }

    public String getCodigoPostal() {
        return codigoPostal;
    }

    public void setCodigoPostal(String codigoPostal) {
        this.codigoPostal = codigoPostal;
    }

    public String getColonia() {
        return colonia;
    }

    public void setColonia(String colonia) {
        this.colonia = colonia;
    }
    
    

}
