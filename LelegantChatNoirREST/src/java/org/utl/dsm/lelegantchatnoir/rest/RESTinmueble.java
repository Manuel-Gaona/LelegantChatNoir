/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
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
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;
import org.utl.dsm.lelegantchatnoir.controller.ControllerInmueble;
import org.utl.dsm.lelegantchatnoir.model.Inmueble;

/**
 *
 * @author mgaon
 */
@Path("inmueble")
public class RESTinmueble {
    @Path("saludar")
    @Produces(MediaType.APPLICATION_JSON)
    @GET
    public Response saludar()
    {
        String out = """
                     {
                     "response":"¡hola!"
                     }
                     """;
        return Response.status(Response.Status.OK).entity(out).build();
    }
    @Path("agregar")
    @Produces(MediaType.APPLICATION_JSON)
    @POST
    public Response agregar(@FormParam("datosInmueble")
    @DefaultValue("") String datosInmueble){
        String out = null;
        Inmueble inmueble = null; 
        System.out.println("Casi llegaste");
        ControllerInmueble ci = null;
        Gson gson = new Gson();
        System.out.println(datosInmueble);
        try{
            inmueble = gson.fromJson(datosInmueble, Inmueble.class);
            ci = new ControllerInmueble();
            if(inmueble.getIdInmueble()< 1){
                ci.insert(inmueble);
                out = gson.toJson(inmueble);
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
        List<Inmueble> inmueble = null;
        ControllerInmueble ci = new ControllerInmueble();
        try {
            inmueble = ci.getAll();
            out = new Gson().toJson(inmueble);
        } catch (Exception e) {
            out = "{\"error\": \"Error interno del servidor. Intenta mas tarde.\"}";
            System.out.println(e);
        }
        return Response.status(Response.Status.OK).entity(out).build();
    }    
}
