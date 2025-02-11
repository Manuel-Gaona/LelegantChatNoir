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
import org.utl.dsm.lelegantchatnoir.model.Empleado;
import org.utl.dsm.lelegantchatnoir.controller.ControllerEmpleado;

@Path("empleado")
public class RESTempleado extends Application {
    @Path("saludar")
    @Produces(MediaType.APPLICATION_JSON)
    @GET
    public Response saludar()
    {
        String out = """
                     {
                     "response":"hola empleado"
                     }
                     """;
        return Response.status(Response.Status.OK).entity(out).build();
    }
    @Path("guardar")
    @Produces(MediaType.APPLICATION_JSON)
    @POST
    public Response guardar(@FormParam("datosEmpleado")
    @DefaultValue("") String datosEmpleado){
        String out = null;
        Empleado empleado = null; 
        System.out.println("Casi llegaste");
        ControllerEmpleado ce = null;
        Gson gson = new Gson();
        System.out.println(datosEmpleado);
        try{
            empleado = gson.fromJson(datosEmpleado, Empleado.class);
            ce = new ControllerEmpleado();
            if(empleado.getIdEmpleado() < 1){
                ce.insert(empleado);
                out = gson.toJson(empleado);
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
        List<Empleado> empleado = null;
        ControllerEmpleado ce = new ControllerEmpleado();
        try {
            empleado = ce.getAll(filtro);
            out = new Gson().toJson(empleado);
        } catch (Exception e) {
            out = "{\"error\": \"Error interno del servidor. Intenta mas tarde.\"}";
            System.out.println(e);
        }
        return Response.status(Response.Status.OK).entity(out).build();
    }
    
    @Path("getByCode")
    @Produces(MediaType.APPLICATION_JSON)
    @GET
    public Response getByCode(@QueryParam("filtro") @DefaultValue("") String filtro) {
        String out = null;
        List<Empleado> empleado = null;
        ControllerEmpleado ce = new ControllerEmpleado();
        try {
            empleado = ce.getByCode(filtro);
            out = new Gson().toJson(empleado);
        } catch (Exception e) {
            out = "{\"error\": \"Error interno del servidor. Intenta mas tarde.\"}";
            System.out.println(e);
        }
        return Response.status(Response.Status.OK).entity(out).build();
    }
    
    @Path("deleteLogico")
    @Produces(MediaType.APPLICATION_JSON)
    @POST
    public Response deleteLogico(@FormParam("datosExamen") @DefaultValue("") String datosExamen) {
        String out = null;
        Empleado ex = null;
        ControllerEmpleado ce = null;
        Gson gson = new Gson();

        try {
            ex = gson.fromJson(datosExamen, Empleado.class);
            ce = new ControllerEmpleado();
            ce.eliminarLogicamente(ex);
            out = gson.toJson(ex);
        } catch (JsonParseException e) {
            out = "{\"error\":\"Formato de datos no válido.\"}" + e.getMessage();
            e.printStackTrace();
        } catch (Exception e) {
            out = "{\"error\":\"Error interno del servidor. Intente más tarde.\"}" + e.getMessage();
            e.printStackTrace();
        }
        return Response.status(Response.Status.OK).entity(out).build();
    }
    @Path("update")
    @Produces(MediaType.APPLICATION_JSON)
    @POST
    public Response update(@FormParam("datosExamen") @DefaultValue("") String datosExamen) {
        String out = null;
        Empleado ex = null;
        ControllerEmpleado ce = null;
        Gson gson = new Gson();

        try {
            ex = gson.fromJson(datosExamen, Empleado.class);
            ce = new ControllerEmpleado();
            ce.update(ex);
            out = gson.toJson(ex);
        } catch (JsonParseException e) {
            out = "{\"error\":\"Formato de datos no válido.\"}" + e.getMessage();
            e.printStackTrace();
        } catch (Exception e) {
            out = "{\"error\":\"Error interno del servidor. Intente más tarde.\"}" + e.getMessage();
            e.printStackTrace();
        }
        return Response.status(Response.Status.OK).entity(out).build();
    }
}