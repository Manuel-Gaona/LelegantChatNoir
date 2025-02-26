package org.utl.dsm.lelegantchatnoir.model;

public class Usuario {
    
    private int idUsuario;
    private String usuario;
    private String contrasenia;
    private String rol;
    private boolean estatusUsuario;
    private String token;
    private String lastToken;

    public Usuario(){}

    public Usuario(int idUsuario, String usuario, String contrasenia, String rol, boolean estatusUsuario, String token, String lastToken) {
        this.idUsuario = idUsuario;
        this.usuario = usuario;
        this.contrasenia = contrasenia;
        this.rol = rol;
        this.estatusUsuario = estatusUsuario;
        this.token = token;
        this.lastToken = lastToken;
    }

    public int getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(int idUsuario) {
        this.idUsuario = idUsuario;
    }

    public String getUsuario() {
        return usuario;
    }

    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }

    public String getContrasenia() {
        return contrasenia;
    }

    public void setContrasenia(String contrasenia) {
        this.contrasenia = contrasenia;
    }

    public String getRol() {
        return rol;
    }

    public void setRol(String rol) {
        this.rol = rol;
    }

    public boolean isEstatusUsuario() {
        return estatusUsuario;
    }

    public void setEstatusUsuario(boolean estatusUsuario) {
        this.estatusUsuario = estatusUsuario;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getLastToken() {
        return lastToken;
    }

    public void setLastToken(String lastToken) {
        this.lastToken = lastToken;
    }

    
}
