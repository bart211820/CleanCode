package nl.hsleiden.persistence;

import nl.hsleiden.Database;
import nl.hsleiden.model.Basket;
import nl.hsleiden.model.Order;

import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

public class OrderDAO {

    private Database database;
    private PreparedStatement statement;
    private String query;
    private List<Order> results;

    public OrderDAO() {
        this.database = Database.getInstance();
    }

    public List<Order> selectOrders(PreparedStatement statement) throws SQLException {
        ResultSet orders = database.select(statement);
        List<Order> resultList = new ArrayList<>();

        while (orders.next()){
            Order order = new Order(
                    orders.getInt("orderID"),
                    orders.getInt("orderUserID"),
                    orders.getInt("orderItemID"),
                    orders.getInt("orderItemAmount"),
                    orders.getDate("orderDelivery")
            );

            resultList.add(order);
        }

        return resultList;
    }

    public List<Order> getAllOrders() {
//        try {
//            query = "SELECT * FROM Order;";
//            statement = database.prepareStatement(query);
//
//            return selectOrders(statement);
//        }
//        catch (SQLException e) {
//            throw new RuntimeException(e);
//        }
        Order order1 = new Order(1, 1, 2, 1, new java.sql.Date(Calendar.getInstance().getTime().getTime()));
        Order order2 = new Order(2, 1, 1, 2, new java.sql.Date(Calendar.getInstance().getTime().getTime()));
        List temporaryList = new ArrayList();
        temporaryList.add(order1);
        temporaryList.add(order2);
        return temporaryList;
    }

    public Order getOrder(int orderID){
//        try {
//            query = "SELECT * FROM Order WHERE orderID = ?;";
//            statement.setInt(1, orderID);
//            statement = database.prepareStatement(query);
//
//            return selectOrders(statement).get(0);
//        }
//        catch (SQLException e) {
//            throw new RuntimeException(e);
//        }

        if(orderID == 1){
            return new Order(1, 1, 2, 1, new java.sql.Date(Calendar.getInstance().getTime().getTime()));
        }
        return new Order(2, 1, 1, 2, new java.sql.Date(Calendar.getInstance().getTime().getTime()));
    }

    public List<Order> getOrderFromUser(int orderUserID) {
        //        try {
//            query = "SELECT * FROM Basket WHERE orderUserID = ?;";
//            statement.setInt(1, orderUserID);
//            statement = database.prepareStatement(query);
//
//            return selectOrders(statement).get(0);
//        }
//        catch (SQLException e) {
//            throw new RuntimeException(e);
//        }
        Order order1 = new Order(1, 1, 2, 1, new java.sql.Date(Calendar.getInstance().getTime().getTime()));
        Order order2 = new Order(2, 1, 1, 2, new java.sql.Date(Calendar.getInstance().getTime().getTime()));
        List temporaryList = new ArrayList();
        temporaryList.add(order1);
        temporaryList.add(order2);
        return temporaryList;
    }

    public void createOrder(int orderUserID, int orderItemID, int orderItemAmount, Date orderDelivery) {
        try {
            query = "INSERT INTO Order (orderUserID, orderItemID, orderItemAmount, orderDelivery) VALUES (?, ?, ?, ?);";

            statement = database.prepareStatement(query);
            statement.setInt(1, orderUserID);
            statement.setInt(2, orderItemID);
            statement.setInt(3, orderItemAmount);
            statement.setDate(4, orderDelivery);

            database.update(statement);
        }
        catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public void updateOrder(int orderUserID, int orderItemID, int orderAmount, Date orderDelivery, int orderID) {
        try {
            query = "UPDATE Order orderUserID = ?, orderItemID = ?, orderAmount = ?, orderDelivery = ? WHERE orderID = ?";

            statement = database.prepareStatement(query);
            statement.setInt(1, orderUserID);
            statement.setInt(2, orderItemID);
            statement.setInt(3, orderAmount);
            statement.setDate(4, orderDelivery);
            statement.setInt(5, orderID);

            database.update(statement);
        }
        catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public void deleteOrder(int orderID) {
        try {
            query = "DELETE FROM Order WHERE orderID = ?;";

            statement = database.prepareStatement(query);
            statement.setInt(1, orderID);

            database.update(statement);
        }
        catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public void deleteOrderFromUser(int orderUserID) {
        try {
            query = "DELETE FROM Order WHERE orderUserID = ?;";

            statement = database.prepareStatement(query);
            statement.setInt(1, orderUserID);

            database.update(statement);
        }
        catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }
}
