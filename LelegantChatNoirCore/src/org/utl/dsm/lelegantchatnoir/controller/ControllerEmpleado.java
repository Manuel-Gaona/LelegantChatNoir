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

public class ControllerEmpleado {
    
    public int insert(Empleado e) throws Exception {
    String sql = "{call InsertarPersonaUsuarioEmpleado(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)}";
    
    // Generar valores necesarios
    e.setCurp(e.generarCurp(e.getNombre(), e.getApellidoP(), e.getApellidoM(), e.getGenero(), e.getFechaNac(), e.getEstado()));
    e.setEdad(e.calcularAnios(e.getFechaNac()));
    e.setFechaIngreso(LocalDate.now().toString());
    e.setAntiguedad(e.calcularTiempoTranscurrido(e.getFechaIngreso()));
    e.setCodigoEmpleado(e.generarCodigoEmpleado(e.getNombre(), e.getApellidoP(), e.getFechaIngreso(), e.getGenero(), e.getEstado()));
    e.setEmail(e.generarEmail(e.getNombre(), e.getApellidoP(), e.getFechaIngreso()));

    int idEmpleadoGenerado = -1;
    String nuevoCodigoEmpleado;

    conexionDB connMySQL = new conexionDB();
    Connection conn = connMySQL.open();
    CallableStatement cstmt = conn.prepareCall(sql);

    // Configurar parámetros del procedimiento almacenado
    cstmt.setString(1, e.getNombre());
    cstmt.setString(2, e.getApellidoP());
    cstmt.setString(3, e.getApellidoM());
    cstmt.setString(4, e.getGenero());
    cstmt.setDate(5, java.sql.Date.valueOf(e.getFechaNac()));
    cstmt.setString(6, e.getCurp());
    cstmt.setString(7, e.getEstado());
    cstmt.setInt(8, e.getEdad());
    cstmt.setString(9, e.getCodigoEmpleado());
    cstmt.setString(10, e.getCodigoEmpleado()); // Para contrasenia temporal (se actualiza después)
    cstmt.setString(11, e.getUsuario().getRol());
    cstmt.setString(12, e.getCodigoEmpleado());
    cstmt.setString(13, e.getEmail());
    cstmt.setDate(14, java.sql.Date.valueOf(e.getFechaIngreso()));
    cstmt.setString(15, e.getAntiguedad());

    // Registrar parámetro de salida
    cstmt.registerOutParameter(16, Types.VARCHAR);

    // Ejecutar el procedimiento almacenado
    cstmt.executeUpdate();

    // Obtener el nuevo código de empleado
    nuevoCodigoEmpleado = cstmt.getString(16);

    // Actualizar el código de empleado en el objeto Empleado
    e.setCodigoEmpleado(nuevoCodigoEmpleado);
    e.getUsuario().setUsuario(nuevoCodigoEmpleado);
    e.getUsuario().setContrasenia(nuevoCodigoEmpleado);

    cstmt.close();
    connMySQL.close();

    return idEmpleadoGenerado;
}
    
    public int update(Empleado e) throws Exception {
        String sql = "{call ActualizarPersonaUsuarioEmpleado(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)}";
        
        e.setCurp(e.generarCurp(e.getNombre(), e.getApellidoP(), e.getApellidoM(), e.getGenero(), e.getFechaNac(), e.getEstado()));
        e.setEdad(e.calcularAnios(e.getFechaNac()));
        e.setFechaIngreso(LocalDate.now().toString());
        e.setAntiguedad(e.calcularTiempoTranscurrido(e.getFechaIngreso()));
        e.setCodigoEmpleado(e.generarCodigoEmpleado(e.getNombre(), e.getApellidoP(), e.getFechaIngreso(), e.getGenero(), e.getEstado()));
        e.setEmail(e.generarEmail(e.getNombre(), e.getApellidoP(), e.getFechaIngreso()));
        
        String nuevoCodigoEmpleado;
        
        conexionDB connMySQL = new conexionDB();
        Connection conn = connMySQL.open();
        CallableStatement cstmt = conn.prepareCall(sql);
        
        cstmt.setInt(1, e.getIdPersona());
        cstmt.setString(2, e.getNombre());
        cstmt.setString(3, e.getApellidoP());
        cstmt.setString(4, e.getApellidoM());
        cstmt.setString(5, e.getGenero());
        cstmt.setDate(6, java.sql.Date.valueOf(e.getFechaNac()));
        cstmt.setString(7, e.getCurp());
        cstmt.setString(8, e.getEstado());
        cstmt.setInt(9, e.getEdad());
        
        cstmt.setInt(10, e.getUsuario().getIdUsuario());
        cstmt.setString(11, e.getUsuario().getUsuario());
        cstmt.setString(12, e.getUsuario().getContrasenia());
        cstmt.setString(13, e.getUsuario().getRol());
        
        cstmt.setInt(14, e.getIdEmpleado());
        cstmt.setString(15, e.getCodigoEmpleado());
        cstmt.setString(16, e.getEmail());
        cstmt.setDate(17, java.sql.Date.valueOf(e.getFechaIngreso()));
        cstmt.setString(18, e.getAntiguedad());
        
        cstmt.registerOutParameter(19, Types.VARCHAR);
        
        cstmt.executeUpdate();
        
        nuevoCodigoEmpleado = cstmt.getString(19);
        
        e.setCodigoEmpleado(nuevoCodigoEmpleado);
        e.getUsuario().setUsuario(nuevoCodigoEmpleado);
        e.getUsuario().setContrasenia(nuevoCodigoEmpleado);
        
        cstmt.close();
        connMySQL.close();
        
        return e.getIdEmpleado();
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
    
    public List<Empleado> getByCode (String filtro) throws Exception{
        String sql = "SELECT * FROM empleado where codigoEmpleado = ?";
        conexionDB connMySQL = new conexionDB();
        Connection conn = connMySQL.open();
        PreparedStatement pstmt = conn.prepareStatement(sql);
        pstmt.setString(1, filtro);
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
    public void eliminarLogicamente(Empleado e) throws Exception {
        String sql = "{call eliminarEmpleadoLogica(?)}"; // 1 parámetro de entrada

        conexionDB connMySQL = new conexionDB();
        Connection conn = connMySQL.open();
        CallableStatement cstmt = conn.prepareCall(sql);

        cstmt.setInt(1, e.getIdEmpleado());
        cstmt.executeUpdate();
        cstmt.close();
        connMySQL.close();
    }
}
