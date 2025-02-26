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
import org.utl.dsm.lelegantchatnoir.controller.ControllerUsuario;
import org.utl.dsm.lelegantchatnoir.model.Usuario;
import org.apache.commons.codec.digest.DigestUtils;

/**
 *
 * @author mgaon
 */
@Path("usuario")
public class RESTusuarios {
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
    public Response agregar(@FormParam("datosUsuario")
    @DefaultValue("") String datosUsuario){
        String out = null;
        Usuario usuario = null; 
        System.out.println("Casi llegaste");
        ControllerUsuario cu = new ControllerUsuario();
        Gson gson = new Gson();
        System.out.println(datosUsuario);
        
        try{
            usuario = gson.fromJson(datosUsuario, Usuario.class);
            String contra = DigestUtils.md5Hex(usuario.getContrasenia());
            usuario.setContrasenia(contra);
            if(usuario.getIdUsuario()< 1){
                cu.insert(usuario);
                out = gson.toJson(usuario);
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
        List<Usuario> usuario = null;
        ControllerUsuario cu = new ControllerUsuario();
        try {
            usuario = cu.getAll(filtro);
            out = new Gson().toJson(usuario);
        } catch (Exception e) {
            out = "{\"error\": \"Error interno del servidor. Intenta mas tarde.\"}";
            System.out.println(e);
        }
        return Response.status(Response.Status.OK).entity(out).build();
    }
    
    @Path("login")
    @Produces(MediaType.APPLICATION_JSON)
    @POST
    public Response login(@FormParam("datosUsuario")
    @DefaultValue("") String datosUsuario) {
        String out = null;
        ControllerUsuario cu = new ControllerUsuario();
        Usuario usuario = null; 
        //System.out.println("Casi llegaste");
        Gson gson = new Gson();
        //System.out.println(datosUsuario);

        try {
            // Llamar a la función checkUser en el controlador
            usuario = gson.fromJson(datosUsuario, Usuario.class);
            String contra = DigestUtils.md5Hex(usuario.getContrasenia());
            usuario.setContrasenia(contra);
            String token = cu.login(usuario);
            System.out.println(token);
            // Si se generó un token, devolverlo en la respuesta JSON
            if (token != null) {
                out = """
                  {"token": "%s", "contrasenia": "%s"}
                  """;
                out = String.format(out,token, contra);
                System.out.println("si se genro token");
            } else {
                out = """
                  {"error": "No se pudo autenticar al usuario o usuario no encontrado."}
                  """;
                System.out.println("No se genro token");
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
    @Path("checkToken")
    @Produces(MediaType.APPLICATION_JSON)
    @POST
    public Response checkToken(@FormParam("datosUsuario")
    @DefaultValue("") String datosUsuario) {
        String out = null;
        ControllerUsuario cu = new ControllerUsuario();
        Usuario usuario = null; 
        //System.out.println("Casi llegaste");
        Gson gson = new Gson();
        //System.out.println(datosUsuario);

        try {
            // Llamar a la función checkUser en el controlador
            usuario = gson.fromJson(datosUsuario, Usuario.class);
            boolean isToken = cu.checkToken(usuario);
            //System.out.println(isToken);
            // Si se generó un token, devolverlo en la respuesta JSON
            if (isToken) {
                out = """
                  {"token": "%s", "isToken": %b}
                  """;
                out = String.format(out,usuario.getToken(), isToken);
                System.out.println("si se genro token");
            } else {
                out = """
                  {"error": "No se pudo autenticar el token.",  "isToken": %b}
                  """;
                //System.out.println("No se genro token");
                out = String.format(out, isToken);
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

    @Path("logout")
    @Produces(MediaType.APPLICATION_JSON)
    @POST
    public Response logout(@FormParam("datosUsuario") @DefaultValue("") String datosUsuario) {
        String out = null;
        Usuario usuario = null;
        ControllerUsuario cu = new ControllerUsuario();
        Gson gson = new Gson();

        try {
            usuario = gson.fromJson(datosUsuario, Usuario.class);
            // Llamar a la función checkUser en el controlador
            String lastToken = cu.logout(usuario);

            // Si se generó un token, devolverlo en la respuesta JSON
            if (lastToken != null) {
                out = """
                  {"lastToken": "%s"}
                  """;
                out = String.format(out,lastToken);
            } else {
                out = """
                  {"token": "", "error": "usuario no encontrado."}
                  """;
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

    
    @Path("delete")
    @Produces(MediaType.APPLICATION_JSON)
    @POST
    public Response delete(@FormParam("datosUsuario")
            @DefaultValue("") String datosUsuario) {
        String out = null;
        Usuario usuario = null;
        System.out.println("Casi llegaste");
        ControllerUsuario cu = null;
        Gson gson = new Gson();
        System.out.println(datosUsuario);
        try {
            usuario = gson.fromJson(datosUsuario, Usuario.class);
            cu = new ControllerUsuario();
            cu.eliminarLogicamente(usuario);
            out = gson.toJson(usuario);
        } catch (JsonParseException e) {
            out = """
                  {"error": "Formato de datos no valido."}
                  """;
            e.printStackTrace();
        } catch (Exception e) {
            out = """
                  {"error": "Error interno del servidor. Intenta mas tarde."}
                  """;
            e.printStackTrace();
        }
        return Response.status(Response.Status.OK).entity(out).build();
    }
    
}
