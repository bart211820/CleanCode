package nl.hsleiden.model;

import java.sql.Date;

public class Order {
    private int orderID;
    private int orderUserID;
    private int orderItemID;
    private int orderItemAmount;
    private Date orderDelivery;

    public Order() {

    }

    public Order(int orderID, int orderUserID, int orderItemID, int orderItemAmount, Date orderDelivery) {
        this.orderID = orderID;
        this.orderUserID = orderUserID;
        this.orderItemID = orderItemID;
        this.orderItemAmount = orderItemAmount;
        this.orderDelivery = orderDelivery;
    }

    public int getOrderID() {
        return orderID;
    }

    public void setOrderID(int orderID) {
        this.orderID = orderID;
    }

    public int getOrderUserID() {
        return orderUserID;
    }

    public void setOrderUserID(int orderUserID) {
        this.orderUserID = orderUserID;
    }

    public int getOrderItemID() {
        return orderItemID;
    }

    public void setOrderItemID(int orderItemID) {
        this.orderItemID = orderItemID;
    }

    public int getOrderItemAmount() {
        return orderItemAmount;
    }

    public void setOrderItemAmount(int orderItemAmount) {
        this.orderItemAmount = orderItemAmount;
    }

    public Date getOrderDelivery() {
        return orderDelivery;
    }

    public void setOrderDelivery(Date orderDelivery) {
        this.orderDelivery = orderDelivery;
    }


}
