package org.utl.dsm.lelegantchatnoir.rest;

import com.google.gson.Gson;
import com.google.gson.JsonParseException;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Application;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;
import org.apache.commons.codec.digest.DigestUtils;
import org.utl.dsm.lelegantchatnoir.model.Usuario;
import org.utl.dsm.lelegantchatnoir.controller.ControllerLogin;
import org.utl.dsm.lelegantchatnoir.controller.ControllerUsuario;

@Path("login")
public class RESTusuario {
    
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response postLogin(@FormParam("jsonDatos") @DefaultValue("") String jsonDatos) {
        String out;
        Gson gson = new Gson();
        Usuario model;
        ControllerLogin controller;
        
        try {
            model = gson.fromJson(jsonDatos, Usuario.class);
            System.out.println(model);
            controller = new ControllerLogin();
            String contra = DigestUtils.md5Hex(model.getContrasenia());
            model.setContrasenia(contra);
            Usuario loggedUser = controller.login(model);
            if (loggedUser != null) {
                String token = controller.chekUsers(model);
                out = "{ \"status\":true, \"message\":\"Bienvenido\", \"token\":\"" + "\"}";
            } else {
                out = "{ \"status\":false, \"message\":\"Usuario u/o Contraseña son incorrectos\" }";
            }
        } catch (JsonParseException e) {
            System.out.println(e);
            out = "{ \"status\":false, \"message\":\"Formato de datos incorrectos\" }";
        } catch (Exception e) {
            System.out.println(e.getMessage());
            out = "{ \"status\":false, \"message\":\"Error interno del servidor, Intente de nuevo\" }";
        }
        return Response.status(Response.Status.OK).entity(out).build();
    }
}
