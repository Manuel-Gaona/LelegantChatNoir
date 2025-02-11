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
import org.utl.dsm.lelegantchatnoir.controller.ControllerVenta;
import org.utl.dsm.lelegantchatnoir.model.Ventas;

/**
 *
 * @author mgaon
 */
@Path("ventas")
public class RESTventa extends Application{
    @Path("saludar")
    @Produces(MediaType.APPLICATION_JSON)
    @GET
    public Response saludar()
    {
        String out = """
                     {
                     "response":"hola venta"
                     }
                     """;
        return Response.status(Response.Status.OK).entity(out).build();
    }
    @Path("guardar")
    @Produces(MediaType.APPLICATION_JSON)
    @POST
    public Response guardar(@FormParam("datosVenta")
    @DefaultValue("") String datosVenta){
        String out = null;
        Ventas venta = null; 
        System.out.println("Casi llegaste");
        ControllerVenta cv = null;
        Gson gson = new Gson();
        System.out.println(datosVenta);
        try{
            venta = gson.fromJson(datosVenta, Ventas.class);
            cv = new ControllerVenta();
            if(venta.getIdVenta()< 1){
                cv.insert(venta);
                out = gson.toJson(venta);
            }else{
                cv.update(venta);
                out = gson.toJson(venta);
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
        List<Ventas> ventas = null;
        ControllerVenta cv = new ControllerVenta();
        try {
            ventas = cv.getAll(filtro);
            out = new Gson().toJson(ventas);
        } catch (Exception e) {
            out = "{\"error\": \"Error interno del servidor. Intenta mas tarde.\"}";
            System.out.println(e);
        }
        return Response.status(Response.Status.OK).entity(out).build();
    }
    @Path("delete")
    @Produces(MediaType.APPLICATION_JSON)
    @POST
    public Response delete(@FormParam("datosVenta")
    @DefaultValue("") String datosVenta){
        String out = null;
        Ventas venta = null; 
        System.out.println("Casi llegaste");
        ControllerVenta cv = null;
        Gson gson = new Gson();
        System.out.println(datosVenta);
        try{
            venta = gson.fromJson(datosVenta, Ventas.class);
            cv = new ControllerVenta();
            cv.delete(venta);
            out = gson.toJson(venta);
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
    @Path("deleteFisico")
    @Produces(MediaType.APPLICATION_JSON)
    @POST
    public Response deleteFisico(@FormParam("datosVenta")
    @DefaultValue("") String datosVenta){
        String out = null;
        Ventas venta = null; 
        System.out.println("Casi llegaste");
        ControllerVenta cv = null;
        Gson gson = new Gson();
        System.out.println(datosVenta);
        try{
            venta = gson.fromJson(datosVenta, Ventas.class);
            cv = new ControllerVenta();
            cv.deleteFisico(venta);
            out = gson.toJson(venta);
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
}
