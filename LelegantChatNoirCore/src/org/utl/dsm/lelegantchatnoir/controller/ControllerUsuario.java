package org.utl.dsm.lelegantchatnoir.controller;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Types;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
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
}
