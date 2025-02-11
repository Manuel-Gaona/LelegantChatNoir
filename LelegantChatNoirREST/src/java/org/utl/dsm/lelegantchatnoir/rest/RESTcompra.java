package org.utl.dsm.lelegantchatnoir.rest;

import com.google.gson.Gson;
import com.google.gson.JsonParseException;
import jakarta.ws.rs.DefaultValue;
import jakarta.ws.rs.FormParam;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.Application;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;
import org.utl.dsm.lelegantchatnoir.controller.ControllerCompra;
import org.utl.dsm.lelegantchatnoir.controller.ControllerVenta;
import org.utl.dsm.lelegantchatnoir.model.Compras;
import org.utl.dsm.lelegantchatnoir.model.Ventas;

/**
 *
 * @author mgaon
 */
@Path("compras")
public class RESTcompra extends Application{
    @Path("saludar")
    @Produces(MediaType.APPLICATION_JSON)
    @GET
    public Response saludar()
    {
        String out = """
                     {
                     "response":"Bienvendio"
                     }
                     """;
        return Response.status(Response.Status.OK).entity(out).build();
    }
    @Path("guardar")
    @Produces(MediaType.APPLICATION_JSON)
    @POST
    public Response guardar(@FormParam("datosCompra")
    @DefaultValue("") String datosCompra){
        String out = null;
        Compras compra = null; 
        System.out.println("Casi llegaste");
        ControllerCompra cc = null;
        Gson gson = new Gson();
        System.out.println(datosCompra);
        try{
            compra = gson.fromJson(datosCompra, Compras.class);
            cc = new ControllerCompra();
            if(compra.getIdCompra()< 1){
                cc.insert(compra);
                out = gson.toJson(compra);
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
    @Path("getAll")
    @Produces(MediaType.APPLICATION_JSON)
    @GET
    public Response getAll(@QueryParam("filtro") @DefaultValue("") String filtro) {
        String out = null;
        List<Compras> compras = null;
        ControllerCompra cc = new ControllerCompra();
        try {
            compras = cc.getAll(filtro);
            out = new Gson().toJson(compras);
        } catch (Exception e) {
            out = "{\"error\": \"Error interno del servidor. Intenta mas tarde.\"}";
            System.out.println(e);
        }
        return Response.status(Response.Status.OK).entity(out).build();
    }
}
