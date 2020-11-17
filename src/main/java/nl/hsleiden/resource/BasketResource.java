package nl.hsleiden.resource;

import com.fasterxml.jackson.annotation.JsonView;
import com.google.inject.Singleton;
import nl.hsleiden.View;
import nl.hsleiden.model.Basket;
import nl.hsleiden.service.BasketService;

import javax.annotation.security.RolesAllowed;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.Collection;

@Singleton
@Path("/baskets")
@Produces(MediaType.APPLICATION_JSON)
public class BasketResource {

    private final BasketService service;

    @Inject
    public BasketResource(BasketService service)
    {
        this.service = service;
    }

    @GET
    @JsonView(View.Public.class)
    @RolesAllowed("GUEST")
    public Collection<Basket> retrieveAll()
    {
        return service.getAll();
    }

    @GET
    @Path("/{basketID}")
    @JsonView(View.Public.class)
    @RolesAllowed("GUEST")
    public Basket retrieve(@PathParam("basketID") int basketID)
    {
        return service.getOne(basketID);
    }

    @GET
    @Path("/from/{userID}")
    @JsonView(View.Public.class)
    @RolesAllowed("GUEST")
    public Collection<Basket> retrieveFromUser(@PathParam("userID") int userID) { return service.getBasketsFromUser(userID); }

    @GET
    @Path("/from/{userID}/{itemID}")
    @JsonView(View.Public.class)
    @RolesAllowed("GUEST")
    public Collection<Basket> retrieveFromUserWithItem(@PathParam("userID") int userID, @PathParam("itemID") int itemID) { return service.getBasketsFromUserWithItem(userID, itemID); }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @JsonView(View.Protected.class)
    @RolesAllowed("GUEST")
    public void create(Basket basket)
    {
        service.create(basket);
    }

    @PUT
    @Path("/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @JsonView(View.Protected.class)
    @RolesAllowed("GUEST")
    public void update(@PathParam("id") int id, Basket basket)
    {
        service.update(id, basket);
    }

    @DELETE
    @Path("/{basketID}")
    @RolesAllowed("GUEST")
    public void delete(@PathParam("basketID") int id)
    {
        service.delete(id);
    }

    @DELETE
    @Path("/from/{basketUserID}")
    @RolesAllowed("GUEST")
    public void deleteFromUser(@PathParam("basketUserID") int id)
    {
        service.deleteFromUser(id);
    }
}
