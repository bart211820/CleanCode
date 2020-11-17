package nl.hsleiden.resource;

import com.fasterxml.jackson.annotation.JsonView;
import com.google.inject.Singleton;
import nl.hsleiden.View;
import nl.hsleiden.model.Order;
import nl.hsleiden.service.OrderService;

import javax.annotation.security.RolesAllowed;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.Collection;

@Singleton
@Path("/orders")
@Produces(MediaType.APPLICATION_JSON)
public class OrderResource {

    private final OrderService service;

    @Inject
    public OrderResource(OrderService service)
    {
        this.service = service;
    }

    @GET
    @JsonView(View.Public.class)
    @RolesAllowed("GUEST")
    public Collection<Order> retrieveAll()
    {
        return service.getAll();
    }

    @GET
    @Path("/{orderID}")
    @JsonView(View.Public.class)
    @RolesAllowed("GUEST")
    public Order retrieve(@PathParam("orderID") int orderID)
    {
        return service.getOne(orderID);
    }

    @GET
    @Path("/from/{userID}")
    @JsonView(View.Public.class)
    @RolesAllowed("GUEST")
    public Collection<Order> retrieveFromUser(@PathParam("userID") int userID) { return service.getOrdersFromUser(userID); }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @JsonView(View.Protected.class)
    @RolesAllowed("GUEST")
    public void create(Order order)
    {
        service.create(order);
    }

    @PUT
    @Path("/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @JsonView(View.Protected.class)
    @RolesAllowed("GUEST")
    public void update(@PathParam("id") int id, Order order)
    {
        service.update(id, order);
    }

    @DELETE
    @Path("/{orderID}")
    @RolesAllowed("GUEST")
    public void delete(@PathParam("orderID") int id)
    {
        service.delete(id);
    }

    @DELETE
    @Path("/from/{orderUserID}")
    @RolesAllowed("GUEST")
    public void deleteFromUser(@PathParam("orderUserID") int id)
    {
        service.deleteFromUser(id);
    }
}
