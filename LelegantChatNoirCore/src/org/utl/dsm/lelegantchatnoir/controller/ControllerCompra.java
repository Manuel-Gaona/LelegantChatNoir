package org.utl.dsm.lelegantchatnoir.controller;

import org.utl.dsm.lelegantchatnoir.db.conexionDB;
import org.utl.dsm.lelegantchatnoir.model.Compras;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Types;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import org.utl.dsm.lelegantchatnoir.model.Ventas;

public class ControllerCompra {

    public int insert(Compras c) throws Exception {
        String sql = "{call InsertarCompra(?, ?, ?)}";
        
        c.setFechaCompra(LocalDate.now().toString());
        c.setCodigoCompra(c.generarCodigoCompra(c.getFechaCompra()));

        int idCompraGenerada = -1;
        String codigoCompraGenerado = "";

        conexionDB connMySQL = new conexionDB();
        Connection conn = connMySQL.open();
        CallableStatement cstmt = conn.prepareCall(sql);

        cstmt.setString(1, c.getCodigoCompra());
        cstmt.setDate(2, java.sql.Date.valueOf(c.getFechaCompra()));

        cstmt.registerOutParameter(3, Types.VARCHAR);

        cstmt.executeUpdate();
        
        codigoCompraGenerado = cstmt.getString(3);
        
        c.setCodigoCompra(codigoCompraGenerado);

        cstmt.close();
        connMySQL.close();

        return idCompraGenerada;
    }
    public void update(Compras c) throws Exception {
        String sql = "{call ActualizarCompra (?, ?)}";

        conexionDB connMySQL = new conexionDB();
        Connection conn = connMySQL.open();
        CallableStatement cstmt = conn.prepareCall(sql);

        cstmt.setString(1, c.getCodigoCompra());
        cstmt.setDate(2, java.sql.Date.valueOf(c.getFechaCompra()));

        cstmt.executeUpdate();

        cstmt.close();
        connMySQL.close();
    }
    public List<Compras> getAll (String filtro) throws Exception{
        String sql = "SELECT * FROM compras";
        conexionDB connMySQL = new conexionDB();
        Connection conn = connMySQL.open();
        PreparedStatement pstmt = conn.prepareStatement(sql);
        ResultSet rs = pstmt.executeQuery();
        List<Compras> compras = new ArrayList<>();
        while(rs.next()){
            compras.add(fill(rs));
        }
        rs.close();
        pstmt.close();
        connMySQL.close();
        return compras;
    }
    
    private Compras fill(ResultSet rs) throws Exception{
        Compras c = new Compras();
        
        c.setIdCompra(rs.getInt("idCompra"));
        c.setCodigoCompra(rs.getString("codigoCompra"));
        c.setSubtotal(rs.getDouble("subtotal"));
        c.setIva(rs.getDouble("iva"));
        c.setTotalCompra(rs.getDouble("totalCompra"));
        c.setFechaCompra(rs.getString("fechaCompra"));
        c.setEstatus(rs.getBoolean("estatus"));
        
        return c;
    }
}
