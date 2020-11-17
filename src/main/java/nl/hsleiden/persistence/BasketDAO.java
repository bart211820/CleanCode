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
        try {
            query = "SELECT * FROM Basket;";
            statement = database.prepareStatement(query);

            return selectBaskets(statement);
        }
        catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public Basket getBasket(int basketID){
        try {
            query = "SELECT * FROM Basket WHERE basketID = ?;";
            statement = database.prepareStatement(query);
            statement.setInt(1, basketID);

            return selectBaskets(statement).get(0);
        }
        catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public List<Basket> getBasketsFromUser(int basketUserID) {
        try {
            query = "SELECT * FROM Basket WHERE basketUserID = ?;";
            statement = database.prepareStatement(query);
            statement.setInt(1, basketUserID);

            return selectBaskets(statement);
        }
        catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public List<Basket> getBasketsFromUserWithItem(int basketUserID, int basketItemID) {
        try {
            query = "SELECT * FROM Basket WHERE basketUserID = ? AND basketItemID = ?;";
            statement = database.prepareStatement(query);
            statement.setInt(1, basketUserID);
            statement.setInt(2, basketItemID);

            return selectBaskets(statement);
        }
        catch (SQLException e) {
            throw new RuntimeException(e);
        }
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

    public void updateBasket(int basketUserID, int basketItemID, int basketItemAmount, int basketID) {
        try {
            query = "UPDATE Basket SET basketUserID = ?, basketItemID = ?, basketItemAmount = ? WHERE basketID = ?;";

            statement = database.prepareStatement(query);
            statement.setInt(1, basketUserID);
            statement.setInt(2, basketItemID);
            statement.setInt(3, basketItemAmount);
            statement.setInt(4, basketID);

            database.update(statement);
        }
        catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public void deleteBasket(int basketID) {
        try {
            query = "DELETE FROM Basket WHERE basketID = ?;";

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
            query = "DELETE FROM Basket WHERE basketUserID = ?;";

            statement = database.prepareStatement(query);
            statement.setInt(1, userID);

            database.update(statement);
        }
        catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }
}
