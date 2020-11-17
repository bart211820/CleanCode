package nl.hsleiden.persistence;

import nl.hsleiden.Database;
import nl.hsleiden.model.Animator;
import nl.hsleiden.model.Basket;
import nl.hsleiden.model.Item;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class BasketDAO {

    private Database database;
    private PreparedStatement statement;
    private String query;
    private List<Basket> results;

    public BasketDAO() {
        this.database = Database.getInstance();
    }

    public List<Basket> selectBaskets(PreparedStatement statement) throws SQLException {
        ResultSet baskets = database.select(statement);
        List<Basket> resultList = new ArrayList<>();

        while (baskets.next()){
            Basket basket = new Basket(
                    baskets.getInt("basketID"),
                    baskets.getInt("basketUserID"),
                    baskets.getInt("basketItemID"),
                    baskets.getInt("basketItemAmount")
            );

            resultList.add(basket);
        }

        return resultList;
    }

    public List<Basket> getAllBaskets() {
//        try {
//            query = "SELECT * FROM Basket;";
//            statement = database.prepareStatement(query);
//
//            return selectBaskets(statement);
//        }
//        catch (SQLException e) {
//            throw new RuntimeException(e);
//        }
        Basket basket1 = new Basket(1, 1, 1, 1);
        Basket basket2 = new Basket(2, 1, 2, 2);
        List temporaryList = new ArrayList();
        temporaryList.add(basket1);
        temporaryList.add(basket2);
        return temporaryList;
    }

    public Basket getBasket(int basketID){
//        try {
//            query = "SELECT * FROM Basket WHERE basketID = ?;";
//            statement.setInt(1, basketID);
//            statement = database.prepareStatement(query);
//
//            return selectBaskets(statement).get(0);
//        }
//        catch (SQLException e) {
//            throw new RuntimeException(e);
//        }

        if(basketID == 1){
            return new Basket(1, 1, 1, 1);
        }
        return new Basket(2, 1, 2, 2);
    }

    public List<Basket> getBasketsFromUser(int basketUserID) {
        //        try {
//            query = "SELECT * FROM Basket WHERE basketUserID = ?;";
//            statement.setInt(1, basketUserID);
//            statement = database.prepareStatement(query);
//
//            return selectBaskets(statement).get(0);
//        }
//        catch (SQLException e) {
//            throw new RuntimeException(e);
//        }
        Basket basket1 = new Basket(1, 1, 1, 1);
        Basket basket2 = new Basket(2, 1, 2, 2);
        List temporaryList = new ArrayList();
        temporaryList.add(basket1);
        temporaryList.add(basket2);
        return temporaryList;
    }

    public List<Basket> getBasketsFromUserWithItem(int basketUserID, int basketItemID) {
        //        try {
//            query = "SELECT * FROM Basket WHERE basketUserID = ? AND basketItemID = ?;";
//            statement.setInt(1, basketUserID);
        //    statement.setInt(2, basketItemID);
//            statement = database.prepareStatement(query);
//
//            return selectBaskets(statement).get(0);
//        }
//        catch (SQLException e) {
//            throw new RuntimeException(e);
//        }
        Basket basket1 = new Basket(1, 1, 1, 1);
        List temporaryList = new ArrayList();
        temporaryList.add(basket1);
        return temporaryList;
    }

    public void createBasket(int basketUserID, int basketItemID, int basketItemAmount) {
        try {
            query = "INSERT INTO Basket (basketUserID, basketItemID, basketItemAmount) VALUES (?, ?, ?);";

            statement = database.prepareStatement(query);
            statement.setInt(1, basketUserID);
            statement.setInt(2, basketItemID);
            statement.setInt(3, basketItemAmount);

            database.update(statement);
        }
        catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public void updateBasket(int basketUserID, int basketItemID, int basketAmount, int basketID) {
        try {
            query = "UPDATE Basket basketUserID = ?, basketItemID = ?, basketAmount = ? WHERE basketID = ?";

            statement = database.prepareStatement(query);
            statement.setInt(1, basketUserID);
            statement.setInt(2, basketItemID);
            statement.setInt(3, basketAmount);
            statement.setInt(4, basketID);

            database.update(statement);
        }
        catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public void deleteBasket(int basketID) {
        try {
            query = "DELETE FROM basket WHERE basketID = ?;";

            statement = database.prepareStatement(query);
            statement.setInt(1, basketID);

            database.update(statement);
        }
        catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public void deleteBasketFromUser(int userID) {
        try {
            query = "DELETE FROM basket WHERE basketUserID = ?;";

            statement = database.prepareStatement(query);
            statement.setInt(1, userID);

            database.update(statement);
        }
        catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }
}
