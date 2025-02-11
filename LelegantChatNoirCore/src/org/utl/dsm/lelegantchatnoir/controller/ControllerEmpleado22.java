package org.utl.dsm.lelegantchatnoir.controller;

/**
 *
 * @author mgaon
 */

import org.utl.dsm.lelegantchatnoir.db.conexionDB;
import org.utl.dsm.lelegantchatnoir.model.Empleado;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Types;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class ControllerEmpleado22 {
    
    public int insert(Empleado e) throws Exception{
        String sql = "{call InsertarPersonaUsuarioEmpleado(?, ?, ?, ?, ?, ?, ?, ?, "
                + "?, ?, ?, "
                + "?, ?, ?, ?,"
                + "?)}";
        
        e.setCurp(e.generarCurp(e.getNombre(), e.getApellidoP(), e.getApellidoM(), e.getGenero(), e.getFechaNac(), e.getEstado()));
        e.setEdad(e.calcularAnios(e.getFechaNac()));
        e.setFechaIngreso(LocalDate.now().toString());
        e.setAntiguedad(e.calcularTiempoTranscurrido(e.getFechaIngreso()));
        e.setCodigoEmpleado(e.generarCodigoEmpleado(e.getNombre(), e.getApellidoP(), e.getFechaIngreso(), e.getGenero(), e.getEstado()));
        e.setEmail(e.generarEmail(e.getNombre(), e.getApellidoP(), e.getFechaIngreso()));
        
        int idEmpleadoGenerado = -1;
        int idPersonaGenerada = -1;
        int idUsuarioGenerado = -1;
        String codigoEmpleadoID;
        
        conexionDB connMySQL = new conexionDB();
        Connection conn = connMySQL.open();
        CallableStatement cstmt = conn.prepareCall(sql);
        
        cstmt.setString(1, e.getNombre());
        cstmt.setString(2, e.getApellidoP());
        cstmt.setString(3, e.getApellidoM());
        cstmt.setString(4, e.getGenero());
        cstmt.setDate(5, java.sql.Date.valueOf(e.getFechaNac()));
        cstmt.setString(6, e.getCurp());
        cstmt.setString(7, e.getEstado());
        cstmt.setInt(8, e.getEdad());
        
        cstmt.setString(9, e.getCodigoEmpleado());
        cstmt.setString(10, e.getCodigoEmpleado());
        cstmt.setString(11, e.getUsuario().getRol());
        
        cstmt.setString(12, e.getCodigoEmpleado());
        cstmt.setString(13, e.getEmail());
        cstmt.setDate(14, java.sql.Date.valueOf(e.getFechaIngreso()));
        cstmt.setString(15, e.getAntiguedad());
        
        cstmt.registerOutParameter(16, Types.VARCHAR);
        
        cstmt.executeUpdate();
        
        codigoEmpleadoID = cstmt.getString(16);
        
        e.setCodigoEmpleado(codigoEmpleadoID);
        e.getUsuario().setUsuario(codigoEmpleadoID);
        e.getUsuario().setContrasenia(codigoEmpleadoID);
        
        cstmt.close();
        connMySQL.close();

        return idEmpleadoGenerado;
    }
    public List<Empleado> getAll (String filtro) throws Exception{
        String sql = "SELECT * FROM empleado";
        conexionDB connMySQL = new conexionDB();
        Connection conn = connMySQL.open();
        PreparedStatement pstmt = conn.prepareStatement(sql);
        ResultSet rs = pstmt.executeQuery();
        List<Empleado> empleado = new ArrayList<>();
        while(rs.next()){
            empleado.add(fill(rs));
        }
        rs.close();
        pstmt.close();
        connMySQL.close();
        return empleado;
    }
    
    private Empleado fill(ResultSet rs) throws Exception{
        Empleado e = new Empleado();
        
        e.setIdEmpleado(rs.getInt("idEmpleado"));
        e.setCodigoEmpleado(rs.getString("codigoEmpleado"));
        e.setEmail(rs.getString("email"));
        e.setFechaIngreso(rs.getString("fechaIngreso"));
        e.setAntiguedad(rs.getString("antigüedad"));
        e.setEstatusEmpleado(rs.getBoolean("estatus"));
        
        return e;
    }
}
