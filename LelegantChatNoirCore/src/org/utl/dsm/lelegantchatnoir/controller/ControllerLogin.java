package org.utl.dsm.lelegantchatnoir.controller;

import java.sql.Connection;
import java.sql.CallableStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
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
}
