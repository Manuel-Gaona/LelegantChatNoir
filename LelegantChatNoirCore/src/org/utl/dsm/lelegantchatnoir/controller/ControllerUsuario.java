package org.utl.dsm.lelegantchatnoir.controller;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Types;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import org.apache.commons.codec.digest.DigestUtils;
import org.utl.dsm.lelegantchatnoir.db.conexionDB;
import org.utl.dsm.lelegantchatnoir.model.Usuario;

/**
 *
 * @author mgaon
 */
public class ControllerUsuario {
    public int insert(Usuario u) throws Exception {
        String sql = "{call InsertarUsuario(?, ?, ?, ?)}";

        int idUsuarioGenerado = -1;

        conexionDB connMySQL = new conexionDB();
        Connection conn = connMySQL.open();
        CallableStatement cstmt = conn.prepareCall(sql);

        // Configurar parámetros del procedimiento almacenado
        cstmt.setString(1, u.getUsuario());
        cstmt.setString(2, u.getContrasenia());
        cstmt.setString(3, u.getRol());
        // Registrar parámetro de salida
        cstmt.registerOutParameter(4, Types.INTEGER);

        // Ejecutar el procedimiento almacenado
        cstmt.executeUpdate();

        // Obtener el nuevo código de empleado
        idUsuarioGenerado = cstmt.getInt(4);

        // Actualizar el código de empleado en el objeto Empleado
        u.setIdUsuario(idUsuarioGenerado);
        if(idUsuarioGenerado > 0){
            u.setEstatusUsuario(true);
        }

        cstmt.close();
        connMySQL.close();

        return idUsuarioGenerado;
    }
    public void eliminarLogicamente(Usuario u) throws Exception {
        String sql = "{call eliminarUsuario(?)}"; // 1 parámetro de entrada

        conexionDB connMySQL = new conexionDB();
        Connection conn = connMySQL.open();
        CallableStatement cstmt = conn.prepareCall(sql);

        cstmt.setInt(1, u.getIdUsuario());
        cstmt.executeUpdate();
        cstmt.close();
        connMySQL.close();
    }
     public List<Usuario> getAll (String filtro) throws Exception{
        String sql = "SELECT * FROM usuario ORDER BY idUsuario DESC";
        conexionDB connMySQL = new conexionDB();
        Connection conn = connMySQL.open();
        PreparedStatement pstmt = conn.prepareStatement(sql);
        ResultSet rs = pstmt.executeQuery();
        List<Usuario> usuario = new ArrayList<>();
        while(rs.next()){
            usuario.add(fill(rs));
        }
        rs.close();
        pstmt.close();
        connMySQL.close();
        return usuario;
    }
    
    public List<Usuario> getByCode (String filtro) throws Exception{
        String sql = "SELECT * FROM empleado where codigoEmpleado = ?";
        conexionDB connMySQL = new conexionDB();
        Connection conn = connMySQL.open();
        PreparedStatement pstmt = conn.prepareStatement(sql);
        pstmt.setString(1, filtro);
        ResultSet rs = pstmt.executeQuery();
        List<Usuario> empleado = new ArrayList<>();
        while(rs.next()){
            empleado.add(fill(rs));
        }
        rs.close();
        pstmt.close();
        connMySQL.close();
        return empleado;
    }
    
