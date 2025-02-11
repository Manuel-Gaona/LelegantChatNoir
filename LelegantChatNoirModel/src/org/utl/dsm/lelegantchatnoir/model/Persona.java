package org.utl.dsm.lelegantchatnoir.model;

import java.time.LocalDate;
import java.time.Period;
import java.time.format.DateTimeFormatter;

public class Persona {
    private int idPersona;
    private String nombre;
    private String apellidoP;
    private String apellidoM;
    private String genero;
    private String fechaNac;
    private String curp;
    private String estado;
    private int edad;
    private boolean estatusPersona;

    // Constructores
    public Persona() {}

    public Persona(int idPersona, String nombre, String apellidoP, String apellidoM, String genero, String fechaNac, String curp, String estado, int edad, boolean estatusPersona) {
        this.idPersona = idPersona;
        this.nombre = nombre;
        this.apellidoP = apellidoP;
        this.apellidoM = apellidoM;
        this.genero = genero;
        this.fechaNac = fechaNac;
        this.curp = curp;
        this.estado = estado;
        this.edad = edad;
        this.estatusPersona = estatusPersona;
    }
    
    public String getNombreCompleto(){
        return nombre + " " + apellidoP + " " + apellidoM;
    }

    public int calcularAnios(String fecha) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate fechaLocalDate = LocalDate.parse(fecha, formatter);
        LocalDate fechaActual = LocalDate.now();
        return Period.between(fechaLocalDate, fechaActual).getYears();
    }
    
    public String generarCurp(String nombres, String apellidoP, String apellidoM, String genero, String fechaNac, String ciudad) {
        String curp = (apellidoP.substring(0, 2) +
                apellidoM.charAt(0) +
                nombres.charAt(0) +
                fechaNac.substring(2, 4) +
                fechaNac.substring(5, 7) +
                fechaNac.substring(8, 10) +
                genero.charAt(0)).toUpperCase();
        curp += obtenerAbreviaturaEstado(ciudad);
        curp += primeraConsonante(apellidoP.substring(1).toUpperCase());
        curp += primeraConsonante(apellidoM.substring(1).toUpperCase());
        curp += primeraConsonante(nombres.substring(1).toUpperCase());
        curp += "XX";
        return curp;
    }
    private boolean esVocal(char c) {
        return "AEIOU".indexOf(c) != -1;
    }
    private String primeraConsonante(String palabra) {
        for (int i = 0; i < palabra.length(); i++) {
            char c = palabra.charAt(i);
            if (!esVocal(c) && Character.isLetter(c)) {
                return String.valueOf(c);
            }
        }
        return "X";
    }
    public static String obtenerAbreviaturaEstado(String estado) {
        String[] estados = {
                "AGUASCALIENTES", "BAJA CALIFORNIA", "BAJA CALIFORNIA SUR", "CAMPECHE", "COAHUILA",
                "COLIMA", "CHIAPAS", "CHIHUAHUA", "DISTRITO FEDERAL", "DURANGO",
                "GUANAJUATO", "GUERRERO", "HIDALGO", "JALISCO", "MEXICO",
                "MICHOACAN", "MORELOS", "NAYARIT", "NUEVO LEON", "OAXACA",
                "PUEBLA", "QUERETARO", "QUINTANA ROO", "SAN LUIS POTOSI", "SINALOA",
                "SONORA", "TABASCO", "TAMAULIPAS", "TLAXCALA", "VERACRUZ",
                "YUCATAN", "ZACATECAS", "NACIDO EN EL EXTRANJERO"
        };

        String[] abreviaturas = {
                "AS", "BC", "BS", "CC", "CL",
                "CM", "CS", "CH", "DF", "DG",
                "GT", "GR", "HG", "JC", "MC",
                "MN", "MS", "NT", "NL", "OC",
                "PL", "QT", "QR", "SP", "SL",
                "SR", "TC", "TS", "TL", "VZ",
                "YN", "ZS", "NE"
        };

        for (int i = 0; i < estados.length; i++) {
            if (estados[i].equalsIgnoreCase(estado)) {
                return abreviaturas[i];
            }
        }

        return "EN";
    }

    // Getters y setters
    public int getIdPersona() {
        return idPersona;
    }

    public void setIdPersona(int idPersona) {
        this.idPersona = idPersona;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellidoP() {
        return apellidoP;
    }

    public void setApellidoP(String apellidoP) {
        this.apellidoP = apellidoP;
    }

    public String getApellidoM() {
        return apellidoM;
    }

    public void setApellidoM(String apellidoM) {
        this.apellidoM = apellidoM;
    }

    public String getGenero() {
        return genero;
    }

    public void setGenero(String genero) {
        this.genero = genero;
    }

    public String getFechaNac() {
        return fechaNac;
    }

    public void setFechaNac(String fechaNac) {
        this.fechaNac = fechaNac;
    }

    public String getCurp() {
        return curp;
    }

    public void setCurp(String curp) {
        this.curp = curp;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public int getEdad() {
        return edad;
    }

    public void setEdad(int edad) {
        this.edad = edad;
    }

    public boolean getEstatusPersona() {
        return estatusPersona;
    }

    public void setEstatusPersona(boolean estatusPersona) {
        this.estatusPersona = estatusPersona;
    }
}
