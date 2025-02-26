package org.utl.dsm.lelegantchatnoir.controller;

import java.sql.Connection;
import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.Date;
import org.apache.commons.codec.digest.DigestUtils;
import org.utl.dsm.lelegantchatnoir.db.conexionDB;
import org.utl.dsm.lelegantchatnoir.model.Usuario;

public class ControllerLogin {

    public Usuario login(Usuario U) throws Exception {
        String sql = "{ CALL BuscarUsuario(?, ?) }";
        conexionDB connMySQL = new conexionDB();
        Connection conn = connMySQL.open();
        CallableStatement cstmt = conn.prepareCall(sql);

        cstmt.setString(1, U.getUsuario());
        cstmt.setString(2, U.getContrasenia());

        ResultSet rs = cstmt.executeQuery();
        Usuario usuarioResult = null;

        if (rs.next()) {
            usuarioResult = new Usuario();
            usuarioResult.setUsuario(rs.getString("usuario"));
            usuarioResult.setContrasenia(rs.getString("contrasenia"));
            
        }

        rs.close();
        cstmt.close();
        connMySQL.close();

        return usuarioResult;
    }
    public String chekUsers (Usuario u) throws Exception{
         String sql = "select * from usuario where usuario = " + u.getUsuario();
        System.out.println(u.getIdUsuario());
         conexionDB connMySQL = new conexionDB();
        Connection conn = connMySQL.open();
        PreparedStatement pstmt = conn.prepareStatement(sql);
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
             
            //System.out.println(name);
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
                
                String sQL = "update usuario set lastToken = " + tokenizer;
                Connection coNN = connMySQL.open();
                PreparedStatement ps = coNN.prepareStatement(sQL);
                ps.executeUpdate();
            }   
            return tokenizer;
        }
        return null;
     }
}
