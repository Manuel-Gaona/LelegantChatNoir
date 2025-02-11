package org.utl.dsm.lelegantchatnoir.controller;

import org.utl.dsm.lelegantchatnoir.db.conexionDB;
import org.utl.dsm.lelegantchatnoir.model.Producto;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Types;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class ControllerProducto22 {

    public int insert(Producto p) throws Exception {
        String sql = "{call InsertarProducto(?, ?, ?, ?, ?, "
                + "?)}";

        int idProductoGenerado = -1;
        String codigoProductoGenerado = "";
        
        p.setFechaIngreso(LocalDate.now().toString());
        p.setCodigoProducto(p.generarCodigoProducto(p.getNombre(), p.getFechaIngreso()));

        conexionDB connMySQL = new conexionDB();
        Connection conn = connMySQL.open();
        CallableStatement cstmt = conn.prepareCall(sql);

        cstmt.setString(1, p.getCodigoProducto());
        cstmt.setString(2, p.getNombre());
        cstmt.setString(3, p.getDescripcion());
        cstmt.setDate(4, java.sql.Date.valueOf(p.getFechaIngreso()));
        cstmt.setInt(5, p.getDuracion());
        
        cstmt.registerOutParameter(6, Types.VARCHAR);

        cstmt.executeUpdate();

        codigoProductoGenerado = cstmt.getString(6);
        
        p.setCodigoProducto(codigoProductoGenerado);

        cstmt.close();
        connMySQL.close();

        return idProductoGenerado;
    }
    public List<Producto> getAll (String filtro) throws Exception{
        String sql = "SELECT * FROM producto";
        conexionDB connMySQL = new conexionDB();
        Connection conn = connMySQL.open();
        PreparedStatement pstmt = conn.prepareStatement(sql);
        ResultSet rs = pstmt.executeQuery();
        List<Producto> productos = new ArrayList<>();
        while(rs.next()){
            productos.add(fill(rs));
        }
        rs.close();
        pstmt.close();
        connMySQL.close();
        return productos;
    }
    
    private Producto fill(ResultSet rs) throws Exception{
        Producto p = new Producto();
        
        p.setIdProducto(rs.getInt("idProducto"));
        p.setCodigoProducto(rs.getString("codigoProducto"));
        p.setNombre(rs.getString("nombre"));
        p.setDescripcion(rs.getString("descripcion"));
        p.setFechaIngreso(rs.getString("fechaIngreso"));
        p.setFechaCaducidad(rs.getString("fechaCaducidad"));
        p.setDuracion(rs.getInt("duracion"));
        p.setPrecioCompra(rs.getDouble("precioCompra"));
        p.setPrecioVenta(rs.getDouble("precioVenta"));
        p.setStock(rs.getInt("stock"));
        p.setEstatus(rs.getBoolean("estatus"));
        
        return p;
    }
    public int delete(Producto p) throws Exception {
        String sql = "{call eliminarProductoLogico(?)}";
        
        conexionDB connMySQL = new conexionDB();
        Connection conn = connMySQL.open();
        CallableStatement cstmt = conn.prepareCall(sql);

        cstmt.setString(1, p.getCodigoProducto());
        cstmt.executeUpdate();

        cstmt.close();
        connMySQL.close();

        return p.getIdProducto();
    }
    public int deleteFisico(Producto p) throws Exception {
        String sql = "{call eliminarProductoFisico(?)}";
        
        conexionDB connMySQL = new conexionDB();
        Connection conn = connMySQL.open();
        CallableStatement cstmt = conn.prepareCall(sql);

        cstmt.setString(1, p.getCodigoProducto());
        cstmt.executeUpdate();

        cstmt.close();
        connMySQL.close();

        return p.getIdProducto();
    }
    public void update(Producto p) throws Exception {
        String sql = "{call ActualizarProducto(?, ?, ?, ?, ?, "
                + "?, ?)}";

        conexionDB connMySQL = new conexionDB();
        Connection conn = connMySQL.open();
        CallableStatement cstmt = conn.prepareCall(sql);

        cstmt.setInt(1, p.getIdProducto());
        cstmt.setString(2, p.getNombre());
        cstmt.setString(3, p.getDescripcion());
        cstmt.setDate(4, java.sql.Date.valueOf(p.getFechaIngreso()));
        cstmt.setInt(5, p.getDuracion());
        cstmt.setDouble(6, p.getPrecioCompra());
        cstmt.setDouble(7, p.getPrecioVenta());

        cstmt.executeUpdate();       

        cstmt.close();
        connMySQL.close();
    }
    public Producto getById(int id) throws Exception {
    String sql = "SELECT * FROM producto WHERE idProducto = ?";
    conexionDB connMySQL = new conexionDB();
    Connection conn = connMySQL.open();
    PreparedStatement pstmt = conn.prepareStatement(sql);
    pstmt.setInt(1, id);
    ResultSet rs = pstmt.executeQuery();
    Producto producto = null;

    if (rs.next()) {
        producto = fill(rs);
    }

    rs.close();
    pstmt.close();
    connMySQL.close();

    return producto;
}
    public List<Producto> getByCode (String filtro) throws Exception{
        String sql = "SELECT * FROM Producto WHERE codigoProducto = ?";
        
        conexionDB connMySQL = new conexionDB();
        Connection conn = connMySQL.open();
        PreparedStatement pstmt = conn.prepareStatement(sql);
        
        pstmt.setString(1, filtro);
        
        ResultSet rs = pstmt.executeQuery();
        List<Producto> productos = new ArrayList<>();
        while(rs.next()){
            productos.add(fill(rs));
        }
        rs.close();
        pstmt.close();
        connMySQL.close();
        return productos;
    }

}
