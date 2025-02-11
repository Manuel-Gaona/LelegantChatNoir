package org.utl.dsm.lelegantchatnoir.rest;

/**
 *
 * @author mgaon
 */
import com.google.gson.Gson;
import com.google.gson.JsonParseException;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Application;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;
import org.utl.dsm.lelegantchatnoir.model.Producto_Ventas;
import org.utl.dsm.lelegantchatnoir.controller.ControllerProductoVenta;
import org.utl.dsm.lelegantchatnoir.controller.ControllerVenta;
import org.utl.dsm.lelegantchatnoir.model.Ventas;

@Path("producto_ventas")
public class RESTproductoVenta extends Application {
    @Path("saludar")
    @Produces(MediaType.APPLICATION_JSON)
    @GET
    public Response saludar()
    {
        String out = """
                     {
                     "response":"hola producto_venta"
                     }
                     """;
        return Response.status(Response.Status.OK).entity(out).build();
    }
    @Path("guardar")
    @Produces(MediaType.APPLICATION_JSON)
    @POST
    public Response guardar(@FormParam("datosProductoVenta")
    @DefaultValue("") String datosProductoVenta){
        String out = null;
        Producto_Ventas producto_venta = null; 
        System.out.println("Casi llegaste");
        ControllerProductoVenta cp = null;
        Gson gson = new Gson();
        System.out.println(datosProductoVenta);
        try{
            producto_venta = gson.fromJson(datosProductoVenta, Producto_Ventas.class);
            cp = new ControllerProductoVenta();
            if(producto_venta.getIdProducto_Ventas()< 1){
                cp.insert(producto_venta);
                out = gson.toJson(producto_venta);
            }else{
                cp.update(producto_venta);
                out = gson.toJson(producto_venta);
            }
        } catch (JsonParseException e){
            out = """
                  {"error": "Formato de datos no valido."}
                  """;
            e.printStackTrace();
        } catch (Exception e){
            out = """
                  {"error": "Error interno del servidor. Intenta mas tarde."}
                  """;
            e.printStackTrace();
        }
        return Response.status(Response.Status.OK).entity(out).build();
    }
    @Path("getByCode")
    @Produces(MediaType.APPLICATION_JSON)
    @GET
    public Response getByCode(@QueryParam("filtro") @DefaultValue("") String filtro) {
        String out = null;
        List<Producto_Ventas> producto_ventas = null;
        ControllerProductoVenta cp = new ControllerProductoVenta();
        try {
            producto_ventas = cp.getByCode(filtro);
            out = new Gson().toJson(producto_ventas);
        } catch (Exception e) {
            out = "{\"error\": \"Error interno del servidor. Intenta mas tarde.\"}";
            System.out.println(e);
        }
        return Response.status(Response.Status.OK).entity(out).build();
    }
}
