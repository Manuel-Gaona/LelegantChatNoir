/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package org.utl.dsm.lelegantchatnoir.controller;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import org.utl.dsm.lelegantchatnoir.db.conexionDB;
import org.utl.dsm.lelegantchatnoir.model.Inmueble;

/**
 *
 * @author mgaon
 */
public class ControllerInmueble {
    public int insert(Inmueble i) throws Exception {
        String sql = "{call InsertarInmuble(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)}";

        int idInmuebleGenerado = -1;

        conexionDB connMySQL = new conexionDB();
        Connection conn = connMySQL.open();
        CallableStatement cstmt = conn.prepareCall(sql);

        // Configurar parámetros del procedimiento almacenado
        cstmt.setString(1, i.getNombrePropietario());
        cstmt.setDouble(2, i.getMedidaFrente());
        cstmt.setDouble(3, i.getMedidaFondo());
        cstmt.setDouble(4, i.getSuperficie());
        cstmt.setString(5, i.getTelefono());
        cstmt.setString(6, i.getCalle());
        cstmt.setString(7, i.getNumeroExt());
        cstmt.setString(8, i.getNumeroInt());
        cstmt.setString(9, i.getCodigoPostal());
        cstmt.setString(10, i.getColonia());
        
        
        // Registrar parámetro de salida
        cstmt.registerOutParameter(11, Types.INTEGER);

        // Ejecutar el procedimiento almacenado
        cstmt.executeUpdate();

        // Obtener el nuevo código de empleado
        idInmuebleGenerado = cstmt.getInt(11);

        // Actualizar el código de empleado en el objeto Empleado
        i.setIdInmueble(idInmuebleGenerado);

        cstmt.close();
        connMySQL.close();

        return idInmuebleGenerado;
    }
    public List<Inmueble> getAll () throws Exception{
        String sql = "SELECT * FROM inmueble ORDER BY idInmueble DESC";
        conexionDB connMySQL = new conexionDB();
        Connection conn = connMySQL.open();
        PreparedStatement pstmt = conn.prepareStatement(sql);
        ResultSet rs = pstmt.executeQuery();
        List<Inmueble> inmueble = new ArrayList<>();
        while(rs.next()){
            inmueble.add(fill(rs));
        }
        rs.close();
        pstmt.close();
        connMySQL.close();
        return inmueble;
    }
    
    private Inmueble fill(ResultSet rs) throws Exception{
        Inmueble i = new Inmueble();
        
        i.setIdInmueble(rs.getInt("idImbueble"));
        i.setNombrePropietario(rs.getString("nombrePropietario"));
        i.setMedidaFrente(rs.getDouble("medidaFrente"));
        i.setMedidaFondo(rs.getDouble("medidaFondo"));
        i.setSuperficie(rs.getDouble("superficie"));
        i.setTelefono(rs.getString("telefono"));
        i.setCalle(rs.getString("calle"));
        i.setNumeroExt(rs.getString("numeroExt"));
        i.setNumeroInt(rs.getString("numeroInt"));
        i.setCodigoPostal(rs.getString("codigoPostal"));
        i.setColonia(rs.getString("colonia"));
        
        return i;
    }
}
