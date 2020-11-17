package nl.hsleiden.service;

import nl.hsleiden.model.Order;
import nl.hsleiden.persistence.OrderDAO;

import javax.inject.Inject;
import java.util.Collection;

public class OrderService {

    private final OrderDAO dao;

    @Inject
    public OrderService(OrderDAO dao)
    {
        this.dao = dao;
    }

    public Collection<Order> getAll()
    {
        return dao.getAllOrders();
    }

    public Order getOne(int orderID){
        return dao.getOrder(orderID);
    }

    public Collection<Order> getOrdersFromUser(int userID)
    {
        return dao.getOrderFromUser(userID);
    }

    public void create(Order order) {
        dao.createOrder(order.getOrderUserID(), order.getOrderItemID(), order.getOrderItemAmount(), order.getOrderDelivery());
    }

    public void update(int orderID, Order order)
    {
        // Controleren of deze order wel bestaat
        Order oldOrder = getOne(orderID);

        dao.updateOrder(order.getOrderUserID(), order.getOrderItemID(), order.getOrderItemAmount(), order.getOrderDelivery(), order.getOrderID());
    }

    public void delete(int orderID) { dao.deleteOrder(orderID); }

    public void deleteFromUser(int orderUserID) { dao.deleteOrderFromUser(orderUserID); }
}
