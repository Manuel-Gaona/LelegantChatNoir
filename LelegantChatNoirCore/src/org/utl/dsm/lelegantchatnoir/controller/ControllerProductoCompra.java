package org.utl.dsm.lelegantchatnoir.controller;

import org.utl.dsm.lelegantchatnoir.db.conexionDB;
import org.utl.dsm.lelegantchatnoir.model.Producto_Compra;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;

public class ControllerProductoCompra {

    public Integer insert(Producto_Compra pc) throws Exception {
        String sql = "{call InsertarProductoCompra(?, ?, ?, ?, ?, ?)}";
        
        int idProductoCompraGenerado = -1;

        conexionDB connMySQL = new conexionDB();
        Connection conn = connMySQL.open();
        CallableStatement cstmt = conn.prepareCall(sql);

        cstmt.setString(1, pc.getCodigoCompra());
        cstmt.setString(2, pc.getCodigoProducto());
        cstmt.setInt(3, pc.getCantidad());
        cstmt.setDouble(4, pc.getPrecioCompra());
        cstmt.setDouble(5, pc.getPrecioVenta());
        
        cstmt.registerOutParameter(6, Types.VARCHAR);

        cstmt.executeUpdate();

        idProductoCompraGenerado = cstmt.getInt(6);
        pc.setIdProducto_Compra(idProductoCompraGenerado);
        
        cstmt.close();
        connMySQL.close();

        return idProductoCompraGenerado;
    }
    public void update(Producto_Compra pc) throws Exception {
        String sql = "{call ActualizarProductoCompra(?, ?, ?, ?)}";

        conexionDB connMySQL = new conexionDB();
        Connection conn = connMySQL.open();
        CallableStatement cstmt = conn.prepareCall(sql);

        cstmt.setInt(1, pc.getIdProducto_Compra());
        cstmt.setInt(2, pc.getCantidad());
        cstmt.setDouble(3, pc.getPrecioCompra());
        cstmt.setDouble(4, pc.getPrecioVenta());

        cstmt.executeUpdate();
        
        cstmt.close();
        connMySQL.close();
    }
    public List<Producto_Compra> getByCode (String filtro) throws Exception{
        String sql = "SELECT * FROM Producto_Compra WHERE codigoCompra = ?";
        
        conexionDB connMySQL = new conexionDB();
        Connection conn = connMySQL.open();
        PreparedStatement pstmt = conn.prepareStatement(sql);
        
        pstmt.setString(1, filtro);
        
        ResultSet rs = pstmt.executeQuery();
        List<Producto_Compra> productos_compra = new ArrayList<>();
        while(rs.next()){
            productos_compra.add(fill(rs));
        }
        rs.close();
        pstmt.close();
        connMySQL.close();
        return productos_compra;
    }
    
    private Producto_Compra fill(ResultSet rs) throws Exception{
        Producto_Compra pc = new Producto_Compra();
        
        pc.setIdProducto_Compra(rs.getInt("idProducto_Compra"));
        pc.setCodigoCompra(rs.getString("codigoCompra"));
        pc.setCodigoProducto(rs.getString("codigoProducto"));
        pc.setCantidad(rs.getInt("cantidad"));
        pc.setPrecioCompra(rs.getDouble("precio"));
        pc.setTotal(rs.getDouble("total"));
        pc.setEstatus(rs.getBoolean("estatus"));
        
        return pc;
    }
}
