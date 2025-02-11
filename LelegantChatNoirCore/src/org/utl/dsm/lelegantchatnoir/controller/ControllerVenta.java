package org.utl.dsm.lelegantchatnoir.controller;

import org.utl.dsm.lelegantchatnoir.db.conexionDB;
import org.utl.dsm.lelegantchatnoir.model.Ventas;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Types;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class ControllerVenta {

    public int insert(Ventas v) throws Exception {
        String sql = "{call InsertarVenta(?, ?, ?)}";
        
        v.setFechaVenta(LocalDate.now().toString());
        v.setCodigoVenta(v.generarCodigoVenta(v.getFechaVenta()));

        int idVentaGenerada = -1;
        String codigoVentaGenerado = "";

        conexionDB connMySQL = new conexionDB();
        Connection conn = connMySQL.open();
        CallableStatement cstmt = conn.prepareCall(sql);

        cstmt.setString(1, v.getCodigoVenta());
        cstmt.setDate(2, java.sql.Date.valueOf(v.getFechaVenta()));

        cstmt.registerOutParameter(3, Types.VARCHAR);

        cstmt.executeUpdate();
        
        codigoVentaGenerado = cstmt.getString(3);

        v.setIdVenta(idVentaGenerada);
        v.setCodigoVenta(codigoVentaGenerado);

        cstmt.close();
        connMySQL.close();

        return idVentaGenerada;
    }
    public void update(Ventas v) throws Exception {
        String sql = "{call ActualizarVenta(?, ?)}";

        conexionDB connMySQL = new conexionDB();
        Connection conn = connMySQL.open();
        CallableStatement cstmt = conn.prepareCall(sql);

        cstmt.setString(1, v.getCodigoVenta());
        cstmt.setDate(2, java.sql.Date.valueOf(v.getFechaVenta()));

        cstmt.executeUpdate();

        cstmt.close();
        connMySQL.close();
    }
    public int delete(Ventas v) throws Exception {
        String sql = "{call eliminarVentaLogica(?)}";
        
        conexionDB connMySQL = new conexionDB();
        Connection conn = connMySQL.open();
        CallableStatement cstmt = conn.prepareCall(sql);

        cstmt.setString(1, v.getCodigoVenta());
        cstmt.executeUpdate();

        cstmt.close();
        connMySQL.close();

        return v.getIdVenta();
    }

    public int deleteFisico(Ventas v) throws Exception {
        String sql = "{call eliminarVentaFisica(?)}";
        
        conexionDB connMySQL = new conexionDB();
        Connection conn = connMySQL.open();
        CallableStatement cstmt = conn.prepareCall(sql);

        cstmt.setString(1, v.getCodigoVenta());
        cstmt.executeUpdate();

        cstmt.close();
        connMySQL.close();

        return v.getIdVenta();
    }
    public List<Ventas> getAll (String filtro) throws Exception{
        String sql = "SELECT * FROM ventas";
        conexionDB connMySQL = new conexionDB();
        Connection conn = connMySQL.open();
        PreparedStatement pstmt = conn.prepareStatement(sql);
        ResultSet rs = pstmt.executeQuery();
        List<Ventas> ventas = new ArrayList<>();
        while(rs.next()){
            ventas.add(fill(rs));
        }
        rs.close();
        pstmt.close();
        connMySQL.close();
        return ventas;
    }
    
    private Ventas fill(ResultSet rs) throws Exception{
        Ventas v = new Ventas();
        
        v.setIdVenta(rs.getInt("idVenta"));
        v.setCodigoVenta(rs.getString("codigoVenta"));
        v.setSubtotal(rs.getDouble("subtotal"));
        v.setIva(rs.getDouble("iva"));
        v.setTotalVenta(rs.getDouble("totalVenta"));
        v.setFechaVenta(rs.getString("fechaVenta"));
        v.setEstatus(rs.getBoolean("estatus"));
        
        return v;
    }
}
