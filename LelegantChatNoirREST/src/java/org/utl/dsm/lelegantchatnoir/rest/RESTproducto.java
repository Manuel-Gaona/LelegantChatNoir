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
import org.utl.dsm.lelegantchatnoir.controller.ControllerProducto;
import org.utl.dsm.lelegantchatnoir.model.Producto;

@Path("producto")
public class RESTproducto extends Application {

    @Path("saludar")
    @Produces(MediaType.APPLICATION_JSON)
    @GET
    public Response saludar() {
        String out = """
                     {
                     "response":"hola producto"
                     }
                     """;
        return Response.status(Response.Status.OK).entity(out).build();
    }

    @Path("guardar")
    @Produces(MediaType.APPLICATION_JSON)
    @POST
    public Response guardar(@FormParam("datosProducto")
            @DefaultValue("") String datosProducto) {
        String out = null;
        Producto producto = null;
        System.out.println("Casi llegaste");
        ControllerProducto cp = null;
        Gson gson = new Gson();
        System.out.println(datosProducto);
        try {
            producto = gson.fromJson(datosProducto, Producto.class);
            cp = new ControllerProducto();
            if (producto.getIdProducto() < 1) {
                cp.insert(producto);
                out = gson.toJson(producto);
            } else{
                cp.update(producto);
                out = gson.toJson(producto);
            }
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
    @Path("delete")
    @Produces(MediaType.APPLICATION_JSON)
    @POST
    public Response delete(@FormParam("datosProducto")
            @DefaultValue("") String datosProducto) {
        String out = null;
        Producto producto = null;
        System.out.println("Casi llegaste");
        ControllerProducto cp = null;
        Gson gson = new Gson();
        System.out.println(datosProducto);
        try {
            producto = gson.fromJson(datosProducto, Producto.class);
            cp = new ControllerProducto();
            cp.delete(producto);
            out = gson.toJson(producto);
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

    @Path("deleteFisico")
    @Produces(MediaType.APPLICATION_JSON)
    @POST
    public Response deleteFisico(@FormParam("datosProducto")
            @DefaultValue("") String datosProducto) {
        String out = null;
        Producto producto = null;
        System.out.println("Casi llegaste");
        ControllerProducto cp = null;
        Gson gson = new Gson();
        System.out.println(datosProducto);
        try {
            producto = gson.fromJson(datosProducto, Producto.class);
            cp = new ControllerProducto();
            cp.deleteFisico(producto);
            out = gson.toJson(producto);
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

    @Path("getAll")
    @Produces(MediaType.APPLICATION_JSON)
    @GET
    public Response getAll(@QueryParam("filtro") @DefaultValue("") String filtro) {
        String out = null;
        List<Producto> producto = null;
        ControllerProducto cc = new ControllerProducto();
        try {
            producto = cc.getAll(filtro);
            out = new Gson().toJson(producto);
        } catch (Exception e) {
            out = "{\"error\": \"Error interno del servidor. Intenta mas tarde.\"}";
            System.out.println(e);
        }
        return Response.status(Response.Status.OK).entity(out).build();
    }

    @Path("actualizar")
    @Produces(MediaType.APPLICATION_JSON)
    @POST
    public Response actualizar(@FormParam("datosProducto") @DefaultValue("") String datosProducto) {
        String out;
        Producto producto = null;
        ControllerProducto cp = null;
        Gson gson = new Gson();
        System.out.println("Casi llegaste");
        System.out.println("Datos recibidos: " + datosProducto);

        try {
            producto = gson.fromJson(datosProducto, Producto.class);
            if (producto == null) {
                out = "{\"error\": \"Producto deserializado es null.\"}";
                return Response.status(Response.Status.BAD_REQUEST).entity(out).build();
            }

            System.out.println("Producto deserializado: " + producto);
            System.out.println("ID del Producto: " + producto.getIdProducto());

            cp = new ControllerProducto();

            if (producto.getIdProducto() > 0) {
                cp.update(producto);
                out = gson.toJson(producto);
            } else {
                out = "{\"error\": \"Producto no tiene un ID válido.\"}";
            }
        } catch (JsonParseException e) {
            out = "{\"error\": \"Formato de datos no válido.\"}";
            e.printStackTrace();
        } catch (Exception e) {
            out = "{\"error\": \"Error interno del servidor. Intenta más tarde.\"}";
            e.printStackTrace();
        }

        return Response.status(Response.Status.OK).entity(out).build();
    }

    @Path("getById/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @GET
    public Response getById(@PathParam("id") int id) {
        String out = null;
        Producto producto = null;
        ControllerProducto cp = new ControllerProducto();

        try {
            // Obtiene el producto por ID
            producto = cp.getById(id);
            if (producto != null) {
                out = new Gson().toJson(producto);
            } else {
                out = "{\"error\": \"Producto no encontrado.\"}";
                return Response.status(Response.Status.NOT_FOUND).entity(out).build();
            }
        } catch (Exception e) {
            e.printStackTrace();  // Imprime el stack trace del error
            out = "{\"error\": \"Error interno del servidor. Intenta más tarde.\"}";
        }

        return Response.status(Response.Status.OK).entity(out).build();
    }

    @Path("getByCode")
    @Produces(MediaType.APPLICATION_JSON)
    @GET
    public Response getByCode(@QueryParam("filtro") @DefaultValue("") String filtro) {
        String out = null;
        List<Producto> producto = null;
        ControllerProducto cp = new ControllerProducto();
        try {
            producto = cp.getByCode(filtro);
            out = new Gson().toJson(producto);
        } catch (Exception e) {
            out = "{\"error\": \"Error interno del servidor. Intenta mas tarde.\"}";
            System.out.println(e);
        }
        return Response.status(Response.Status.OK).entity(out).build();
    }
}
