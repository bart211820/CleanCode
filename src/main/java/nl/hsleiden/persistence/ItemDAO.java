package nl.hsleiden.persistence;

import nl.hsleiden.Database;
import nl.hsleiden.model.Item;

import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class ItemDAO {
    private Database database;
    private PreparedStatement statement;
    private String query;
    private List<Item> results;

    public ItemDAO() {
        this.database = Database.getInstance();
    }

    public List<Item> selectItems(PreparedStatement statement) throws SQLException{
        ResultSet items = database.select(statement);
        List<Item> resultList = new ArrayList<>();

        while (items.next()){
            Item item = new Item(
                    items.getInt("itemID"),
                    items.getString("itemName"),
                    items.getString("itemDescription"),
                    items.getDouble("itemPrice"),
                    items.getString("itemImage"),
                    items.getString("itemType"),
                    items.getInt("itemAnimatorID")
            );

            resultList.add(item);
        }


        return resultList;
    }

    public List<Item> getAllItems() {
        try {
            query = "SELECT * FROM Item;";
            statement = database.prepareStatement(query);

            return selectItems(statement);
        }
        catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public Item getItem(int itemID){
        try {
            query = "SELECT * FROM Item WHERE itemID = ?;";
            statement = database.prepareStatement(query);
            statement.setInt(1, itemID);

            return selectItems(statement).get(0);
        }
        catch (SQLException e) {
            throw new RuntimeException(e);
        }
      }

    public void createItem(String itemName, String itemDescription, double itemPrice, String itemImage, String itemType, int itemAnimatorID) {
        try {
            query = "INSERT INTO Item (itemName, itemDescription, itemPrice, itemImage, itemType, itemAnimatorID) VALUES (?, ?, ?, ?, ?, ?);";

            statement = database.prepareStatement(query);
            statement.setString(1, itemName);
            statement.setString(2, itemDescription);
            statement.setDouble(3, itemPrice);
            statement.setString(4, itemImage);
            statement.setString(5, itemType);
            statement.setInt(6, itemAnimatorID);

            database.update(statement);
        }
        catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public void updateItem(String itemName, String itemDescription, double itemPrice, String itemImage, String itemType, int itemAnimatorID, int itemID) {
        try {
            query = "UPDATE Item SET itemName = ?, itemDescription = ?, itemPrice = ?, itemImage = ?, itemType = ?, itemAnimatorID = ? WHERE itemID = ?;";

            statement = database.prepareStatement(query);
            statement.setString(1, itemName);
            statement.setString(2, itemDescription);
            statement.setDouble(3, itemPrice);
            statement.setString(4, itemImage);
            statement.setString(5, itemType);
            statement.setInt(6, itemAnimatorID);
            statement.setInt(7, itemID);

            database.update(statement);
        }
        catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public void deleteItem(int itemID) {
        try {
            query = "DELETE FROM Item WHERE itemID = ?;";

            statement = database.prepareStatement(query);
            statement.setInt(1, itemID);

            database.update(statement);
        }
        catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }
}
