package org.utl.dsm.lelegantchatnoir.controller;

import org.utl.dsm.lelegantchatnoir.db.conexionDB;
import org.utl.dsm.lelegantchatnoir.model.Producto_Ventas;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;

public class ControllerProductoVenta {

    public Integer insert(Producto_Ventas pv) throws Exception {
        String sql = "{call InsertarProductoVenta(?, ?, ?, ?)}";
        
        int idProductoVentaGenerado = -1;

        conexionDB connMySQL = new conexionDB();
        Connection conn = connMySQL.open();
        CallableStatement cstmt = conn.prepareCall(sql);

        cstmt.setString(1, pv.getCodigoVenta());
        cstmt.setString(2, pv.getCodigoProducto());
        cstmt.setInt(3, pv.getCantidad());
        
        cstmt.registerOutParameter(4, Types.VARCHAR);

        cstmt.executeUpdate();

        idProductoVentaGenerado = cstmt.getInt(4);
        pv.setIdProducto_Ventas(idProductoVentaGenerado);
        
        cstmt.close();
        connMySQL.close();

        return idProductoVentaGenerado;
    }
    public void update(Producto_Ventas pv) throws Exception {
        String sql = "{call ActualizarProductoVenta(?, ?, ?)}";

        conexionDB connMySQL = new conexionDB();
        Connection conn = connMySQL.open();
        CallableStatement cstmt = conn.prepareCall(sql);

        cstmt.setInt(1, pv.getIdProducto_Ventas());
        
        cstmt.setInt(2, pv.getCantidad());
        cstmt.setDouble(3, pv.getPrecio());

        cstmt.executeUpdate();
        
        cstmt.close();
        connMySQL.close();
    }
    public List<Producto_Ventas> getByCode (String filtro) throws Exception{
        String sql = "SELECT * FROM Producto_Ventas WHERE codigoVenta = ?";
        
        conexionDB connMySQL = new conexionDB();
        Connection conn = connMySQL.open();
        PreparedStatement pstmt = conn.prepareStatement(sql);
        
        pstmt.setString(1, filtro);
        
        ResultSet rs = pstmt.executeQuery();
        List<Producto_Ventas> productos_venta = new ArrayList<>();
        while(rs.next()){
            productos_venta.add(fill(rs));
        }
        rs.close();
        pstmt.close();
        connMySQL.close();
        return productos_venta;
    }
    
    private Producto_Ventas fill(ResultSet rs) throws Exception{
        Producto_Ventas pv = new Producto_Ventas();
        
        pv.setIdProducto_Ventas(rs.getInt("idProducto_Ventas"));
        pv.setCodigoVenta(rs.getString("codigoVenta"));
        pv.setCodigoProducto(rs.getString("codigoProducto"));
        pv.setCantidad(rs.getInt("cantidad"));
        pv.setPrecio(rs.getDouble("precio"));
        pv.setTotal(rs.getDouble("total"));
        pv.setEstatus(rs.getBoolean("estatus"));
        
        return pv;
    }
}