    private Usuario fill(ResultSet rs) throws Exception{
        Usuario u = new Usuario();
        
        u.setIdUsuario(rs.getInt("idUsuario"));
        u.setUsuario(rs.getString("usuario"));
        u.setContrasenia(rs.getString("contrasenia"));
        u.setRol(rs.getString("rol"));
        u.setEstatusUsuario(rs.getBoolean("estatus"));
        
        return u;
    }
    public String login(Usuario u) throws Exception {
        String sql = "SELECT * FROM usuario WHERE usuario = ? AND contrasenia = ?";
        conexionDB connMySQL = new conexionDB();
        Connection conn = connMySQL.open();
        //String contra = DigestUtils.md5Hex(usuario.getContrasenia());
            //usuario.setContrasenia(contra);
        PreparedStatement pstmt = conn.prepareStatement(sql);
        pstmt.setString(1, u.getUsuario());
        pstmt.setString(2, u.getContrasenia());
        ResultSet rs = pstmt.executeQuery();
        String id = null;
        String name = null;
        String rol = null;
        String tokenizer = null;
        String tok = null;

        if (rs.next()) {
            id = rs.getString("idUsuario");
            name = rs.getString("usuario");
            rol = rs.getString("rol");
            tok = rs.getString("token");
            // Generar nuevo token
            Date myDate = new Date();
            String fecha = new SimpleDateFormat("yyyy.MM.dd.HH:mm:ss").format(myDate); // Corrección de formato
            String token = "gatonegro." + id + "." + name + "." + rol + "." + fecha;
            tokenizer = DigestUtils.md5Hex(token);
            
            String updateSql;
            PreparedStatement updateStmt;

            if (tok == null || "null".equals(tok)) { // Corregido para verificar si es nulo o "null"
                updateSql = "UPDATE usuario SET token = ? WHERE idUsuario = ?";
                updateStmt = conn.prepareStatement(updateSql);
                updateStmt.setString(1, tokenizer); // Establece solo el token
                updateStmt.setString(2, id); // Establece el idUsuario
            } else {
                updateSql = "UPDATE usuario SET lastToken = ?, token = ? WHERE idUsuario = ?";
                updateStmt = conn.prepareStatement(updateSql);
                updateStmt.setString(1, tok); // Establece lastToken con el valor anterior
                updateStmt.setString(2, tokenizer); // Establece el nuevo token
                updateStmt.setString(3, id); // Establece el idUsuario
            }

updateStmt.executeUpdate();
        }
        return tokenizer;
    }
    public boolean checkToken(Usuario u) throws Exception {
        String sql = "SELECT idUsuario FROM usuario WHERE usuario = ? AND token = ?";
        conexionDB connMySQL = new conexionDB();
        Connection conn = connMySQL.open();
        //String contra = DigestUtils.md5Hex(usuario.getContrasenia());
            //usuario.setContrasenia(contra);
        PreparedStatement pstmt = conn.prepareStatement(sql);
        pstmt.setString(1, u.getUsuario());
        pstmt.setString(2, u.getToken());
        ResultSet rs = pstmt.executeQuery();
        
        boolean isValid = false;
        if (rs.next()) {
            isValid = true;
        } 
        rs.close();
        pstmt.close();
        connMySQL.close();
        return isValid;
    }
    public String logout(Usuario u) throws Exception {
        String sql = "SELECT * FROM usuario WHERE usuario = ?";
        conexionDB connMySQL = new conexionDB();
        Connection conn = connMySQL.open();
        PreparedStatement pstmt = conn.prepareStatement(sql);
        pstmt.setString(1, u.getUsuario());
        ResultSet rs = pstmt.executeQuery();
        String id = null;
        String token = null;
        String lastToken = null;
        if (rs.next()) {
            id = rs.getString("idUsuario");
            token = rs.getString("token");
            // Solo actualizar si el token no es nulo
            if (token != null && !token.equals("null")) {
                lastToken = token;
                String updateSql = "UPDATE usuario SET lastToken = ?, token = 'null' WHERE idUsuario = ?";
                PreparedStatement updateStmt = conn.prepareStatement(updateSql);
                updateStmt.setString(1, lastToken); // Mover el token actual a lastToken
                updateStmt.setString(2, id);
                updateStmt.executeUpdate();
            }
        }
        return lastToken;
    }
    public String chekUsers (Usuario u) throws Exception{
        String sql = "SELECT * FROM usuario WHERE usuario = ?";
        conexionDB connMySQL = new conexionDB();
        Connection conn = connMySQL.open();
        PreparedStatement pstmt = conn.prepareStatement(sql);
        pstmt.setString(1, u.getUsuario());
        ResultSet rs = pstmt.executeQuery();
        String id = null;
        String name = null;
        String rol = null;
        String tok = null;
        String tokenizer = null;
        
        while  (rs.next()){
            id = rs.getString("id");
            name = rs.getString("nombreUsuario");
            rol = rs.getString("rol");
            tok = rs.getString("token");
            System.out.println(tok);
            if ("null".equals(tok)){
                tokenizer = tok;
                System.out.println(tokenizer + " Oh dear");
            } else{
                Date myDate = new Date();
                String fecha = new SimpleDateFormat("yyyy.MM.dd.HH:mm:ss").toString();
                String token = "gatonegro." + id + "." + name + "." + rol + "." + myDate + "." + fecha;
                System.out.println(token);
                tokenizer = DigestUtils.md5Hex(token);
                
                String updateSql = "UPDATE usuario SET lastToken = ?, token = 'null' WHERE id = ?";
                PreparedStatement updateStmt = conn.prepareStatement(updateSql);
                updateStmt.setString(1, tokenizer); // Establecer el nuevo token
                updateStmt.setString(2, id);        // Usar el ID del usuario para actualizar
                updateStmt.executeUpdate();
            }   
            return tokenizer;
        }
        return name;
     }
}
