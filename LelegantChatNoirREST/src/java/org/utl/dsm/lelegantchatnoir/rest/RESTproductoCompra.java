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
import org.utl.dsm.lelegantchatnoir.model.Producto_Compra;
import org.utl.dsm.lelegantchatnoir.controller.ControllerProductoCompra;


@Path("producto_compra")
public class RESTproductoCompra extends Application {
    @Path("saludar")
    @Produces(MediaType.APPLICATION_JSON)
    @GET
    public Response saludar()
    {
        String out = """
                     {
                     "response":"hola producto_compra"
                     }
                     """;
        return Response.status(Response.Status.OK).entity(out).build();
    }
    @Path("guardar")
    @Produces(MediaType.APPLICATION_JSON)
    @POST
    public Response guardar(@FormParam("datosProductoCompra")
    @DefaultValue("") String datosProductoCompra){
        String out = null;
        Producto_Compra producto_compra = null; 
        System.out.println("Casi llegaste");
        ControllerProductoCompra cp = null;
        Gson gson = new Gson();
        System.out.println(datosProductoCompra);
        try{
            producto_compra = gson.fromJson(datosProductoCompra, Producto_Compra.class);
            cp = new ControllerProductoCompra();
            if(producto_compra.getIdProducto_Compra()< 1){
                cp.insert(producto_compra);
                out = gson.toJson(producto_compra);
            }else{
                cp.update(producto_compra);
                out = gson.toJson(producto_compra);
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
        List<Producto_Compra> producto_compra = null;
        ControllerProductoCompra cp = new ControllerProductoCompra();
        try {
            producto_compra = cp.getByCode(filtro);
            out = new Gson().toJson(producto_compra);
        } catch (Exception e) {
            out = "{\"error\": \"Error interno del servidor. Intenta mas tarde.\"}";
            System.out.println(e);
        }
        return Response.status(Response.Status.OK).entity(out).build();
    }
}
