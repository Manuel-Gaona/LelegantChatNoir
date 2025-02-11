package org.utl.dsm.lelegantchatnoir.model;

import java.time.LocalDate;
import java.time.Period;
import java.time.format.DateTimeFormatter;

public class Empleado extends Persona {
    

    // variables
    private int idEmpleado;
    private String codigoEmpleado;
    private String email;
    private String fechaIngreso;
    private String antiguedad;
    private boolean estatusEmpleado;
    private Usuario usuario;

    //Constructores
    public Empleado() {}

    public Empleado(int idEmpleado, String codigoEmpleado, String email, String fechaIngreso, String antiguedad, boolean estatusEmpleado, Usuario usuario) {
        this.idEmpleado = idEmpleado;
        this.codigoEmpleado = codigoEmpleado;
        this.email = email;
        this.fechaIngreso = fechaIngreso;
        this.antiguedad = antiguedad;
        this.estatusEmpleado = estatusEmpleado;
        this.usuario = usuario;
    }

    // Metodos
    public String generarCodigoEmpleado(String nombre, String apellidoP, String fechaIngreso, String genero, String estado) {
        if (fechaIngreso.length() == 10) {
            return ("GN-" +
                    apellidoP.substring(0,2) +
                    nombre.charAt(0) +
                    fechaIngreso.substring(2, 4) +
                    fechaIngreso.substring(5, 7) +
                    fechaIngreso.substring(8, 10) +
                    genero.charAt(0) +
                    estado.substring(0,3) 
            ).toUpperCase();
        }else{
            return ("GN-" + apellidoP.substring(0,2) +
                    nombre.charAt(0));
        }
    }

    public String generarEmail(String nombre, String apellidoP, String fechaIngreso) {
        if (fechaIngreso.length() == 10) {
            return ("gn" +
                    apellidoP.substring(0,2) +
                    nombre.charAt(0) +
                    fechaIngreso.substring(2, 4) +
                    fechaIngreso.substring(5, 7) +
                    fechaIngreso.substring(8, 10) +
                    "@lelegant.com"
            ).toLowerCase();
        }
        return "gn" +  apellidoP.substring(0,2) +
                    nombre.charAt(0) + "@lelegant.com";
    }

    public String generarUsuario(String nombre, String apellidoP, String fechaIngreso, int contador) {
        if (fechaIngreso.length() == 10) {
            return ("GN-" +
                    apellidoP.substring(0,2) +
                    nombre.charAt(0) +
                    fechaIngreso.substring(2, 4) +
                    fechaIngreso.substring(5, 7) +
                    fechaIngreso.substring(8, 10) +
                    String.format("%02d", contador)
            ).toUpperCase();
        }
        return String.format("%08d", contador);
    }
    
    public String calcularTiempoTranscurrido(String fecha) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate fechaLocalDate = LocalDate.parse(fecha, formatter);
        LocalDate fechaActual = LocalDate.now();
        Period periodo = Period.between(fechaLocalDate, fechaActual);

        int anios = periodo.getYears();
        int meses = periodo.getMonths();
        int dias = periodo.getDays();

        if (anios > 0) {
            return anios + (anios == 1 ? " año" : " años");
        } else if (meses > 0) {
            return meses + (meses == 1 ? " mes" : " meses");
        } else {
            return dias + (dias == 1 ? " día" : " días");
        }
    }


    //getter and setter
    public int getIdEmpleado() {
        return idEmpleado;
    }

    public void setIdEmpleado(int idEmpleado) {
        this.idEmpleado = idEmpleado;
    }

    public String getCodigoEmpleado() {
        return codigoEmpleado;
    }

    public void setCodigoEmpleado(String codigoEmpleado) {
        this.codigoEmpleado = codigoEmpleado;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFechaIngreso() {
        return fechaIngreso;
    }

    public void setFechaIngreso(String fechaIngreso) {
        this.fechaIngreso = fechaIngreso;
    }

    public String getAntiguedad() {
        return antiguedad;
    }

    public void setAntiguedad(String antiguedad) {
        this.antiguedad = antiguedad;
    }

    public boolean isEstatusEmpleado() {
        return estatusEmpleado;
    }

    public void setEstatusEmpleado(boolean estatusEmpleado) {
        this.estatusEmpleado = estatusEmpleado;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }
    
}
